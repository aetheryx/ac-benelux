import { ICreature } from 'animal-crossing';
import {
  Category as ConstructionCategory,
  Source as ConstructionSource,
} from 'animal-crossing/lib/types/Construction';
import {
  Shadow as CreatureShadow,
  MovementSpeed as CreatureMovementSpeed,
  Vision as CreatureVision,
  Weather as CreatureWeather,
  Color as CreatureColor,
  CatchDifficulty as CreatureCatchDifficulty,
} from 'animal-crossing/lib/types/Creature';
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

export namespace Creature {
  export const Shadow: Translation<CreatureShadow> = {
    [CreatureShadow.Large]: 'Large',
    [CreatureShadow.Long]: 'Long',
    [CreatureShadow.Medium]: 'Medium',
    [CreatureShadow.Small]: 'Small',
    [CreatureShadow.XLarge]: 'X-Large',
    [CreatureShadow.XLargeWFin]: 'X-Large w/Fin',
    [CreatureShadow.XSmall]: 'X-Small',
    [CreatureShadow.XXLarge]: 'XX-Large',
  };

  export const MovementSpeed: Translation<CreatureMovementSpeed> = {
    [CreatureMovementSpeed.Fast]: 'Fast',
    [CreatureMovementSpeed.Medium]: 'Medium',
    [CreatureMovementSpeed.Slow]: 'Slow',
    [CreatureMovementSpeed.Stationary]: 'Stationary',
    [CreatureMovementSpeed.VeryFast]: 'Very fast',
    [CreatureMovementSpeed.VerySlow]: 'Very slow',
  };

  export const Vision: Translation<CreatureVision> = {
    [CreatureVision.Medium]: 'Medium',
    [CreatureVision.Narrow]: 'Narrow',
    [CreatureVision.VeryNarrow]: 'Very Narrow',
    [CreatureVision.VeryWide]: 'Very Wide',
    [CreatureVision.Wide]: 'Wide',
  };

  export const Weather: Translation<CreatureWeather> = {
    [CreatureWeather.AnyExceptRain]: 'Any except rain',
    [CreatureWeather.AnyWeather]: 'Any weather',
    [CreatureWeather.RainOnly]: 'Rain only',
  };

  export const WhereHow: Translation<ICreature['whereHow']> = {
    undefined,
    'On trees (any kind)': 'On trees (any kind)',
    'Flying near flowers': 'Flying near flowers',
    'Sea': 'Sea',
    'River': 'River',
    'On rotten turnips or candy': 'On rotten turnips or candy',
    'Shaking trees (hardwood or cedar only)': 'Shaking trees (hardwood or cedar only)',
    'Flying near water': 'Flying near water',
    'On the ground': 'On the ground',
    'Pier': 'Pier',
    'On palm trees': 'On palm trees',
    'On hardwood/cedar trees': 'On hardwood/cedar trees',
    'Pond': 'Pond',
    'From hitting rocks': 'From hitting rocks',
    'River (clifftop)': 'River (clifftop)',
    'On tree stumps': 'On tree stumps',
    'Sea (rainy days)': 'Sea (rainy days)',
    'Flying': 'Flying',
    'On rivers/ponds': 'On rivers/ponds',
    'Pushing snowballs': 'Pushing snowballs',
    'On villagers': 'On villagers',
    'Flying near trash (boots, tires, cans, used fountain fireworks) or rotten turnips': 'Flying near trash (boots, tires, cans, used fountain fireworks) or rotten turnips',
    'Disguised on shoreline': 'Disguised on shoreline',
    'River (mouth)': 'River (mouth)',
    'On flowers': 'On flowers',
    'Underground (dig where noise is loudest)': 'Underground (dig where noise is loudest)',
    'Flying near light sources': 'Flying near light sources',
    'On white flowers': 'On white flowers',
    'Flying near blue/purple/black flowers': 'Flying near blue/purple/black flowers',
    'On rocks/bushes': 'On rocks/bushes',
    'Disguised under trees': 'Disguised under trees',
    'Shaking trees': 'Shaking trees',
    'On beach rocks': 'On beach rocks',
  };

  export const Color: Translation<CreatureColor> = {
    [CreatureColor.Aqua]: 'Aqua',
    [CreatureColor.Beige]: 'Beige',
    [CreatureColor.Black]: 'Black',
    [CreatureColor.Blue]: 'Blue',
    [CreatureColor.Brown]: 'Brown',
    [CreatureColor.Gray]: 'Gray',
    [CreatureColor.Green]: 'Green',
    [CreatureColor.Orange]: 'Orange',
    [CreatureColor.Pink]: 'Pink',
    [CreatureColor.Purple]: 'Purple',
    [CreatureColor.Red]: 'Red',
    [CreatureColor.White]: 'White',
    [CreatureColor.Yellow]: 'Yellow',
  };

  export const CatchDifficulty: Translation<CreatureCatchDifficulty> = {
    [CreatureCatchDifficulty.Easy]: 'Easy',
    [CreatureCatchDifficulty.Hard]: 'Hard',
    [CreatureCatchDifficulty.Medium]: 'Medium',
    [CreatureCatchDifficulty.VeryEasy]: 'Very Easy',
    [CreatureCatchDifficulty.VeryHard]: 'Very Hard',
  };
}
