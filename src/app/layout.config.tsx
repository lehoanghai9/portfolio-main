import { config } from "@/config";
import { cn } from "@/lib/utils";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Bolt, Boxes, Sigma, SquareCode } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <Logo className="text-foreground/70 fill-foreground/10" />
      </div>
    ),
    enabled: false,
  },
  githubUrl: config.githubUrl,
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};

function Logo({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "lucide lucide-flower-lotus-icon lucide-flower-lotus",
        className
      )}
    >
      <path d="M12 20c0-5.5-4.5-10-10-10 0 5.5 4.5 10 10 10" />
      <path d="M9.7 8.3c-1.8-2-3.8-3.1-3.8-3.1s-.8 2.5-.5 5.4" />
      <path d="M15 12.9V12c0-4.4-3-8-3-8s-3 3.6-3 8v.9" />
      <path d="M18.6 10.6c.3-2.9-.5-5.4-.5-5.4s-2 1-3.8 3.1" />
      <path d="M12 20c5.5 0 10-4.5 10-10-5.5 0-10 4.5-10 10" />
    </svg>
  );
}
