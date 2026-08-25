import React from "react";
import ReactDOM from "react-dom";
import "../../App.css";

export default function ExperienceModal({ exp, onClose }) {
  if (!exp) return null;

  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="experience-modal" onClick={(e) => e.stopPropagation()}>
        <div
          className="exp-modal-header"
          style={{ backgroundColor: exp.backgroundcolor, color: exp.fontColor }}
        >
          <div className="modal-close" onClick={onClose}>&times;</div>
          {exp.logo && (
            <img src={exp.logo} alt={`${exp.company} logo`} className="modal-logo" />
          )}
          <h3>{exp.title}</h3>
          <p className="company">{exp.company}</p>
          <em>{exp.dateLabel}</em>
        </div>
        <div className="exp-modal-body">
          <p>{exp.description}</p>
          <h5>Skills Utilized</h5>
          <ul className="skills-chip-list">
            {exp.list_skills.map((skill, idx) => (
              <li key={idx} className="skill-chip">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById("modal-root");
  return modalRoot ? ReactDOM.createPortal(modalContent, modalRoot) : null;
}
