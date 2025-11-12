"use client";

import { Logo } from "./logo";

const navLinks = [
  { href: "/", label: "Index" },
  { href: "/posts", label: "Blog" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export function NavigationBar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-6xl px-4">
      <div className="flex items-center gap-3 bg-fd-primary-foreground/40 rounded-lg px-2 py-1 border border-primary/10 shadow-lg backdrop-blur-md">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Logo className="w-6 h-6 ml-1 text-primary/70" />
        </a>

        {/* Vertical Separator */}
        <div className="h-6 w-px bg-primary/20" />

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {navLinks.map((link) => {
            return (
              <a
                key={link.href}
                href={link.href}
                className="py-1 px-2 rounded-md text-sm font-medium text-primary transition-colors hover:bg-primary/10 hover:text-primary"
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
