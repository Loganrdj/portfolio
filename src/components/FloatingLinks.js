import React from 'react';
import '../App.css';

function FloatingLinks() {
  return (
    <div className="floating-links">
      <a
        href="https://www.linkedin.com/in/loganmoss/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button"
      >
        <i className="fab fa-linkedin"></i>
      </a>
      <a
        href="https://github.com/Loganrdj"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-button"
      >
        <i className="fab fa-github"></i>
      </a>
      <a href="mailto:lrdjmoss@gmail.com" className="floating-button">
        <i className="fas fa-envelope"></i>
      </a>
    </div>
  );
}

export default FloatingLinks;
