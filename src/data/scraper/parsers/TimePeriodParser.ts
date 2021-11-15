import { Parser } from './Parser';
import { TimePeriod, TimePeriodLocalisations } from 'src/data/types/TimePeriod';
import dayjs, { Dayjs } from 'dayjs';

export class TimePeriodParser extends Parser<TimePeriod> {
  private static extractID = /^.* \((?:.* )?(?<id>\d)\)$/;
  private static EM_DASH = '–';
  public sheetNames = [
    'Seasons And Events',
  ];
  public properties = {
    'Name': 'name',
    'Type': 'type',
    'Version Added': 'versionAdded',
    'Version Last Updated': 'versionLastUpdated',
    'Year': 'year',
    'Dates (Northern Hemisphere)': 'northernHemisphereDates',
    'Dates (Southern Hemisphere)': 'southernHemisphereDates',
    'Display Name': 'displayName',
    'Event Notes': 'eventNotes',
    'Internal Label': 'internalLabel',
    'Unlock Date': 'unlockDate',
    'Unlock Method': 'unlockMethod',
    'Unique Entry ID': 'uniqueEntryID',
  } as const;

  public *parse(header: Parser.Row, row: Parser.Row): Generator<TimePeriod> {
    const {
      internalLabel,
      northernHemisphereDates,
      name,
    } = Parser.objectify(header, row, this.properties);

    if (northernHemisphereDates === 'NA') {
      return null;
    }

    const id = name.trim().match(TimePeriodParser.extractID);
    if (id && Number(id.groups.id) !== 1) {
      return null;
    }

    const labels = internalLabel.split(';').map(r => r.trim());
    const length = new Set(labels.map(label => label.replace(/\d+/g, ''))).size;

    for (let i = 0; i < length; i++) {
      yield {
        dates: this.buildDates(
          length === 1
            ? northernHemisphereDates
            : northernHemisphereDates.split(';')[i].trim()
        ),
        localisations: this.buildLocalisations(header, row),
      };
    }
  }

  private parseDate(dateString: string): Dayjs {
    // simple formats
    if (!dateString.includes('of')) {
      return dayjs(dateString.trim());
    }

    // "<nth> <weekday> of <month>" format
    const [ nthStr, weekday, _, month ] = dateString.trim().split(/\s+/);
    const { months, weekdays } = (dayjs as unknown as { en: { months: string[]; weekdays: string[] }}).en;
    let base = dayjs(0)
      .set('month', months.indexOf(month))
      .set('date', 1)
      .set('year', dayjs().year());

    let nth = Number(nthStr[0]);
    while (nth > 0) {
      base = base.add(1, 'day');
      if (base.day() === weekdays.indexOf(weekday)) {
        nth--;
      }
    }

    return base;
  }

  private buildDates(datesString: string): TimePeriod['dates'] {
    if (datesString.includes(TimePeriodParser.EM_DASH)) {
      const [ from, to ] = datesString
        .split(TimePeriodParser.EM_DASH)
        .map(this.parseDate);

      return {
        kind: 'range',
        from,
        to,
      };
    } else {
      const dates = datesString
        .split(';')
        .map(this.parseDate);

      return {
        kind: 'list',
        dates,
      };
    }
  }

  protected buildLocalisation(
    header: Parser.Row,
    row: Parser.Row,
    localiser: Parser.Localiser,
    index: number,
  ): TimePeriodLocalisations {
    const {
      type,
      internalLabel,
      name,
    } = Parser.objectify(header, row, this.properties);

    const label = internalLabel.split(';')[index].trim();

    return {
      type: localiser.get('custom:timePeriod/type', type),
      name: localiser.get('custom:timePeriod/name', { label }) ??
        localiser.get('aeon:String/STR_EventName', { label }) ??
        localiser.get('custom:timePeriod/name', name) ??
        localiser.get('aeon:String/STR_Constellation', name),
    };
  }
}
