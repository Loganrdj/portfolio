"use client";

import { useState } from "react";
import { ProjectModal } from "@/components/ProjectModal";
import { ProjectThumb } from "@/components/ProjectThumb";
import type { Project } from "@/data/projects";

type Discipline = {
  key: string;
  label: string;
  blurb: string;
  items: Project[];
};

/**
 * The two disciplines sit side by side as tabs rather than stacked sections,
 * so the split is visible at a glance and switching is one click. The grid
 * cross-fades on change — keyed on the active tab so React remounts it and the
 * entry animation replays.
 */
export function WorkTabs({ disciplines }: { disciplines: Discipline[] }) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const current = disciplines[active];

  return (
    <div className="wtabs">
      <div className="wtabs-bar" role="tablist" aria-label="Disciplines">
        {disciplines.map((d, i) => (
          <button
            key={d.key}
            type="button"
            role="tab"
            id={`wtab-${d.key}`}
            aria-selected={i === active}
            aria-controls="wtab-panel"
            className="wtab"
            data-active={i === active || undefined}
            onClick={() => setActive(i)}
          >
            <span className="wtab-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="wtab-label">{d.label}</span>
            <span className="wtab-count">{d.items.length}</span>
          </button>
        ))}
      </div>

      <p className="wtabs-blurb">{current.blurb}</p>

      <div
        className="wtabs-panel"
        id="wtab-panel"
        role="tabpanel"
        aria-labelledby={`wtab-${current.key}`}
        key={current.key}
      >
        <ul className="pgrid">
          {current.items.map((p, i) => (
            <li
              key={p.id}
              className="pcard"
              style={{ ["--i" as string]: String(Math.min(i, 11)) }}
            >
              <button
                type="button"
                className="pcard-open"
                onClick={() => setSelected(p)}
                aria-label={`Open details for ${p.name}`}
              >
                <span className="pcard-thumb">
                  <ProjectThumb src={p.image} alt={p.alt} eager={i === 0} />
                  <span className="pcard-cue" aria-hidden="true">
                    {p.media?.length ? `${p.media.length} images` : "Details"}
                  </span>
                </span>
                <span className="pcard-title">{p.name}</span>
              </button>
              <p className="pcard-desc">{p.description}</p>
              <div className="pcard-links">
                {p.deployed_url && (
                  <a href={p.deployed_url} target="_blank" rel="noopener noreferrer">
                    {p.deployed_tag || "Site"} &rarr;
                  </a>
                )}
                {p.github_url && (
                  <a
                    href={p.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pcard-link-muted"
                  >
                    {p.github_tag || "Code"} &rarr;
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
