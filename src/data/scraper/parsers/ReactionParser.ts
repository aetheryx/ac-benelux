import { Parser } from './Parser';
import { Language } from '../../types/Language';
import { Localiser } from '../Localiser';
import { Reaction, ReactionLocalisations } from 'src/data/types/Reaction';

export class ReactionParser extends Parser<Reaction> {
  public sheetNames = [ 'Reactions' ];
  public properties = [
    'index',
    'name',
    'imageURL',
    'source',
    'sourceNotes',
    'seasonOrEvent',
    'seasonOrEventExclusive',
    'versionAdded',
    'iconFilename',
    'internalID',
    'uniqueEntryID',
  ] as const;

  public parse(rawData: string[]): Reaction {
    const { imageURL } = Parser.objectify(rawData, this.properties);

    return {
      imageURL: Parser.parseImageFormula(imageURL),
      localisations: {
        EUnl: this.buildLocalised(rawData, 'EUnl'),
        USen: this.buildLocalised(rawData, 'USen'),
      },
    };
  }

  private buildLocalised(
    rawData: string[],
    targetLanguage: Language,
  ): ReactionLocalisations {
    const {
      iconFilename: label,
      source,
      sourceNotes,
    } = Parser.objectify(rawData, this.properties);

    const localiser = new Localiser(targetLanguage);

    return {
      name: localiser.get('aeon:String/Sp/STR_Emoticon', { label }),
      source: localiser.get('custom:reaction/source', source),
      sourceNotes: sourceNotes
        ? localiser.get('custom:reaction/sourceNotes', sourceNotes)
        : null,
    };
  }
}
