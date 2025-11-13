import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "../layout.config";
import { source } from "@/lib/source";
import { Folder, Item } from "@/components/sidebar-components";

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const lang = (await params).lang;
  return (
    <DocsLayout
      tree={source.pageTree[lang]}
      sidebar={{ components: { Folder, Item }, enabled: false }}
      {...baseOptions(lang)}
    >
      {children}
    </DocsLayout>
  );
}
