import * as AC from 'animal-crossing';
import { Category as ConstructionCategory } from 'animal-crossing/lib/types/Construction';
import { CreatureSourceSheet } from 'animal-crossing/lib/types/Creature';
import { Category as ItemSourceSheet } from 'animal-crossing/lib/types/Item';
import Fuse from 'fuse.js';
import { Command } from '../../commands';

export type Value =
  | AC.IConstruction
  | AC.ICreature
  | AC.IItem
  | AC.IReaction
  | AC.ISeasonsAndEvents
  | AC.IRecipe
  | AC.IVillager
  | AC.INPC;

type Collection = {
  [K in Command]: {
    data: Map<string, Value>;
    index: Fuse<string>;
    keys: string[];
  }
};

const commandToData: Record<Command, Value[]> = {
  huisrenovatie: AC.construction.filter(construction => [
    ConstructionCategory.Roofing,
    ConstructionCategory.Door,
    ConstructionCategory.Siding,
    ConstructionCategory.Mailbox,
  ].includes(construction.category)),
  constructie: AC.construction.filter(construction => [
    ConstructionCategory.Incline,
    ConstructionCategory.Bridge,
  ].includes(construction.category)),

  insect: AC.creatures.filter(creature => creature.sourceSheet === CreatureSourceSheet.Insects),
  vis: AC.creatures.filter(creature => creature.sourceSheet === CreatureSourceSheet.Fish),
  zeewezen: AC.creatures.filter(creature => creature.sourceSheet === CreatureSourceSheet.SeaCreatures),

  fossiel: AC.items.filter(item => item.sourceSheet === ItemSourceSheet.Fossils),
  hek: AC.items.filter(item => item.sourceSheet === ItemSourceSheet.Fencing),
  kunst: AC.items.filter(item => item.sourceSheet === ItemSourceSheet.Art),
  kleding: AC.items.filter(item => [
    ItemSourceSheet.Accessories,
    ItemSourceSheet.Tops,
    ItemSourceSheet.Headwear,
    ItemSourceSheet.Socks,
    ItemSourceSheet.Bags,
    ItemSourceSheet.Umbrellas,
    ItemSourceSheet.Bottoms,
    ItemSourceSheet.DressUp,
    ItemSourceSheet.ClothingOther,
  ].includes(item.sourceSheet)),
  meubel: AC.items.filter(item => [
    ItemSourceSheet.Housewares,
    ItemSourceSheet.Posters,
    ItemSourceSheet.Rugs,
    ItemSourceSheet.WallMounted,
    ItemSourceSheet.Wallpaper,
  ].includes(item.sourceSheet)),
  item: AC.items.filter(item => ![
    ItemSourceSheet.Accessories,
    ItemSourceSheet.Tops,
    ItemSourceSheet.Headwear,
    ItemSourceSheet.Socks,
    ItemSourceSheet.Bags,
    ItemSourceSheet.Umbrellas,
    ItemSourceSheet.Bottoms,
    ItemSourceSheet.DressUp,
    ItemSourceSheet.ClothingOther,
    ItemSourceSheet.Housewares,
    ItemSourceSheet.Posters,
    ItemSourceSheet.Rugs,
    ItemSourceSheet.WallMounted,
    ItemSourceSheet.Wallpaper,
    ItemSourceSheet.Fossils,
    ItemSourceSheet.Fencing,
    ItemSourceSheet.Art,
  ].includes(item.sourceSheet)),

  reactie: AC.reactions,

  seizoen: AC.seasonsAndEvents.filter(seasonOrEvent => seasonOrEvent.type.toLowerCase().includes('season')),
  event: AC.seasonsAndEvents.filter(seasonOrEvent => seasonOrEvent.type.toLowerCase().includes('event')),

  diy: AC.recipes,

  bewoner: AC.villagers,

  npc: AC.npcs,
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
