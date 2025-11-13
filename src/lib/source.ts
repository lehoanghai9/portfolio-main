import { blogDocs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { i18n } from "./i18n/utils";

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  i18n: i18n,
  baseUrl: "/posts",
  source: blogDocs.toFumadocsSource(),
});
