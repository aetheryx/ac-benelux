import { ApplicationCommandOptionType, ApplicationCommandType, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types';

const generateCommand = <T extends string>(name: T, description?: string, formatted?: string): RESTPostAPIChatInputApplicationCommandsJSONBody & { name: T } => ({
  name,
  description: `Vind een ${description ?? name} op basis van Engelse of Nederlandse naam`,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'taal',
      description: 'In welke taal je wilt zoeken',
      required: true,
      choices: [
        { name: 'Engels', value: 'en' },
        { name: 'Nederlands', value: 'nl' },
      ],
    },
    {
      type: ApplicationCommandOptionType.String,
      name: 'naam',
      description: `De naam van ${formatted ?? `de ${description ?? name}`}`,
      autocomplete: true,
      required: true,
    },
  ],
});

export const commands = [
  generateCommand('constructie', 'brug of helling'),
  generateCommand('huisrenovatie'),

  generateCommand('insect'),
  generateCommand('vis'),
  generateCommand('zeewezen'),

  generateCommand('fossiel'),
  generateCommand('hek'),
  generateCommand('kunst'),
  generateCommand('kleding'),
  generateCommand('meubel'),
  generateCommand('item'),

  generateCommand('reactie'),

  generateCommand('bewoner', 'eilandbewoner'),

  generateCommand('npc'),

  generateCommand('seizoen'),
  generateCommand('event'),

  generateCommand('diy'),
];

type Commands = typeof commands;
export type Command = Commands[number]['name'];

/**
  'achievements'
    tbd

  'construction'
    .category in roofing, door, siding, mailbox => /huisrenovatie
    .category in incline, bridge => /constructie

  'creatures'
    .sourceSheet is insects => /insect
    .sourceSheet is fish => /vis
    .sourceSheet is sea creatures => /zeewezen

  'items'
    .sourceSheet is fossils => /fossiel
    .sourceSheet is fencing => /hek
    .sourceSheet is art => /kunst
    .sourceSheet in accessories, tops, headwear, socks, bags, umbrellas, bottoms, dress-up, clothing other => /kleding
    .sourceSheet in housewares, posters, rugs, wall-mounted, wallpaper => /meubel
    _ => /item

  'reactions'
    => /reactie

  'seasonsAndEvents'
    .type includes season => /seizoen
    .type includes event => /event

  'recipes'
    => /diy

  'villagers'
    => /bewoner

  'npcs'
    => /npc
 */
