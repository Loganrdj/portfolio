import React from "react";
import ReactDOM from "react-dom";
import "../../App.css";

export default function ExperienceModal({ exp, onClose }) {
  if (!exp) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="experience-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close" onClick={onClose}>&times;</div>
        <h3>{exp.title}</h3>
        <p className="company">{exp.company}</p>
        <em>{exp.dateLabel}</em>
        <p>{exp.description}</p>
        <h5>SKILLS UTILIZED</h5>
        <ul className="skills-list">
            {exp.list_skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
            </ul>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root");
  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
}
