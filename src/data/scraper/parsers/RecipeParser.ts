import { Parser } from './Parser';
import { Recipe, RecipeLocalisations } from 'src/data/types/Recipe';

export class RecipeParser extends Parser<Recipe> {
  public sheetNames = [
    'Recipes',
  ];
  public properties = {
    'Name': 'name',
    'Image': 'imageURL',
    'Image SH': 'imageURLSouthernHemisphere',
    '#1': 'quantity1',
    'Material 1': 'material1',
    '#2': 'quantity2',
    'Material 2': 'material2',
    '#3': 'quantity3',
    'Material 3': 'material3',
    '#4': 'quantity4',
    'Material 4': 'material4',
    '#5': 'quantity5',
    'Material 5': 'material5',
    '#6': 'quantity6',
    'Material 6': 'material6',
    'Buy': 'buy',
    'Sell': 'sell',
    'Exchange Price': 'exchangePrice',
    'Exchange Currency': 'exchangeCurrency',
    'Source': 'sources',
    'Source Notes': 'sourceNotes',
    'Season/Event': 'seasonsOrEvents',
    'Season/Event Exclusive': 'seasonOrEventExclusive',
    'Version Added': 'versionAdded',
    'Unlocked?': 'unlocked',
    'Recipes to Unlock': 'recipesToUnlock',
    'Category': 'category',
    'Crafted Item Internal ID': 'craftedItem',
    'Card Color': 'cardColor',
    'DIY Icon Filename': 'diyIconFilename',
    'DIY Icon Filename SH': 'diyIconFilenameSouthernHemisphere',
    'Serial ID': 'serialID',
    'Internal ID': 'internalID',
    'Unique Entry ID': 'uniqueEntryID',
  } as const;

  public parse(header: Parser.Row, row: Parser.Row): Recipe {
    const {
      imageURL,
      buy,
      sell,
      recipesToUnlock,
      ...rest
    } = Parser.objectify(header, row, this.properties);

    return {
      imageURL: Parser.parseImageFormula(imageURL),
      buy: Parser.parsePrice(buy),
      sell: Parser.parsePrice(sell),
      recipesToUnlock: Number(recipesToUnlock),
      materials: Object.entries(rest)
        .filter(([ column, value ]: string[]) => column.startsWith('quantity') && Number(value))
        .map(([ column, value ]) => ({
          itemID: Number(column.at(-1)),
          quantity: Number(value),
        })),
      localisations: this.buildLocalisations(header, row),
    };
  }

  protected buildLocalisation(
    header: Parser.Row,
    row: Parser.Row,
    localiser: Parser.Localiser,
  ): RecipeLocalisations {
    const {
      name,
      seasonsOrEvents,
      sources,
      sourceNotes,
      category,
      ...rest
    } = Parser.objectify(header, row, this.properties);

    return {
      name: localiser.get('aeon:String/Item/STR_ItemName_*', name) ??
        localiser.get('aeon:String/Outfit/GroupName/STR_OutfitGroupName_*', name),
      category: localiser.get('aeon:String/STR_CategoryName', category),
      seasonsOrEvents: seasonsOrEvents
        .split(';')
        .filter(s => s !== 'NA')
        .map(seasonOrEvent =>
          localiser.get('custom:timePeriod/name', seasonOrEvent) ??
          localiser.get('aeon:String/STR_Constellation', seasonOrEvent)
        ),
      sources: sources.split(';').map(source => localiser.get('custom:recipe/source', source)),
      sourceNotes: sourceNotes
        ? localiser.get('custom:recipe/sourceNotes', sourceNotes)
        : null,
      itemIDToName: Object.fromEntries(
        Object.entries(rest)
          .filter(([ column, value ]: string[]) => column.startsWith('material') && value.trim())
          .map(([ column, value ]: string[]) => [
            column.at(-1),
            localiser.get('aeon:String/Item/STR_ItemName_*', value),
          ])
      ),
    };
  }
}
