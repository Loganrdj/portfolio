import React from 'react';
// import ContactCard from './ContactCard';
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
                  <img className="contactImage card-img-top" src='https://s.yimg.com/ny/api/res/1.2/Z0IeexnHzGkEnU9Ddu4gYQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9ODAw/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/50d83eba70e8a76ea48f9ec234332c0c' alt="Email"></img>
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
                      <img className="contactImage card-img-top" src='https://avatars0.githubusercontent.com/u/9919?s=280&v=4' alt="Github"></img>
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
                    <img className="contactImage card-img-top" src='https://ya-webdesign.com/transparent250_/linkedin-png-icon-4.png' alt="linkedin"></img>
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
