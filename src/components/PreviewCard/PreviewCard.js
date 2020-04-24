import React from 'react';
import './style.css';

function PreviewCard(props) {

  return (
    <div className="card">
      <img className="card-img-top" src={props.image} alt={props.alt} height="250px" width="400px"></img>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
      </div>
        <a href={props.url} className="btn btn-primary">{props.linktype}</a>
    </div>
  );
}

export default PreviewCard;
