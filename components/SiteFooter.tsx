const LINKS = [
  { href: "https://www.linkedin.com/in/loganmoss/", label: "LinkedIn" },
  { href: "https://github.com/Loganrdj", label: "GitHub" },
  { href: "mailto:lrdjmoss@gmail.com", label: "Email" },
];

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-hairline bg-ink text-paper"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-16">
        <p className="font-mono text-[0.7rem] tracking-[0.18em] text-grey-400 uppercase">
          Output
        </p>
        <h2 className="font-display mt-3 max-w-[16ch] text-4xl leading-[1.05] font-bold sm:text-5xl">
          Let&rsquo;s build something that runs itself.
        </h2>
        <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-sm text-paper underline decoration-grey-600 underline-offset-4 transition-colors hover:decoration-paper"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 font-mono text-[0.7rem] text-grey-600">
          Designed and coded by Logan Moss
        </p>
      </div>
    </footer>
  );
}
