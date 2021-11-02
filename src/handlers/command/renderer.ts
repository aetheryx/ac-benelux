import { IConstruction, ICreature, IReaction, IVillager } from 'animal-crossing';
import { APIEmbed } from 'discord-api-types';
import { Command } from 'src/commands';
import { getDutchName, getEnglishName, Value } from '../autocomplete/collections';
import * as Translations from './translations';

export type Language = 'nl' | 'en';
type Renderer = (arg: Value, language: Language) => APIEmbed;
const capitalize = (text: string) => text[0].toUpperCase() + text.slice(1);
const BELLS = '<:bells:903720210371080212>';
const color = 0xCC624F;

const field = (name: string, value: string) => ({ name, value });

const sharedRenderers = {
  construction: (construction: IConstruction): APIEmbed => ({
    fields: [
      field('Prijs', `${BELLS} ${construction.buy.toLocaleString()}`),
      field('Categorie', Translations.Construction.Category[construction.category]),
      field('Bron', construction.source.map(s => Translations.Construction.Source[s]).join(', ')),
    ],
    image: {
      url: construction.image,
    },
  }),

  creature: (creature: ICreature): APIEmbed => ({
    description: creature.description[0] ?? '',
    fields: [
      field('Verkoopprijs', `${BELLS} ${creature.sell.toLocaleString()}`),
      field('Aantal vangsten voor unlock', creature.totalCatchesToUnlock.toString()),
      field('Vorm', `${Translations.Creature.Shadow[creature.shadow]} (${creature.size})`),
      field('Kleuren', creature.colors.map(c => Translations.Creature.Color[c]).join(', ')),
      field('Actief ritme', [
        `Tijd: ${creature.hemispheres.north.time}`,
        `Seizoen: ${creature.hemispheres.north.months}`,
      ].join('\n')),

      creature.catchDifficulty && field('Moeilijkheidsgraad', Translations.Creature.CatchDifficulty[creature.catchDifficulty]),
      creature.movementSpeed && field('Snelheid', Translations.Creature.MovementSpeed[creature.movementSpeed]),
      creature.catchPhrase.length > 1 && field('Catchphrase', creature.catchPhrase.join('\n')),
      creature.whereHow && field('Waar en Hoe', Translations.Creature.WhereHow[creature.whereHow]),
      creature.weather && field('Weer', Translations.Creature.Weather[creature.weather]),
      creature.vision && field('Oogzicht', Translations.Creature.Vision[creature.vision]),
    ],
    thumbnail: {
      url: creature.iconImage,
    },
    image: {
      url: creature.furnitureImage,
    },
  }),
};

const render = (renderer: Renderer | ReturnType<Renderer>, value: Value, language: Language, title: string): APIEmbed => {
  const embed = renderer instanceof Function ? renderer(value, language) : renderer;

  embed.title ??= `${title}: ${capitalize(language === 'nl' ? getDutchName(value) : getEnglishName(value))}`;
  embed.color ??= color;
  embed.fields = [ {
    name: `${language === 'nl' ? 'Engelse' : 'Nederlandse'} naam`,
    value: capitalize(language === 'nl' ? getEnglishName(value) : getDutchName(value)),
  }, ...embed.fields.filter(f => f?.value) ];

  return embed;
};

export const renderers: Record<Command, Renderer> = {
  huisrenovatie: (construction: IConstruction, language: Language) =>
    render(sharedRenderers.construction, construction, language, 'Huis renovatie'),

  constructie: (construction: IConstruction, language: Language) =>
    render(sharedRenderers.construction, construction, language, 'Constructie'),

  insect: (creature: ICreature, language: Language) =>
    render(sharedRenderers.creature, creature, language, 'Insect'),

  vis: (creature: ICreature, language: Language) =>
    render(sharedRenderers.creature, creature, language, 'Vis'),

  zeewezen: (creature: ICreature, language: Language) =>
    render(sharedRenderers.creature, creature, language, 'Zeewezen'),

  fossiel: () => ({

  }),

  hek: () => ({

  }),

  kunst: () => ({

  }),

  kleding: () => ({

  }),

  meubel: () => ({

  }),

  item: () => ({

  }),

  reactie: (reaction: IReaction) => ({
    title: `Reactie: ${capitalize(getDutchName(reaction))}`,
    fields: [
      { name: 'Engelse naam', value: capitalize(getEnglishName(reaction)) },
      { name: 'Bronnen', value: reaction.source.join(', ') },
    ],
    image: {
      url: reaction.image,
    },
  }),

  bewoner: (villager: IVillager, language: Language) => render({
    fields: [
      field('Soort', villager.species),
      field('Geslacht', villager.gender),
      field('Personaliteit', villager.personality),
      field('Subtype', villager.subtype),
      field('Hobby', Translations.Villager.Hobby[villager.hobby]),
      field('Verjaardag', villager.birthday),
      field('Catchphrase', villager.catchphrase),
      field('Favoriet liedje', villager.favoriteSong),
      field('Stijl', villager.styles.map(c => Translations.Villager.Style[c]).join(', ')),
      field('Kleur', villager.colors.map(c => Translations.Villager.Color[c]).join(', ')),
    ],
    description: villager.favoriteSaying,
    image: {
      url: villager.photoImage,
    },
    thumbnail: {
      url: villager.iconImage,
    },
  }, villager, language, 'Eiland bewoner'),

  npc: () => ({}),

  seizoen: () => ({}),

  event: () => ({}),

  diy: () => ({}),
};
