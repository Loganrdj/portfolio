import type { MDXComponents } from "mdx/types";

/**
 * Prose styling for MDX bodies.
 *
 * These were originally Tailwind colour utilities picked for the light theme
 * (text-grey-900 on paper). After the site went dark they became dark-on-dark —
 * inline links measured 1.38:1, effectively invisible. Styling now lives in
 * .prose in globals.css against the dark tokens, with contrast verified.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="prose-h2" {...props} />,
  h3: (props) => <h3 className="prose-h3" {...props} />,
  p: (props) => <p className="prose-p" {...props} />,
  ul: (props) => <ul className="prose-ul" {...props} />,
  ol: (props) => <ol className="prose-ol" {...props} />,
  li: (props) => <li className="prose-li" {...props} />,
  a: (props) => <a className="prose-a" {...props} />,
  strong: (props) => <strong className="prose-strong" {...props} />,
  code: (props) => <code className="prose-code" {...props} />,
  pre: (props) => <pre className="prose-pre" {...props} />,
  blockquote: (props) => <blockquote className="prose-quote" {...props} />,
  hr: (props) => <hr className="prose-hr" {...props} />,
};
