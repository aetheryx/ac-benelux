import { IConstruction, IItem, IReaction, IRecipe, IVillager } from 'animal-crossing';
import { APIEmbed } from 'discord-api-types';
import { getDutchName, getEnglishName } from '../autocomplete/collections';
import * as Translations from './translations';

const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);
const BELLS = '<:bells:903720210371080212>';
const color = 0xCC624F;

export const renderers: Record<string, (arg: any) => APIEmbed> = {
  constructie: (construction: IConstruction) => ({
    title: `Constructie: ${capitalize(getDutchName(construction))}`,
    color,
    fields: [
      { name: 'Engelse naam', value: capitalize(getEnglishName(construction)), inline: true },
      { name: 'Prijs', value: `${BELLS} ${construction.buy.toLocaleString()}`, inline: true },
      { name: 'Categorie', value: Translations.Construction.Category[construction.category], inline: true },
      { name: 'Bron', value: construction.source.map(s => Translations.Construction.Source[s]).join(', ') },
    ],
    image: {
      url: construction.image,
    },
  }),

  eilandbewoner: (villager: IVillager) => ({
    title: `Eiland bewoner: ${capitalize(getDutchName(villager))}`,
    color,
    fields: [
      { name: 'Soort', value: villager.species, inline: true },
      { name: 'Geslacht', value: villager.gender, inline: true },
      { name: 'Personaliteit', value: villager.personality, inline: true },
      { name: 'Subtype', value: villager.subtype, inline: true },
      { name: 'Hobby', value: Translations.Villager.Hobby[villager.hobby], inline: true },
      { name: 'Verjaardag', value: villager.birthday, inline: true },
      { name: 'Catchphrase', value: villager.catchphrase, inline: true },
      { name: 'Favoriet liedje', value: villager.favoriteSong, inline: true },
      { name: 'Stijl', value: villager.styles.map(c => Translations.Villager.Style[c]).join(', '), inline: true },
      { name: 'Kleur', value: villager.colors.map(c => Translations.Villager.Color[c]).join(', '), inline: true },
    ],
    description: villager.favoriteSaying,
    image: {
      url: villager.photoImage,
    },
    thumbnail: {
      url: villager.iconImage,
    },
  }),

  item: (item: IItem) => ({
    title: `Item: ${capitalize(getDutchName(item))}`,
  }),

  reactie: (reaction: IReaction) => ({
    title: `Reactie: ${capitalize(getDutchName(reaction))}`,
    fields: [
      { name: 'Engelse naam', value: capitalize(getEnglishName(reaction)), inline: false },
      { name: 'Bronnen', value: reaction.source.join(', '), inline: false },
    ],
    image: {
      url: reaction.image,
    },
  }),

  diy: (recipe: IRecipe) => ({
    title: `DIY: ${capitalize(getDutchName(recipe))}`,
  }),
};
