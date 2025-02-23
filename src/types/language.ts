export enum LANGUAGE {
  TR = "tr",
  EN = "en",
  DE = "de",
  FR = "fr",
  ES = "es",
  IT = "it",
}

export interface LanguageInfo {
  code: LANGUAGE;
  name: string;
  flag: string;
}

export const LANGUAGE_LIST: LanguageInfo[] = [
  {
    code: LANGUAGE.TR,
    name: "Türkçe",
    flag: "🇹🇷",
  },
  {
    code: LANGUAGE.EN,
    name: "English",
    flag: "🇬🇧",
  },
  {
    code: LANGUAGE.DE,
    name: "Deutsch",
    flag: "🇩🇪",
  },
  {
    code: LANGUAGE.FR,
    name: "Français",
    flag: "🇫🇷",
  },
  {
    code: LANGUAGE.ES,
    name: "Español",
    flag: "🇪🇸",
  },
  {
    code: LANGUAGE.IT,
    name: "Italiano",
    flag: "🇮🇹",
  },
];
