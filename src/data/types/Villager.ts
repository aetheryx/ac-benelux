import { Dayjs } from 'dayjs';
import { Localised } from './Language';

export interface VillagerLocalisations {
  name: string;
  personality: string;
  species: string;
  gender: string;
  hobby: string;
  catchPhrase: string;
  favoriteSong: string;
  favoriteSaying: string;
  styles: string[];
  colors: string[];
}

export interface Villager {
  iconImageURL: string;
  photoImageURL: string;
  houseImageURL: string;
  subType: string;
  birthday: Dayjs;
  localisations: Localised<VillagerLocalisations>;
}
