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
            <h2 class="textAnimate">My name is Logan Moss and I am a Fullstack Developer</h2>
            <hr className="my-4"></hr>
            <div className="row">
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3">
                <Link to="/resume" className="nav-link">
                  <button className="buttonClass buttonAnimation">Resume</button>
                </Link>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-3 col-xl-3">
              <Link to="/projects" className="nav-link">
                <button className="buttonClass buttonAnimation">Portfolio</button>
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
            
          </FadeIn>
        </div>
    );
  } 
}

export default Home;
