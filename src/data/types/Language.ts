export type Language = 'USen' | 'EUnl';
export type Localised<T> = {
  [language in Language]: T;
};
