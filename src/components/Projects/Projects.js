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
    <div className="row projectRow">
      {projects.map(project => (
        <div key={project.id} className="col-md-4 col-sm-6 col-lg-4 col-xl-3 col-12 cardCSS">
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
    <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
