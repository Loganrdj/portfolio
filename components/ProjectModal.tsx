"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

/**
 * Project detail modal.
 *
 * The rebuild left project cards inert — the description was clamped and the
 * photo sets were unreachable. This restores the old site's behaviour in the
 * current style: full description, every link, and the gallery for the shoots
 * that have one, with click-to-enlarge.
 *
 * Gallery images are the full-size originals, so they load lazily and only
 * once the modal is open.
 */
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    if (zoomed) {
      setZoomed(null);
      return;
    }
    onClose();
  }, [zoomed, onClose]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, close]);

  // Reset the zoom when switching projects.
  useEffect(() => {
    setZoomed(null);
  }, [project]);

  if (!project) return null;
  const media = (project.media ?? []).filter(Boolean);

  return (
    <div
      className="xmodal-overlay"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pmodal-title"
    >
      <div
        className="xmodal pmodal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="xmodal-close"
          onClick={onClose}
          aria-label="Close project"
        >
          &times;
        </button>

        <p className="xmodal-company">{project.type}</p>
        <h2 id="pmodal-title" className="xmodal-title">
          {project.name}
        </h2>
        <p className="xmodal-desc">{project.description}</p>

        <div className="pmodal-links">
          {project.deployed_url && (
            <a
              href={project.deployed_url}
              target="_blank"
              rel="noopener noreferrer"
              className="kbtn kbtn-solid"
            >
              {project.deployed_tag || "Visit site"}
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="kbtn kbtn-ghost"
            >
              {project.github_tag || "Code"}
            </a>
          )}
        </div>

        {media.length > 0 && (
          <>
            <p className="xmodal-label">
              Gallery — {media.length} image{media.length === 1 ? "" : "s"}
            </p>
            <ul className="pmodal-gallery">
              {media.map((src, i) => (
                <li key={src}>
                  <button
                    type="button"
                    className="pmodal-shot"
                    onClick={() => setZoomed(src)}
                    aria-label={`Enlarge image ${i + 1} of ${media.length}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" decoding="async" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {zoomed && (
        <div
          className="pmodal-zoom"
          onClick={(e) => {
            e.stopPropagation();
            setZoomed(null);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoomed} alt={project.alt} />
        </div>
      )}
    </div>
  );
}
