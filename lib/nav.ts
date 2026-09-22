export const SECTIONS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/books", label: "Books" },
  { href: "/gallery", label: "Gallery" },
  { href: "/codex", label: "Codex" },
  { href: "/about", label: "About" },
] as const;

/** Off-site and utility links, kept out of the section nav. */
export const UTILITY = [
  { href: "/colophon", label: "Colophon" },
] as const;
