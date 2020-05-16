import React, { Component } from 'react';
import "../../App.css";
import FadeIn from 'react-fade-in';
// const PDFImage = require("pdf-image").PDFImage;
// import PDFViewer from "pdf-viewer-reactjs"
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Resume extends Component {
 render() {
  return (
    
      <div className="container resumeContainer">
        <FadeIn delay={300} transitionDuration={1000}>
        <div className="skillsAnimate resumeItem">
            <img src={"https://myusf.usfca.edu/sites/default/files/images/OMC/usf_f_h2_2c_rgb_360.png"} width={"30%"} alt="usf logo"></img>
            <div className="resumeFlexBody">
              <div>
                <h5><strong>Major:</strong> Advertising</h5>
                <h5><strong>Minor:</strong> Computer Science</h5>
              </div>
              <h5><strong>Graduation Date:</strong> May 2019</h5>
            </div>
        </div>
        <div className="skillsAnimate resumeItem">
            <img src={"https://davidmitroff.com/wp-content/uploads/2015/11/UC-Berkeley-Extension.png"} width={"30%"} alt="UCB logo"></img>
            <div className="resumeFlexBody">
              <h5>FullStack Development Bootcamp</h5>
              <h5><strong>Graduation Date:</strong> May 2020</h5>
            </div>
        </div>
        <div className="skillsAnimate resumeItem">
            <img src={"https://www.wing.vc/uploads/images/companies/Bungalow_Full_BlackColor.png"} width={"30%"} alt="bungalowgo"></img>
            <div className="resumeFlexBody">
              <h5>Data Associate - Contract</h5>
              <h5>Sep 2019 - Oct 2019</h5>
            </div>
        </div>
        <div className="skillsAnimate resumeItem">
        <img src={"https://myusf.usfca.edu/sites/default/files/images/OMC/usf_f_h2_2c_rgb_360.png"} width={"30%"} alt="usf logo"></img>
            <div className="resumeFlexBody">
              <div>
                <h5>Field Support</h5>
                <h5>Level 2 Operations</h5>
                <h5>System Admin</h5>
                <h5>Help Desk Specialist</h5>
              </div>
              <div>
                <h5>Aug 2019 - Oct 2019</h5>
                <h5>Jun 2019 - Aug 2019</h5>
                <h5>Aug 2016 - Oct 2018</h5>
                <h5>Feb 2016 - Aug 2016</h5>
              </div>
            </div>
        </div>
        </FadeIn>
      </div>
    
  )
 }
}

export default Resume;
