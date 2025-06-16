import React, { useState, useEffect } from 'react';
import "../../App.css";
import projectsData from './projects.json';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import ProjectModal from './ProjectModal';

const ITEMS_PER_BATCH = 3;

export default function Projects({ projects = projectsData }) {
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setVisibleCount(prev => Math.min(prev + ITEMS_PER_BATCH, projects.length));
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount in case the initial items don't fill the viewport
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length]);

  return (
    <>
    <div className="projects-container">
      <div className="projects-grid projectRow">
        {projects.slice(0, visibleCount).map(project => (
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
