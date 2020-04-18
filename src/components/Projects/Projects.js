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
    <div>
    {this.state.projects.map(project => (
      <PreviewCard 
        name = {project.name} 
        image = {project.image} 
        description = {project.description}
        url = {project.url} 
        linktype = {project.linktype}
        alt = {project.alt}
      />
    )
  
    )
}</div>
    
    )}
}

export default Projects;
