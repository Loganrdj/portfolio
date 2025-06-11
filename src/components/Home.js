import React, { Component } from 'react';
import "../App.css";
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
// import SkillsCard from './SkillsCard/SkillsCard';
import skills from './SkillsCard/skills.json'

class Home extends Component{

  state = {
    skills
  }

  render(){
    return (
        <div className="jumbotron jumbotron-fluid jumboSpacing">
          <div className="backgroundImg">       
          <FadeIn delay={400} transitionDuration={4000}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 textAnimate titleStyling">Hello.</h1>
              </div>
            </div>
          {/* </FadeIn>
          <FadeIn delay={2000} transitionDuration={4000}> */}
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="textAnimate">My name is Logan Moss,</h3>
              <h3 className="textAnimate">and I am a Fullstack Developer </h3>
              <h3 className="textAnimate">based in San Francisco.</h3>
            </div>
          </div>
            
            <hr className="my-4"></hr>
            <h2 className="textAnimate headerSpacing">My skills include:</h2>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
                <div className="container">
                  <FadeIn>
                    <div className="card skillsCard skillsAnimate">
                      <i className="far fa-file-code fa-4x"></i>
                      <div className="card-body textAnimate">
                        <h5 className="card-title textAnimate stStyling">Languages</h5>
                        <p className="card-text textAnimate">Python (2.7 and 3)</p>
                        <p className="card-text textAnimate">Java</p>
                        <p className="card-text textAnimate">JavaScript</p>
                        <p className="card-text textAnimate">JavaScript (ES 6)</p>
                        <p className="card-text textAnimate">C</p>
                        <p className="card-text textAnimate">Node</p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <div className="container">
                  <FadeIn>
                    <div className="card skillsCard skillsAnimate">
                      <i className="fas fa-server fa-4x"></i>
                      <div className="card-body textAnimate">
                        <h5 className="card-title textAnimate stStyling">Backend Infrastructure</h5>
                        <p className="card-text textAnimate">MySQL</p>
                        <p className="card-text textAnimate">MongoDB</p>
                        <p className="card-text textAnimate">Firebase</p>
                        <p className="card-text textAnimate">Express</p>
                        <p className="card-text textAnimate">Git</p>
                        <p className="card-text textAnimate">AJAX</p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12">
              <div className="container">
                  <FadeIn>
                    <div className="card skillsCard skillsAnimate">
                      <i className="fas fa-laptop-code fa-4x"></i>
                      <div className="card-body textAnimate">
                        <h5 className="card-title textAnimate stStyling">Web Development</h5>
                        <p className="card-text textAnimate">jQuery</p>
                        <p className="card-text textAnimate">HTML5</p>
                        <p className="card-text textAnimate">ReactJS</p>
                        <p className="card-text textAnimate">CSS</p>
                        <p className="card-text textAnimate">Web Scraping (CheerioJS)</p>
                        <p className="card-text textAnimate">Bootstrap</p>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
            </div>
            <div className="container">
              <div className="row">  
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3 col-xs-3">
                <Link to="/resume" className="nav-link">
                  <button className="buttonClass buttonAnimation">Resume</button>
                </Link>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3 col-xs-3">
                <Link to="/projects" className="nav-link">
                  <button className="buttonClass buttonAnimation">Projects</button>
                </Link>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3 col-xs-3">
                <Link to="/contact" className="nav-link">
                  <button className="buttonClass buttonAnimation">Contact</button>
                </Link>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3 col-xs-3">
                <div className="nav-link">
                  <button className="buttonClass buttonAnimation">Github</button>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4"></hr>
          <p><a href="mailto:lrdjmoss@gmail.com">Email</a> me!</p>
          </FadeIn>
          </div>
        </div>
    );
  } 
}

export default Home;
