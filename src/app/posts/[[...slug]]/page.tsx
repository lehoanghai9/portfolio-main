import { DocsFooter } from "@/components/docs-footer";
import { departureMono, instrument } from "@/components/fonts";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { getMDXComponents } from "@/mdx-components";
import { format } from "date-fns";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function BlogPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
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
        <div className="flex flex-col gap-6 mb-6">
          <div className="flex items-center justify-between ">
            <DocsTitle
              className={cn("text-5xl font-normal", instrument.className)}
            >
              {page.data.title}
            </DocsTitle>
          </div>
          <span
            className={cn(
              "text-sm text-muted-foreground",
              departureMono.className
            )}
          >
            {format(new Date(page.data.date), "MMM d, yyyy")}
          </span>
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
