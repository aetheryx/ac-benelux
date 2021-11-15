import { Language, Localised } from '../types/Language';
import { resolve } from 'node:path';
import fs from 'node:fs';
import globby from 'globby';
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
  private static globCache = new Map<string, string[]>();
  private static paths = {
    'aeon': (path: string) =>
      resolve(__dirname, `../scraper/datasets/acnh-translations/JSON/${path}.msbt.json`),
    'custom': (path: string) =>
      resolve(__dirname, `../scraper/datasets/custom/${path}.json`),
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
    const [ source, subPattern ] = pathIdentifier.split(':');
    const pattern = Localiser.paths[source](subPattern);

    let paths: string[];
    if (Localiser.globCache.has(pattern)) {
      paths = Localiser.globCache.get(pattern);
    } else {
      paths = globby.sync(pattern);
      Localiser.globCache.set(pattern, paths);
    }

    const files = paths.map(path => {
      if (Localiser.fileCache.has(path)) {
        return Localiser.fileCache.get(path) as File<F>;
      } else {
        const file: File<F> = JSON.parse(fs.readFileSync(path).toString().trim());
        Localiser.fileCache.set(path, file);
        return file;
      }
    });

    return files.flat();
  }

  public get(
    pathIdentifier: PathIdentifier,
    query: { label: string } | string,
  ): string | null {
    const file = this.readFile(pathIdentifier);
    const entry = file.find(e => (
      typeof query === 'string'
        ? e.locale.USen?.toLowerCase() === query.toLowerCase().trim()
        : e.label?.toLowerCase() === query.label.toLowerCase().trim()
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
