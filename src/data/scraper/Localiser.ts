import { Language, Localised } from '../types/Language';
import { resolve } from 'node:path';
import fs from 'node:fs';
import dayjs, { Dayjs } from 'dayjs';
import dayjsAdvancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/en';
import 'dayjs/locale/nl';

dayjs.extend(dayjsAdvancedFormat);

type File<T = {}> = Array<T & {
  label: string;
  locale: Localised<string>;
}>;

type PathIdentifier = `${'custom' | 'aeon'}:${string}`;

export class Localiser {
  private static fileCache = new Map<string, File>();
  private static paths = {
    'aeon': (path: string) => resolve(__dirname, `../scraper/datasets/acnh-translations/JSON/${path}.msbt.json`),
    'custom': (path: string) => resolve(__dirname, `../scraper/datasets/custom/${path}.json`),
  };
  private static languages: Record<Language, { locale: string; format: string }> = {
    EUnl: {
      locale: 'nl',
      format: 'D MMMM',
    },
    USen: {
      locale: 'en',
      format: 'MMMM Do',
    },
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
    query: { label: string } | string,
  ): string | null {
    const file = this.readFile(pathIdentifier);
    const entry = file.find(e => (
      typeof query === 'string'
        ? e.locale.USen?.toLowerCase() === query.toLowerCase()
        : e.label?.toLowerCase() === query.label.toLowerCase()
    ));

    return entry?.locale[this.targetLanguage] || null;
  }

  public formatDate(date: Dayjs): string {
    const language = Localiser.languages[this.targetLanguage];
    return date
      .locale(language.locale)
      .format(language.format);
  }
}
