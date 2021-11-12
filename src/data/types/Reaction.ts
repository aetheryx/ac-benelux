import { Localised } from './Language';

export interface ReactionLocalisations {
  name: string;
  source: string;
  sourceNotes: string | null;
}

export interface Reaction {
  imageURL: string;
  localisations: Localised<ReactionLocalisations>;
}
