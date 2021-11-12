import { Parser } from './Parser';
import { Villager, VillagerLocalisations } from '../../types/Villager';
import { Language } from '../../types/Language';
import { Localiser } from '../Localiser';

export class VillagerParser extends Parser<Villager> {
  public sheetName = 'Villagers';
  public properties = [
    'name',
    'iconImage',
    'photoImage',
    'houseImage',
    'species',
    'gender',
    'personality',
    'subType',
    'hobby',
    'birthday',
    'catchPhrase',
    'favoriteSong',
    'favoriteSaying',
    'style1',
    'style2',
    'color1',
    'color2',
    'defaultClothing',
    'defaultUmbrella',
    'wallPaper',
    'flooring',
    'furnitureList',
    'furnitureNameList',
    'diyWorkbench',
    'kitchenEquipment',
    'versionAdded',
    'nameColor',
    'bubbleColor',
    'filename',
  ] as const;

  public parse(rawData: string[]): Villager {
    const {
      iconImage,
      photoImage,
      houseImage,
      subType,
      filename,
    } = Parser.objectify(rawData, this.properties);

    const villager: Villager = {
      iconImageURL: Parser.parseImageCell(iconImage),
      photoImageURL: Parser.parseImageCell(photoImage),
      houseImageURL: Parser.parseImageCell(houseImage),
      subType: subType.toUpperCase(),
      id: filename,
      localisations: {
        EUnl: this.buildLocalised(rawData, 'EUnl'),
        USen: this.buildLocalised(rawData, 'USen'),
      },
    };

    return villager;
  }

  private buildLocalised(
    rawData: string[],
    targetLanguage: Language,
  ): VillagerLocalisations {
    const {
      gender,
      personality,
      hobby,
      birthday,
      favoriteSong,
      style1,
      style2,
      color1,
      color2,
      filename: label,
    } = Parser.objectify(rawData, this.properties);

    const localiser = new Localiser(targetLanguage);

    return {
      name: localiser.get('aeon:String/Npc/STR_NNpcName', { label }),
      birthday: localiser.formatDate(Parser.parseDate(birthday)),
      species: localiser.get('aeon:String/STR_Race', {
        label: `${label.replace(/\d*$/, '')}_${gender === 'Male' ? 'M' : 'F'}`,
      }),
      gender: localiser.get('custom:villager/gender', { gender }),
      personality: localiser.get('custom:villager/personality', { personality }),
      hobby: localiser.get('custom:villager/hobby', { hobby }),
      catchPhrase: localiser.get('aeon:String/Npc/STR_NNpcPhrase', { label }),
      favoriteSong: localiser.get('aeon:String/Item/STR_ItemName_82_Music', { favoriteSong }),
      favoriteSaying: Parser.cleanQuote(localiser.get('aeon:TalkSys/SYS_Motto', { label })),
      styles: Parser.dedupe([ style1, style2 ].map(style =>
        localiser.get('custom:villager/style', { style })
      )),
      colors: Parser.dedupe([ color1, color2 ].map(color =>
        localiser.get('custom:villager/color', { color })
      )),
    };
  }
}
