import { Parser } from './Parser';
import { Language } from '../../types/Language';
import { Localiser } from '../Localiser';
import { MessageCard, MessageCardLocalisations } from 'src/data/types/MessageCard';

export class MessageCardParser extends Parser<MessageCard> {
  public sheetName = 'Message Cards';
  public properties = [
    'name',
    'imageURL',
    'buy',
    'backColor',
    'bodyColor',
    'headColor',
    'footColor',
    'penColor1',
    'penColor2',
    'penColor3',
    'penColor4',
    'startDate',
    'endDate',
    'nhStartDate',
    'nhEndDate',
    'nhEndDate',
    'shStartDate',
    'shEndDate',
    'version',
    'internalID',
    'uniqueEntryID',
  ] as const;

  public parse(rawData: string[]): MessageCard {
    const {
      name,
      imageURL,
      buy,
    } = Parser.objectify(rawData, this.properties);

    if (name.endsWith('00')) {
      return null;
    }

    return {
      imageURL: Parser.parseImageFormula(imageURL),
      purchasePrice: buy === 'NFS' ? null : Number(buy),
      localisations: {
        EUnl: this.buildLocalised(rawData, 'EUnl'),
        USen: this.buildLocalised(rawData, 'USen'),
      },
    };
  }

  private buildLocalised(
    rawData: string[],
    targetLanguage: Language,
  ): MessageCardLocalisations {
    const {
      name,
      imageURL,
    } = Parser.objectify(rawData, this.properties);

    const localiser = new Localiser(targetLanguage);
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
