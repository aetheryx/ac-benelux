import {
  Category as ConstructionCategory,
  Source as ConstructionSource,
} from 'animal-crossing/lib/types/Construction';
import {
  Gender as VillagerGender,
  Hobby as VillagerHobby,
  Style as VillagerStyle,
  Color as VillagerColor,
} from 'animal-crossing/lib/types/Villager';

type Translation<T extends PropertyKey> = Record<T, string>;

export namespace Construction {
  export const Category: Translation<ConstructionCategory> = {
    [ConstructionCategory.Bridge]: 'Brug',
    [ConstructionCategory.Door]: 'Deur',
    [ConstructionCategory.Incline]: 'Helling',
    [ConstructionCategory.Mailbox]: 'Postbus',
    [ConstructionCategory.Roofing]: 'Dak',
    [ConstructionCategory.Siding]: 'Muren',
  };

  export const Source: Translation<ConstructionSource> = {
    [ConstructionSource.Tent]: 'Tent',
    [ConstructionSource.InitialHouse]: 'Eerste huis',
    [ConstructionSource.ResidentServicesUpgrade]: 'Stadhuis Upgrade',
    [ConstructionSource.The3RDHouseUpgradeLeftRoom]: 'Derde Huis Upgrade (Linker Kamer)',
    [ConstructionSource.The4ThHouseUpgradeRightRoom]: 'Vierde Huis Upgrade (Rechter Kamer)',
    [ConstructionSource.The5ThHouseUpgrade2NdFloor]: 'Vijfde Huis Upgrade (Tweede Vloer)',
  };
}

export namespace Villager {
  export const Gender: Translation<VillagerGender> = {
    [VillagerGender.Female]: 'Vrouw',
    [VillagerGender.Male]: 'Man',
  };

  export const Hobby: Translation<VillagerHobby> = {
    [VillagerHobby.Education]: 'Educatie',
    [VillagerHobby.Fashion]: 'Mode',
    [VillagerHobby.Fitness]: 'Fitness',
    [VillagerHobby.Music]: 'Muziek',
    [VillagerHobby.Nature]: 'Natuur',
    [VillagerHobby.Play]: 'Spelen',
  };

  export const Style: Translation<VillagerStyle> = {
    [VillagerStyle.Active]: 'Actief',
    [VillagerStyle.Cool]: 'Cool',
    [VillagerStyle.Cute]: 'Cute',
    [VillagerStyle.Elegant]: 'Elegant',
    [VillagerStyle.Gorgeous]: 'Prachtig',
    [VillagerStyle.Simple]: 'Simpel',
  };

  export const Color: Translation<VillagerColor> = {
    [VillagerColor.Aqua]: 'Aqua',
    [VillagerColor.Beige]: 'Beige',
    [VillagerColor.Black]: 'Zwart',
    [VillagerColor.Blue]: 'Blauw',
    [VillagerColor.Brown]: 'Bruin',
    [VillagerColor.Colorful]: 'Kleurrijk',
    [VillagerColor.Gray]: 'Grijs',
    [VillagerColor.Green]: 'Groen',
    [VillagerColor.Orange]: 'Oranje',
    [VillagerColor.Pink]: 'Roze',
    [VillagerColor.Purple]: 'Paars',
    [VillagerColor.Red]: 'Rood',
    [VillagerColor.White]: 'Wit',
    [VillagerColor.Yellow]: 'Geel',
  };
}
