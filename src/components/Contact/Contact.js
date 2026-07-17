import React from 'react';
import FadeIn from "react-fade-in";

function Contact() {
  return (

      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <FadeIn delay={300} transitionDuration={4000}>
               <h2 className="textAnimate titleStyling">Contact me.</h2>
              </FadeIn>
            </div>
           
          </div>
          <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-2">
               <FadeIn delay={500} transitionDuration={4000}>
                  <div className="card contactCard skillsAnimate">
                  <div className="contactImage" aria-hidden="true"><i className="fas fa-envelope"></i></div>
                    <h5 className="card-title">
                      Email
                    </h5>
                    <div className="card-text">
                      <a href="mailto:lrdjmoss@gmail.com" className="buttonClass buttonAnimation">Go</a>
                    </div>
                  </div>
                </FadeIn>
              </div>
              <div className="col-md-2">
                <FadeIn delay={500} transitionDuration={4000}>
                  <div className="card contactCard skillsAnimate">
                      <div className="contactImage" aria-hidden="true"><i className="fab fa-github"></i></div>
                      <h5 className="card-title">
                        Github
                      </h5>
                      <div className="card-text">
                      <a href="https://github.com/Loganrdj" rel="noopener noreferrer" target="_blank" className="buttonClass buttonAnimation">Go</a>
                    </div>
                  </div>
                </FadeIn>
              </div>
              <div className="col-md-2">
                <FadeIn delay={500} transitionDuration={4000}>
                  <div className="card contactCard skillsAnimate">
                    <div className="contactImage" aria-hidden="true"><i className="fab fa-linkedin"></i></div>
                    <h5 className="card-title">
                      LinkedIn
                    </h5>
                    <div className="card-text">
                    <a className="buttonClass buttonAnimation" rel="noopener noreferrer" target="_blank" href='https://www.linkedin.com/in/loganmoss/'>Go</a>
                    </div>
                  </div>
                </FadeIn>
              </div>
              <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    
  )
}

export default Contact;
