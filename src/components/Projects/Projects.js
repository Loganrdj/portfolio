import React, { useState, useEffect, useRef } from 'react';
import "../../App.css";
import projects from './projects.json';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 3, projects.length));
      }
    });
    const refCurrent = loadMoreRef.current;
    if (refCurrent) observer.observe(refCurrent);
    return () => {
      if (refCurrent) observer.unobserve(refCurrent);
      observer.disconnect();
    };
  }, [visibleCount]);

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
        {visibleCount < projects.length && (
          <div ref={loadMoreRef} style={{ height: '1px' }} />
        )}
      </div>
    </div>
    <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
