import { Parser } from './Parser';
import { Language } from '../../types/Language';
import { Localiser } from '../Localiser';
import { Recipe, RecipeLocalisations, RecipeMaterial } from 'src/data/types/Recipe';

export class RecipeParser extends Parser<Recipe> {
  public sheetNames = [ 'Recipes' ];
  public properties = [
    'name',
    'imageURL',
    'imageURLSouthernHemisphere',
    'quantity1',
    'material1',
    'quantity2',
    'material2',
    'quantity3',
    'material3',
    'quantity4',
    'material4',
    'quantity5',
    'material5',
    'quantity6',
    'material6',
    'buy',
    'sell',
    'exchangePrice',
    'exchangeCurrency',
    'sources',
    'sourceNotes',
    'seasonsOrEvents',
    'seasonOrEventExclusive',
    'versionAdded',
    'unlocked',
    'recipesToUnlock',
    'category',
    'craftedItem',
    'cardColor',
    'diyIconFilename',
    'diyIconFilenameSouthernHemisphere',
    'serialID',
    'internalID',
    'uniqueEntryID',
  ] as const;

  public parse(rawData: string[]): Recipe {
    const {
      imageURL,
      buy,
      sell,
      recipesToUnlock,
      ...rest
    } = Parser.objectify(rawData, this.properties);

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
      localisations: {
        EUnl: this.buildLocalised(rawData, 'EUnl'),
        USen: this.buildLocalised(rawData, 'USen'),
      },
    };
  }

  private buildLocalised(
    rawData: string[],
    targetLanguage: Language,
  ): RecipeLocalisations {
    const {
      name,
      seasonsOrEvents,
      sources,
      sourceNotes,
      category,
      ...rest
    } = Parser.objectify(rawData, this.properties);

    const localiser = new Localiser(targetLanguage);

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
