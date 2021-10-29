import { Logger } from '@acbot/util/Logger';
import { APIInteraction, APIInteractionResponse, InteractionResponseType, InteractionType } from 'discord-api-types';
import { Promisable } from 'type-fest';
import { handleAutocompleteInteraction } from './autocomplete';
import { handleCommandInteraction } from './command';

const logger = new Logger('handlers/interaction');

export function handleInteraction(interaction: APIInteraction): Promisable<APIInteractionResponse> {
  try {
    switch (interaction.type) {
      case InteractionType.Ping: {
        return {
          type: InteractionResponseType.Pong,
        };
      }

      case InteractionType.ApplicationCommandAutocomplete: {
        return handleAutocompleteInteraction(interaction);
      }

      case InteractionType.ApplicationCommand: {
        return handleCommandInteraction(interaction);
      }

      default: {
        logger.info(interaction);
      }
    }
  } catch (err) {
    logger.error('Failed to handle interaction', err);
  }
}
