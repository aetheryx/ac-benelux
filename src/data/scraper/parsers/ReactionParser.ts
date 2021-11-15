import { Parser } from './Parser';
import { Reaction, ReactionLocalisations } from 'src/data/types/Reaction';

export class ReactionParser extends Parser<Reaction> {
  public sheetNames = [
    'Reactions',
  ];
  public columns = {
    '#': 'index',
    'Name': 'name',
    'Image': 'imageURL',
    'Source': 'source',
    'Source Notes': 'sourceNotes',
    'Season/Event': 'seasonOrEvent',
    'Season/Event Exclusive': 'seasonOrEventExclusive',
    'Version Added': 'versionAdded',
    'Icon Filename': 'iconFilename',
    'Internal ID': 'internalID',
    'Unique Entry ID': 'uniqueEntryID',
  } as const;

  public parse(header: Parser.Row, row: Parser.Row): Reaction {
    const { imageURL } = Parser.objectify(header, row, this.columns);

    return {
      imageURL: Parser.parseImageFormula(imageURL),
      localisations: this.buildLocalisations(header, row),
    };
  }

  protected buildLocalisation(
    header: Parser.Row,
    row: Parser.Row,
    localiser: Parser.Localiser,
  ): ReactionLocalisations {
    const {
      iconFilename: label,
      source,
      sourceNotes,
    } = Parser.objectify(header, row, this.columns);

    return {
      name: localiser.get('aeon:String/Sp/STR_Emoticon', { label }),
      source: localiser.get('custom:reaction/source', source),
      sourceNotes: sourceNotes
        ? localiser.get('custom:reaction/sourceNotes', sourceNotes)
        : null,
    };
  }
}
