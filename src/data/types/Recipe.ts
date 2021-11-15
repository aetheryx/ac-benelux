import { Localised } from './Language';

export interface RecipeLocalisations {
  name: string;
  sources: string[];
  sourceNotes: string;
  seasonsOrEvents: string[];
  category: string;
  itemIDToName: Record<`${number}`, string>;
}

export interface RecipeMaterial {
  quantity: number;
  itemID: number;
}

export interface Recipe {
  imageURL: string;
  materials: RecipeMaterial[];
  buy: number | null;
  sell: number | null;
  localisations: Localised<RecipeLocalisations>;
}
