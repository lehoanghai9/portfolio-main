import { DocsFooter } from "@/components/docs-footer";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { format } from "date-fns";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function BlogPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  console.log(params);
  const page = source.getPage(params.slug);
  console.log(source.getPages());
  console.log(page);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <div className="max-w-full lg:max-w-[820px] pt-[250px] mx-auto">
      <DocsPage
        /* toc={page.data.toc} */
        full={page.data.full}
        footer={{
          enabled: true,
          component: <DocsFooter />,
        }}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <DocsTitle className="text-5xl font-serif font-normal">
              {page.data.title}
            </DocsTitle>

            {/* <MarkdownActions
              content={page.data.content}
              className="hidden lg:flex"
            /> */}
          </div>
          <span
            className="text-sm text-muted-foreground mt-4"
          >
            {format(new Date(page.data.date), "MMM d, yyyy")}
          </span>
          {/* <MarkdownActions content={page.data.content} className="lg:hidden" /> */}
          {/* <div className="mb-8 flex items-center gap-2">
            {page.data.links?.docs && (
              <Button
                variant="secondary"
                className="h-6 text-xs !px-2 gap-1.5"
                render={
                  <Link
                    href={page.data.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                Docs <ArrowUpRight className="size-3" />
              </Button>
            )}
            {page.data.links?.api && (
              <Button
                variant="secondary"
                className="h-6 text-xs !px-2 gap-1.5"
                render={
                  <Link
                    href={page.data.links.api}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                API Reference <ArrowUpRight className="size-3" />
              </Button>
            )}
          </div> */}
        </div>
        <DocsBody>
          <MDXContent
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
