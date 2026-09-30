import type { MDXComponents } from "mdx/types";

/**
 * Prose styling for MDX bodies. Applied per-element rather than via a plugin
 * so blog typography stays on the same tokens as the rest of the site.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="font-display mt-12 text-2xl font-bold" {...props} />
  ),
  h3: (props) => (
    <h3 className="font-display mt-8 text-xl font-bold" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 text-[1.05rem] leading-[1.75] text-grey-900" {...props} />
  ),
  ul: (props) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-grey-900" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-grey-900" {...props} />
  ),
  a: (props) => (
    <a
      className="underline decoration-grey-400 underline-offset-4 transition-colors hover:decoration-ink"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="bg-paper-dim font-mono rounded px-1.5 py-0.5 text-[0.9em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-ink text-paper font-mono mt-6 overflow-x-auto rounded-lg p-5 text-sm leading-relaxed"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-signal mt-6 border-l-2 pl-5 text-grey-600 italic"
      {...props}
    />
  ),
};
