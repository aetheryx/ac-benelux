import { Parser } from './Parser';
import { MessageCard, MessageCardLocalisations } from 'src/data/types/MessageCard';

export class MessageCardParser extends Parser<MessageCard> {
  public sheetNames = [
    'Message Cards',
  ];
  public properties = {
    'Name': 'name',
    'Image': 'imageURL',
    'Buy': 'buy',
    'Back Color': 'backColor',
    'Body Color': 'bodyColor',
    'Head Color': 'headColor',
    'Foot Color': 'footColor',
    'Pen Color 1': 'penColor1',
    'Pen Color 2': 'penColor2',
    'Pen Color 3': 'penColor3',
    'Pen Color 4': 'penColor4',
    'Start Date': 'startDate',
    'End Date': 'endDate',
    'NH Start Date': 'nhStartDate',
    'NH End Date': 'nhEndDate',
    'SH Start Date': 'shStartDate',
    'SH End Date': 'shEndDate',
    'Version': 'version',
    'Internal ID': 'internalID',
    'Unique Entry ID': 'uniqueEntryID',
  } as const;

  public parse(header: Parser.Row, row: Parser.Row): MessageCard {
    const {
      name,
      imageURL,
      buy,
    } = Parser.objectify(header, row, this.properties);

    if (name.endsWith('00')) {
      return null;
    }

    return {
      imageURL: Parser.parseImageFormula(imageURL),
      purchasePrice: Parser.parsePrice(buy),
      localisations: this.buildLocalisations(header, row),
    };
  }

  protected buildLocalisation(
    header: Parser.Row,
    row: Parser.Row,
    localiser: Parser.Localiser,
  ): MessageCardLocalisations {
    const {
      name,
      imageURL,
    } = Parser.objectify(header, row, this.properties);

    const mailPrefix = 'Card from ';
    const mailName = name.startsWith(mailPrefix) && name.replace(mailPrefix, '').toLowerCase();

    return {
      name: !mailName
        ? localiser.get('aeon:String/STR_MailDesign', {
          label: Parser.parseImageFormula(imageURL).split('/').at(-1).split('.')[0],
        })
        : localiser.get('aeon:String/STR_MailAddress', mailName) ??
          localiser.get('aeon:Mail/Sp/MAIL_SP_Airline', mailName),
    };
  }
}
