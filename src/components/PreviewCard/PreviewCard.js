import React from 'react';
import '../../App.css';

function PreviewCard(props) {

  let button;
  if(props.deployed_url !== undefined){
    button = <a href={props.deployed_url} target="_blank" rel="noopener noreferrer" className="buttonClass buttonAnimation ">{props.deployed_tag}</a>
  }
  let githubButton;
  if(props.github_url !== undefined){
    githubButton = <a href={props.github_url} target="_blank" rel="noopener noreferrer" className="buttonClass buttonAnimation ">Github</a>
  }

  return (
    <div className="projectCard cardAnimate">
      <img className="card-img-top" src={props.image} alt={props.alt} height="250px" width="400px"></img>
      <div className="card-body projectCardBody">
        <h5 className="card-title projectCardTitle">{props.name}</h5>
        <p className="card-text">{props.description}</p>
      </div>
      <div className="cardButtons">
        {button}
        {githubButton}
      </div>
    </div>
  );
}

export default PreviewCard;
