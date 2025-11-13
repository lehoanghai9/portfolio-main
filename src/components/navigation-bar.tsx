"use client";

import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SettingsIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { locales, translations } from "@/lib/i18n/utils";

const navLinks = [
  { href: "/", label: "index" },
  { href: "/#posts", label: "articles" },
];

export function NavigationBar() {
  const t = useTranslations("Navigation");
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-6xl px-4">
      <div className="flex items-center gap-3 bg-fd-primary-foreground/40 rounded-lg px-2 py-1 border border-primary/10 shadow-lg backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo className="w-6 h-6 ml-1 text-primary/70" />
        </Link>

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-primary/20" />

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {navLinks.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="py-1 px-2 rounded-md text-sm font-medium text-primary transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {t(link.label)}
              </Link>
            );
          })}
          <SettingsDropdown />
        </div>
      </div>
    </nav>
  );
}

const SettingsDropdown = () => {
  const contentClassName =
    "w-40 bg-fd-primary-foreground/40 rounded-lg px-2 py-1 border border-primary/10 shadow-lg backdrop-blur-md";

  const { setTheme } = useTheme();
  const t = useTranslations("Settings");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="transition-colors hover:bg-primary/10 hover:text-primary p-1.5 rounded-md cursor-pointer">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={contentClassName} align="start">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t("language")}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={contentClassName}>
                <LocaleSwitcher />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>{t("theme")}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={contentClassName}>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  {t("dark")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  {t("light")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  {t("system")}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LocaleSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: locale }
      );
    });
  };
  return (
    <>
      {locales.map((locale) => (
        <DropdownMenuItem
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          disabled={isPending}
        >
          {translations[locale].displayName}
        </DropdownMenuItem>
      ))}
    </>
  );
};
