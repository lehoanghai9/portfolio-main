import { I18nConfig } from "fumadocs-core/i18n";
import type { Translations } from "fumadocs-ui/contexts/i18n";
import type { I18nProviderProps } from "fumadocs-ui/provider/base";
export type { I18nProviderProps, Translations };
export { defaultTranslations } from "fumadocs-ui/contexts/i18n";

export const locales = ["en", "hu", "vi"];

export const defaultLocale = "en";

export const translations: {
  [key: string]: Partial<Translations> & {
    displayName?: string;
  };
} = {
  en: {
    displayName: "English",
  },
  hu: {
    displayName: "Magyar",
  },
  vi: {
    displayName: "Tiếng Việt",
  },
};

export const i18n: I18nConfig = {
  defaultLanguage: defaultLocale,
  languages: locales,
  hideLocale: "default-locale",
  parser: "dot",
};

export function defineI18nUI<Languages extends string>(
  config: I18nConfig,
  options: {
    translations: {
      [K in Languages]?: Partial<Translations> & { displayName?: string };
    };
  }
) {
  const { translations } = options;

  return {
    provider(locale: string = config.defaultLanguage): I18nProviderProps {
      return {
        locale,
        translations: translations[locale as Languages],
        locales: config.languages.map((locale: string) => ({
          locale,
          name: translations[locale as Languages]?.displayName ?? locale,
        })),
      };
    },
  };
}
