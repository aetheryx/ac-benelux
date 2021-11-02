import 'tsconfig-paths/register';
import got, { HTTPError } from 'got';
import { Logger } from './util/Logger';
import { commands } from './commands';
import { config } from 'dotenv';

config();

const logger = new Logger('pushCommands');
const applicationID = process.env.APPLICATION_ID;
const guildID = process.env.GUILD_ID;
const token = process.env.TOKEN;

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
