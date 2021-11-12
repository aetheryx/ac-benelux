import { Language, Localised } from '../types/Language';
import { resolve } from 'node:path';
import fs from 'node:fs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/nl';

type File<T = {}> = Array<T & {
  label: string;
  locale: Localised<string>;
}>;

type PathIdentifier = `${'custom' | 'aeon'}:${string}`;

export class Localiser {
  private static fileCache = new Map<string, File>();
  private static paths = {
    'aeon': (path: string) => resolve(__dirname, `../scraper/raw/acnh-translations/JSON/${path}.msbt.json`),
    'custom': (path: string) => resolve(__dirname, `../scraper/raw/custom/${path}.json`),
  };

  private targetLanguage: Language;

  constructor(targetLanguage: Language) {
    this.targetLanguage = targetLanguage;
  }

  private readFile<F = Record<string, any>>(
    pathIdentifier: PathIdentifier
  ): File<F> {
    const [ source, subPath ] = pathIdentifier.split(':');
    const path = Localiser.paths[source](subPath);

    if (Localiser.fileCache.has(path)) {
      return Localiser.fileCache.get(path) as File<F>;
    } else {
      const file = JSON.parse(fs.readFileSync(path).toString().trim());
      Localiser.fileCache.set(path, file);
      return file;
    }
  }

  public get(
    pathIdentifier: PathIdentifier,
    query: Record<'label' | string, string>,
  ): string {
    const file = this.readFile(pathIdentifier);
    const entry = file.find(e => (
      'label' in query
        ? e.label?.toLowerCase() === query.label.toLowerCase()
        : e.locale.USen?.toLowerCase() === Object.values(query)[0]?.toLowerCase()
    ));

    return entry.locale[this.targetLanguage];
  }

  public formatDate(date: Dayjs): string {
    return date
      .locale(this.targetLanguage === 'EUnl' ? 'nl' : 'en')
      .format('MMMM, D');
  }
}