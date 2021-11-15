import dayjs from 'dayjs';
import dayjsObjectSupport from 'dayjs/plugin/objectSupport';

dayjs.extend(dayjsObjectSupport);

export abstract class Parser<T> {
  protected abstract sheetName: string;
  public abstract parse(data: string[]): T | Generator<T>;

  protected static parseImageFormula(formula: string): string {
    return formula
      .trim()
      .slice(
        '=IMAGE("'.length,
        '")'.length * -1,
      );
  }

  protected static parsePrice(cell: string): number | null {
    if ([ 'NA', 'NFS' ].includes(cell)) {
      return null;
    }

    return Number(cell);
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
    data: string[],
    properties: readonly T[],
  ): Record<T, string> {
    return Object.fromEntries(
      properties.map((key, idx) => [ key, data[idx] ])
    ) as Record<T, string>;
  }
}
