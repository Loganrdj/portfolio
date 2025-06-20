import React, { useState, useEffect } from 'react';
import "../../App.css";
import projects from './projects.json';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selected, setSelected] = useState(null);

  // Reveal project cards when they enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.cardCSS');
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div className="projects-container">
      <div className="projects-grid projectRow">
        {projects.map(project => (
          <div key={project.id} className="cardCSS">
            <img
              loading="lazy"
              src={project.image}
              alt={project.alt}
              className="project-thumb paused"
              onClick={() => setSelected(project)}
              onMouseEnter={e => e.currentTarget.classList.remove('paused')}
              onMouseLeave={e => e.currentTarget.classList.add('paused')}
            />
          </div>
        ))}
      </div>
    </div>
    <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
