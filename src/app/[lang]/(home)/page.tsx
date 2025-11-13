import SingularityShaderDemo from "@/components/demo/singularity-shader-demo";
import { instrument } from "@/components/fonts";
import { cn } from "@/lib/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang);
  const t = await getTranslations({ locale: lang, namespace: "Hero" });
  return (
    <main className="relative overflow-hidden flex flex-1 flex-col text-center">
      {/* Hero content */}
      <SingularityShaderDemo className="absolute inset-0 max-h-[600px] md:max-h-[800px] -z-10" />
      {/* Gradient fade */}
      <div className="absolute inset-0 max-h-[600px] md:max-h-[800px] -z-10 bg-gradient-to-b from-transparent via-60% via-transparent  to-background" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto pt-[460px] md:pt-[600px] px-4">
        <h1
          className={cn(
            "mb-4 text-4xl sm:text-5xl md:text-7xl font-medium tracking-[-0.06em] text-balance leading-tight",
            instrument.className
          )}
        >
          {t("title")}
        </h1>
        <div className="flex flex-col mx-auto gap-6 justify-center max-w-[420px] text-fd-muted-foreground text-base md:text-lg">
          <p>
            {t("description-1")}
          </p>
          <p>
            {t("description-2")}
          </p>
          <p>
            {t("description-3")}
          </p>
        </div>
      </div>
    </main>
  );
}
