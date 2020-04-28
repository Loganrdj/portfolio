import React from 'react';

function ContactCard(props) {

  return (
    <div className="card">
      <div className="card-body">
      <img className="card-img-top" src={props.image_url} alt={props.alt} height="100%" width="100%"></img>
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
      </div>
      <div>
        <a href={props.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{props.name}</a>
      </div>
    </div>
  );
}

export default ContactCard;
