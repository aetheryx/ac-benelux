import { Localised } from './Language';

export interface VillagerLocalisations {
  name: string;
  personality: string;
  birthday: string;
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
  id: string;
  localisations: Localised<VillagerLocalisations>;
}
