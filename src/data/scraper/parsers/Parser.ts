import dayjs from 'dayjs';
import dayjsObjectSupport from 'dayjs/plugin/objectSupport';

dayjs.extend(dayjsObjectSupport);

export abstract class Parser<T> {
  protected abstract sheetName: string;
  public abstract parse(data: string[]): T;

  protected static parseImageCell(formula: string): string {
    return formula
      .trim()
      .slice(
        '=IMAGE("'.length,
        '")'.length * -1,
      );
  }

  protected static parseDate(date: string) {
    const [ month, day ] = date.split('/');
    // @ts-ignore: not included in types because of objectSupport plugin
    return dayjs({
      month: Number(month) - 1,
      day: Number(day),
    });
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