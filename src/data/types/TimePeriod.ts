import { Dayjs } from 'dayjs';
import { Localised } from './Language';

type DateKind<T extends string> = {
  kind: T;
};
type DateList = DateKind<'list'> & {
  dates: Dayjs[];
};
type DateRange = DateKind<'range'> & {
  from: Dayjs;
  to: Dayjs;
};

export interface TimePeriodLocalisations {
  name: string;
  type: string;
  dates: string;
}

export interface TimePeriod {
  localisations: Localised<TimePeriodLocalisations>;
  dates: DateList | DateRange;
}
