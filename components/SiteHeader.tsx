import Link from "next/link";

const NAV = [
  { href: "/projects/", label: "work" },
  { href: "/resume/", label: "resume" },
  { href: "/blog/", label: "blog" },
  { href: "/#contact", label: "contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-4"
      >
        <Link
          href="/"
          className="font-display text-lg leading-none font-bold tracking-tight"
        >
          Logan Moss
        </Link>
        <ul className="flex items-center gap-5 sm:gap-7">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-mono text-[0.78rem] tracking-wide text-grey-600 transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
