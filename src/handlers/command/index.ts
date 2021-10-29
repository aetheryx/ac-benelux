import { APIApplicationCommandInteraction, APIInteractionResponseChannelMessageWithSource, ApplicationCommandInteractionDataOptionString, ApplicationCommandType, InteractionResponseType } from 'discord-api-types';
import { Promisable } from 'type-fest';
import { collections, Command } from '../autocomplete/collections';
import { renderers } from './renderer';

export function handleCommandInteraction(
  interaction: APIApplicationCommandInteraction
): Promisable<APIInteractionResponseChannelMessageWithSource> {
  if (interaction.data.type !== ApplicationCommandType.ChatInput) {
    return;
  }

  const [ languageOption, query ] = interaction.data.options as ApplicationCommandInteractionDataOptionString[];
  const command = interaction.data.name as Command;
  const collection = collections[languageOption.value];
  const category = collection[command];
  const renderer = renderers[command];
  const item = category.data.get(query.value);
  const embed = renderer(item);

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [ embed ],
    },
  };
}
