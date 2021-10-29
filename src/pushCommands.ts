import 'tsconfig-paths/register';
import { ApplicationCommandOptionType, ApplicationCommandType, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types';
import got, { HTTPError } from 'got';
import { Logger } from './util/Logger';

const logger = new Logger('pushCommands');
const applicationID = '';
const guildID = '';
const token = 'Bot ';

const generateCommand = (name: string, formatted: string): RESTPostAPIChatInputApplicationCommandsJSONBody => ({
  name,
  description: `Vind een ${name} op basis van Engelse of Nederlandse naam`,
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
      description: `De naam van ${formatted}`,
      autocomplete: true,
      required: true,
    },
  ],
});

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [
  generateCommand('constructie', 'de constructie'),
  generateCommand('diy', 'de DIY'),
  generateCommand('eilandbewoner', 'de eiland bewoner'),
  generateCommand('reactie', 'de reactie'),
  generateCommand('item', 'het item'),
];

logger.info('Posting commands...');
got.put(`https://discord.com/api/v8/applications/${applicationID}/guilds/${guildID}/commands`, {
  headers: {
    Authorization: token,
  },
  json: commands,
  responseType: 'json',
})
  .then(() => {
    logger.info('Successfully posted commands');
  })
  .catch((err: HTTPError) => {
    logger.error('Failed to post commands', err.message, JSON.stringify(err.response.body, null, '  '));
  });

/**
 * - creatures
 * - npcs
 */
