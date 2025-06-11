import React from "react";
import ReactDOM from "react-dom";
import "../../App.css";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="experience-modal" onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "600px" }}>
        <div className="modal-close" onClick={onClose}>&times;</div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div style={{ marginTop: "1rem" }}>
          {project.deployed_url && (
            <a href={project.deployed_url} target="_blank" rel="noopener noreferrer" className="buttonClass">Website</a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="buttonClass">Github</a>
          )}
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root");
  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
}
