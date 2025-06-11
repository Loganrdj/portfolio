import React, { useState } from 'react';
import "../../App.css";
import projects from './projects.json';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <>
    <div className="projects-container">
      <div className="projects-grid projectRow">
        {projects.map(project => (
          <div key={project.id} className="cardCSS">
            <ScrollAnimation delay={300} animateIn="fadeIn">
              <img
                src={project.image}
                alt={project.alt}
                className="project-thumb paused"
                onClick={() => setSelected(project)}
                onMouseEnter={e => e.currentTarget.classList.remove('paused')}
                onMouseLeave={e => e.currentTarget.classList.add('paused')}
              />
            </ScrollAnimation>
          </div>
        ))}
      </div>
    </div>
    <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
