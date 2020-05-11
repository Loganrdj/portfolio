import React, { Component } from 'react';
import "../App.css";
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom'

class Home extends Component{


  render(){
    return (
        <div className="jumbotron">
          <FadeIn delay={700} transitionDuration={4000}>
            <h1 class="display-4 textAnimate">Hello.</h1>
          {/* </FadeIn>
          <FadeIn delay={2000} transitionDuration={4000}> */}
            <h2 className="textAnimate">My name is Logan Moss and I am a Fullstack Developer</h2>
            <hr className="my-4"></hr>
            <div className="row">
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3">
                <Link to="/resume" className="nav-link">
                  <button className="buttonClass buttonAnimation">Resume</button>
                </Link>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3">
              <Link to="/projects" className="nav-link">
                <button className="buttonClass buttonAnimation">Projects</button>
              </Link>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3">
              <Link to="/contact" className="nav-link">
                <button className="buttonClass buttonAnimation">Contact</button>
              </Link>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3">
                <button className="buttonClass buttonAnimation">Github</button>
              </div>
            </div>
            <hr className="my-4"></hr>
            <h2 className="textAnimate">My skills include:</h2>
            <div className="row">
              <div className="col-md-4">
                  <div className="containe textAnimate">
                  <FadeIn>
                    <h4>Python (2.7 and 3)</h4>
                    <h4>Java</h4>
                    <h4>JavaScript</h4>
                    <h4>JavaScript (ES6)</h4>
                    <h4>C</h4>
                    <h4>Node</h4>
                  </FadeIn>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="container textAnimate">
                  <FadeIn>
                    <h4>MySQL</h4>
                    <h4>MongoDB</h4>
                    <h4>Firebase</h4>
                    <h4>NoSQL</h4>
                    <h4>Express</h4>
                    <h4>Git</h4>
                    <h4>AJAX</h4>
                  </FadeIn>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="container textAnimate">
                  <FadeIn>
                    <h4>jQuery</h4>
                    <h4>HTML5</h4>
                    <h4>ReactJS</h4>
                    <h4>CSS</h4>
                    <h4>Express</h4>
                    <h4>Web Scraping (CheerioJS)</h4>
                    <h4>Bootstrap</h4>
                  </FadeIn>
                  </div>
                </div>
            </div>
          </FadeIn>
        </div>
    );
  } 
}

export default Home;
