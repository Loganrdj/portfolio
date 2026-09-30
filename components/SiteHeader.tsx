import Link from "next/link";

const NAV = [
  { href: "/projects/", label: "work" },
  { href: "/resume/", label: "resume" },
  { href: "/blog/", label: "blog" },
  { href: "/#contact", label: "contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <nav aria-label="Primary" className="site-nav">
        <Link href="/" className="site-wordmark">
          Logan Moss
        </Link>
        <ul className="site-links">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
