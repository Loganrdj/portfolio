"use client";

import { useState } from "react";

/**
 * Shows a lightweight still frame, and loads the animated demo only when the
 * card is hovered or focused.
 *
 * Several project thumbnails are animated WebP over 1MB each. Marking them
 * lazy was not enough — Chrome's lazy-load threshold is generous enough that
 * the whole grid still downloaded on load. Fetching the animation on intent
 * takes the Work page from ~13MB to a fraction of that, while keeping the
 * demos that make the grid worth looking at.
 */
export function ProjectThumb({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  const poster = src.replace(/thumb\.webp$/, "poster.webp");
  const [play, setPlay] = useState(false);

  return (
    <span
      className="pthumb"
      onMouseEnter={() => setPlay(true)}
      onFocus={() => setPlay(true)}
    >
      <img
        src={poster}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        // eslint-disable-next-line @next/next/no-img-element
      />
      {play && (
        <img
          className="pthumb-anim"
          src={src}
          alt=""
          aria-hidden="true"
          decoding="async"
          // eslint-disable-next-line @next/next/no-img-element
        />
      )}
    </span>
  );
}
