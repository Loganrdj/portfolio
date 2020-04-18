import React from 'react';
import './style.css';

function PreviewCard(props) {

  return (
    <div className="card">
      <img className="card-img-top" src={props.image} alt={props.alt} height="90%" width="90%"></img>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
        <a href={props.url} className="btn btn-primary">{props.linktype}</a>
      </div>
    </div>
  );
}

export default PreviewCard;
