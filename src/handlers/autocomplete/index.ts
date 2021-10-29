import { APIApplicationCommandAutocompleteResponse, ApplicationCommandInteractionDataOptionString, ApplicationCommandType, InteractionResponseType } from 'discord-api-types';
import { Promisable } from 'type-fest';
import { APIApplicationCommandAutocompleteInteraction } from 'discord-api-types/payloads/v8/_interactions/autocomplete';
import { collections, Command } from './collections';

const strip = (text: string) => text.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

export function handleAutocompleteInteraction(
  interaction: APIApplicationCommandAutocompleteInteraction
): Promisable<APIApplicationCommandAutocompleteResponse> {
  if (interaction.data.type !== ApplicationCommandType.ChatInput) {
    return;
  }

  const [ languageOption, query ] = interaction.data.options as ApplicationCommandInteractionDataOptionString[];
  const command = interaction.data.name as Command;
  const collection = collections[languageOption.value];
  const category = collection[command];

  let searchResults: string[] = query.value === ''
    ? category.keys
    : category.index
      .search(query.value)
      .slice(0, 25)
      .map(res => res.item);

  if (strip(searchResults[0]) === strip(query.value)) {
    searchResults = searchResults.slice(0, 1);
  }

  return {
    type: InteractionResponseType.ApplicationCommandAutocompleteResult,
    data: {
      choices: searchResults.map(item => ({
        name: item.toLowerCase(),
        value: item,
      })),
    },
  };
}
