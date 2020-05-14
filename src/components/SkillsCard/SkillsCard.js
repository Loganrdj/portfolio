import React from 'react';
import '../../App.css';

function SkillsCard(props) {

  return (
    <div className="card skillsCard ">
      <i className={props.icon}></i>
      <div className="card-body textAnimate">
        <h5 className="card-title textAnimate">{props.category}</h5>
        
      </div>
    </div>
  );
}

export default SkillsCard;
