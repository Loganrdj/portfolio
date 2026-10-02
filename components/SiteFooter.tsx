const LINKS = [
  { href: "https://www.linkedin.com/in/loganmoss/", label: "LinkedIn" },
  { href: "https://github.com/Loganrdj", label: "GitHub" },
  { href: "mailto:loganrdjm@gmail.com", label: "Email" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div className="site-footer-inner">
        <p className="sec-kicker">Contact</p>
        <h2 className="sec-title">
          Let&rsquo;s build something
          <br />
          that runs itself.
        </h2>
        <ul className="site-footer-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="site-footer-credit">Designed and coded by Logan Moss</p>
      </div>
    </footer>
  );
}
