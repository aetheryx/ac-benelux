import dayjs from 'dayjs';
import dayjsObjectSupport from 'dayjs/plugin/objectSupport';
import { Language } from 'src/data/types/Language';
import * as LocaliserModule from '../Localiser';

dayjs.extend(dayjsObjectSupport);

export namespace Parser {
  export type Cell = string | number;
  export type Row = Cell[];
  export type Localiser = LocaliserModule.Localiser;
}

export abstract class Parser<T extends { localisations: Record<Language, unknown> }> {
  protected abstract sheetNames: string[];
  public abstract parse(header: Parser.Row, row: Parser.Row, sheetName: string): T | Generator<T>;

  protected static parseImageFormula(formula: Parser.Cell): string {
    return formula
      .toString()
      .trim()
      .slice(
        '=IMAGE("'.length,
        '")'.length * -1,
      );
  }

  protected static parsePrice(cell: Parser.Cell): number | null {
    if (typeof cell === 'number') {
      return cell;
    }

    return null;
  }

  protected static dedupe<E>(arr: E[]): E[] {
    return [ ...new Set(arr) ];
  }

  protected static cleanQuote(quote: string): string {
    return quote
      .trim()
      .replace(/^"|"$/g, '')
      .replace(/\n/g, ' ')
      .trim();
  }

  protected static objectify<T extends string>(
    header: Parser.Row,
    data: Parser.Row,
    properties: Readonly<Record<string, T>>,
  ): Record<T, string> {
    return Object.fromEntries(
      Object.entries<string>(properties)
        .filter(([ key ]) => header.includes(key))
        .map(([ key ], idx) => [ properties[key], data[idx] ])
    ) as Record<T, string>;
  }

  protected abstract buildLocalisation(
    header: Parser.Row,
    row: Parser.Row,
    localiser: Parser.Localiser,
    index?: number,
  ): T['localisations'][Language];

  protected buildLocalisations(
    header: Parser.Row,
    row: Parser.Row,
    index?: number,
  ): T['localisations'] {
    return Object.fromEntries(
      ([ 'EUnl', 'USen' ] as const) // todo
        .map(language => [
          language,
          this.buildLocalisation(
            header,
            row,
            new LocaliserModule.Localiser(language),
            index
          ),
        ])
    );
  }
}
