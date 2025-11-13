import { defineRouting } from "next-intl/routing";
import { i18n } from "./utils";

export const routing = defineRouting({
  locales: i18n.languages,
  defaultLocale: i18n.defaultLanguage,
  localePrefix: "as-needed",
});
