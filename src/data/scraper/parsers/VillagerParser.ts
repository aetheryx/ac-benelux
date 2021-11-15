import { Parser } from './Parser';
import { Villager, VillagerLocalisations } from '../../types/Villager';
import dayjs from 'dayjs';

export class VillagerParser extends Parser<Villager> {
  public sheetNames = [
    'Villagers',
  ];
  public properties = {
    'Name': 'name',
    'Icon Image': 'iconImage',
    'Photo Image': 'photoImage',
    'House Image': 'houseImage',
    'Species': 'species',
    'Gender': 'gender',
    'Personality': 'personality',
    'Subtype': 'subType',
    'Hobby': 'hobby',
    'Birthday': 'birthday',
    'Catchphrase': 'catchPhrase',
    'Favorite Song': 'favoriteSong',
    'Favorite Saying': 'favoriteSaying',
    'Style 1': 'style1',
    'Style 2': 'style2',
    'Color 1': 'color1',
    'Color 2': 'color2',
    'Default Clothing': 'defaultClothing',
    'Default Umbrella': 'defaultUmbrella',
    'Wallpaper': 'wallPaper',
    'Flooring': 'flooring',
    'Furniture List': 'furnitureList',
    'Furniture Name List': 'furnitureNameList',
    'DIY Workbench': 'diyWorkbench',
    'Kitchen Equipment': 'kitchenEquipment',
    'Version Added': 'versionAdded',
    'Name Color': 'nameColor',
    'Bubble Color': 'bubbleColor',
    'Filename': 'filename',
    'Unique Entry ID': 'uniqueEntryID',
  } as const;

  public parse(header: Parser.Row, row: Parser.Row): Villager {
    const {
      iconImage,
      photoImage,
      houseImage,
      subType,
      birthday,
    } = Parser.objectify(header, row, this.properties);

    return {
      iconImageURL: Parser.parseImageFormula(iconImage),
      photoImageURL: Parser.parseImageFormula(photoImage),
      houseImageURL: Parser.parseImageFormula(houseImage),
      subType: subType.toUpperCase(),
      birthday: this.parseDate(birthday),
      localisations: this.buildLocalisations(header, row),
    };
  }

  private parseDate(date: string): dayjs.Dayjs {
    const [ month, day ] = date.split('/');
    // @ts-ignore: not included in types because of objectSupport plugin
    return dayjs({
      month: Number(month) - 1,
      day: Number(day),
    });
  }

  protected buildLocalisation(
    header: Parser.Row,
    row: Parser.Row,
    localiser: Parser.Localiser,
  ): VillagerLocalisations {
    const {
      gender,
      personality,
      hobby,
      favoriteSong,
      style1,
      style2,
      color1,
      color2,
      filename: label,
    } = Parser.objectify(header, row, this.properties);

    return {
      name: localiser.get('aeon:String/Npc/STR_NNpcName', { label }),
      species: localiser.get('aeon:String/STR_Race', {
        label: `${label.replace(/\d*$/, '')}_${gender === 'Male' ? 'M' : 'F'}`,
      }),
      gender: localiser.get('custom:villager/gender', gender),
      personality: localiser.get('custom:villager/personality', personality),
      hobby: localiser.get('custom:villager/hobby', hobby),
      catchPhrase: localiser.get('aeon:String/Npc/STR_NNpcPhrase', { label }),
      favoriteSong: localiser.get('aeon:String/Item/STR_ItemName_82_Music', favoriteSong),
      favoriteSaying: Parser.cleanQuote(localiser.get('aeon:TalkSys/SYS_Motto', { label })),
      styles: Parser.dedupe([ style1, style2 ].map(style =>
        localiser.get('aeon:String/Remake/STR_Remake_BodyColor', style) ??
        localiser.get('custom:villager/style', style)
      )),
      colors: Parser.dedupe([ color1, color2 ].map(color =>
        localiser.get('aeon:String/STR_Common_Color', color)
      )),
    };
  }
}
