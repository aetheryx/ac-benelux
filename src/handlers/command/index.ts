import { APIApplicationCommandInteraction, APIInteractionResponseChannelMessageWithSource, ApplicationCommandInteractionDataOptionString, ApplicationCommandType, InteractionResponseType } from 'discord-api-types';
import { Command } from 'src/commands';
import { Promisable } from 'type-fest';
import { collections } from '../autocomplete/collections';
import { renderers, Language } from './renderer';

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
  const embed = renderer(item, languageOption.value as Language);

  return {
    type: InteractionResponseType.ChannelMessageWithSource,
    data: {
      embeds: [ embed ],
    },
  };
}
