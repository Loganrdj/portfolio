import React, { useEffect, useMemo, useState } from "react";
import "../../App.css";
import projectsData from "./projects.json";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All"); // All | Coding | Creative

  // 1) DEDUPE: if JSON has repeats, we only keep the first occurrence.
  // Choose a key that should be unique per project. id is best; fallback to name+image.
  const uniqueProjects = useMemo(() => {
    const seen = new Set();
    const out = [];

    for (const p of projectsData) {
      const uniqueKey = p.id != null ? `id:${p.id}` : `ni:${p.name}|${p.image}`;
      if (seen.has(uniqueKey)) continue;
      seen.add(uniqueKey);
      out.push(p);
    }

    return out;
  }, []);

  // 2) FILTER: exact match on normalized type
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return uniqueProjects;

    const target = activeFilter.trim().toLowerCase();
    return uniqueProjects.filter((p) => {
      const t = (p.type || "").trim().toLowerCase();
      return t === target;
    });
  }, [activeFilter, uniqueProjects]);

  // 3) DEBUG LOGS (this will tell us immediately what's wrong)
  useEffect(() => {
    const counts = uniqueProjects.reduce((acc, p) => {
      const t = (p.type || "MISSING").trim();
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});
    // eslint-disable-next-line no-console
    console.log("Projects total (unique):", uniqueProjects.length);
    // eslint-disable-next-line no-console
    console.log("Counts by type:", counts);
    // eslint-disable-next-line no-console
    console.log("Active filter:", activeFilter, "| Showing:", filteredProjects.length);
  }, [activeFilter, filteredProjects.length, uniqueProjects]);

  // Reveal cards when they enter the viewport (re-run on filter change)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".cardCSS");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <>
      <div className="projects-container">
        <div className="projectsFilterBar">
          <button
            type="button"
            className={`projectsFilterBtn ${activeFilter === "All" ? "active" : ""}`}
            onClick={() => setActiveFilter("All")}
          >
            All
          </button>

          <button
            type="button"
            className={`projectsFilterBtn ${activeFilter === "Coding" ? "active" : ""}`}
            onClick={() => setActiveFilter("Coding")}
          >
            Coding
          </button>

          <button
            type="button"
            className={`projectsFilterBtn ${activeFilter === "Creative" ? "active" : ""}`}
            onClick={() => setActiveFilter("Creative")}
          >
            Creative
          </button>
        </div>

        <div className="projects-grid projectRow">
          {filteredProjects.map((project) => (
            <div
              key={project.id != null ? `id:${project.id}` : `ni:${project.name}|${project.image}`}
              className="cardCSS"
            >
              <img
                src={project.image}
                alt={project.alt || project.name}
                className="project-thumb paused"
                onClick={() => setSelected(project)}
                onMouseEnter={(e) => e.currentTarget.classList.remove("paused")}
                onMouseLeave={(e) => e.currentTarget.classList.add("paused")}
              />
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
