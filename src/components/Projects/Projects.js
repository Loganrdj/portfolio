import React, { Component } from 'react';
import "../../App.css"
import PreviewCard from "../PreviewCard/PreviewCard";
import projects from './projects.json';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

class Projects extends Component {

  state = {
    projects
  }

  render() {
    return(
    <div className="row projectRow">
      {this.state.projects.map(project => (
        <div className="col-md-4 col-sm-6 col-lg-4 col-xl-3 col-12 cardCSS">
          <ScrollAnimation delay={300} animateIn="fadeIn">
            <PreviewCard 
              name = {project.name} 
              image = {project.image} 
              description = {project.description}
              deployed_url = {project.deployed_url} 
              github_url = {project.github_url}
              deployed_github = {project.deployed_github}
              deployed_tag = {project.deployed_tag}
              alt = {project.alt}
            />
          </ScrollAnimation>
        </div>
      ))}
    </div>
    
    )}
}

export default Projects;
