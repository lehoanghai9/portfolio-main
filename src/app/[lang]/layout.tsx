import "@/app/global.css";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { RootProvider } from "fumadocs-ui/provider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Databuddy } from "@databuddy/sdk";
import { Toaster } from "@/components/ui/sonner";
import { NavigationBar } from "@/components/navigation-bar";
import { defineI18nUI, i18n } from "@/lib/i18n/utils";
import { routing } from "@/lib/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { inter } from "@/components/fonts";
import { translations } from "@/lib/i18n/utils";

const { provider } = defineI18nUI(i18n, {
  translations,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });
  return {
    title: {
      default: siteConfig.title,
      template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: ["Next.js", "React"],
    authors: [
      {
        name: "Le Hoang Hai",
      },
    ],
    openGraph: {
      type: "website",
      locale: lang,
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [`${siteConfig.url}/opengraph-image.png`],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.svg",
      apple: "/apple-touch-icon.png",
    },
    /* manifest: `${siteConfig.url}/site.webmanifest`, */
    other: {
      "google-site-verification": "aI5tSvPhdkm7BVkrBx_i8S2sHzfP7DxvPNbSCpBRfzo",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: ReactNode;
}) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }
  setRequestLocale(lang);
  return (
    <html
      lang={lang}
      className={cn(inter.className, "antialiased")}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider>
          <RootProvider i18n={provider(lang)}>
            <NavigationBar />
            {children}

            <Databuddy
              clientId="HMM4VGqblgu59xr2UOpco"
              trackOutgoingLinks
              trackInteractions
              trackEngagement
              trackBounceRate
              trackWebVitals
              enableBatching
            />

            <Toaster />
          </RootProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
