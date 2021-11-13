import { Localised } from './Language';

export interface MessageCardLocalisations {
  name: string;
}

export interface MessageCard {
  imageURL: string;
  purchasePrice: number | null;
  localisations: Localised<MessageCardLocalisations>;
}
