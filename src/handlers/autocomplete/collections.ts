import * as AC from 'animal-crossing';
import Fuse from 'fuse.js';

export type Value = AC.IConstruction | AC.IRecipe | AC.IVillager | AC.IReaction | AC.IItem;
export type Command = 'constructie' | 'diy' | 'eilandbewoner' | 'reactie' | 'item';
type Collection = {
  [K in Command]: {
    data: Map<string, Value>;
    index: Fuse<string>;
    keys: string[];
  }
};

const commandToData: Record<Command, Value[]> = {
  constructie: AC.construction,
  diy: AC.recipes,
  eilandbewoner: AC.villagers,
  reactie: AC.reactions,
  item: AC.items,
};

export const getEnglishName = (item: Value) => item.translations?.english ?? item.translations?.englishEurope ?? item.name;
export const getDutchName = (item: Value) => item.translations?.dutch ?? getEnglishName(item);

function buildCollection(lang: 'dutch' | 'english'): Collection {
  const collection = Object.fromEntries(
    Object.keys(commandToData).map((v: Command) => [
      v,
      {
        data: new Map(),
        keys: [],
        index: new Fuse([], {
          isCaseSensitive: false,
          includeScore: false,
          includeMatches: false,
          minMatchCharLength: 1,
          shouldSort: true,
        }),
      },
    ])
  ) as Collection;

  for (const command of Object.keys(commandToData) as Command[]) {
    const dataset = commandToData[command];

    for (const item of dataset) {
      const englishName = getEnglishName(item);
      const dutchName = getDutchName(item);
      const name = lang === 'english' ? englishName : dutchName;

      const category = collection[command];

      category.data.set(name, item);
      category.index.add(name);
      if (category.keys.length < 25) {
        category.keys.push(name);
      }
    }
  }

  return collection;
}

export const collections: Record<string, Collection> = {
  nl: buildCollection('dutch'),
  en: buildCollection('english'),
};
