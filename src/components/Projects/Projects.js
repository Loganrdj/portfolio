import React, { Component } from 'react';
import "../../App.css"
import PreviewCard from "../PreviewCard/PreviewCard";
import projects from './projects.json'

class Projects extends Component {

  state = {
    projects
  }

  render() {
    return(
    <div className="row">
      {this.state.projects.map(project => (
        <div className="col-md-3">
        <PreviewCard 
          name = {project.name} 
          image = {project.image} 
          description = {project.description}
          url = {project.url} 
          linktype = {project.linktype}
          alt = {project.alt}
        />
        </div>
      ))}
    </div>
    
    )}
}

export default Projects;
