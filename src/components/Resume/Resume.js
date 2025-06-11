import React, { Component } from 'react';
import "../../App.css";
import FadeIn from 'react-fade-in';

const experiences = [
  {
    img: "https://www.insidehighered.com/sites/default/server_files/styles/large-copy/public/media/trilogy-logo-2016-horizontal-for-light-bg_0.png?itok=M6IdyMFS",
    alt: "UCB logo",
    titles: ["Full Stack Flex TA", "Data Analytics TA"],
    dates: ["July 2020 - Present"]
  },
  {
    img: "https://www.wing.vc/uploads/images/companies/Bungalow_Full_BlackColor.png",
    alt: "bungalowgo",
    titles: ["Data Associate - Contract"],
    dates: ["Sep 2019 - Oct 2019"]
  },
  {
    img: "https://myusf.usfca.edu/sites/default/files/images/OMC/usf_f_h2_2c_rgb_360.png",
    alt: "usf logo",
    titles: ["Field Support", "Level 2 Operations", "System Admin", "Help Desk Specialist"],
    dates: [
      "Aug 2019 - Oct 2019",
      "Jun 2019 - Aug 2019",
      "Aug 2016 - Oct 2018",
      "Feb 2016 - Aug 2016"
    ]
  }
];

const educationexp = [
  {
    img: "https://davidmitroff.com/wp-content/uploads/2015/11/UC-Berkeley-Extension.png",
    alt: "UCB logo",
    titles: ["FullStack Development Bootcamp"],
    dates: ["Graduation Date: May 2020"]
  },
  {
    img: "https://myusf.usfca.edu/sites/default/files/images/OMC/usf_f_h2_2c_rgb_360.png",
    alt: "usf logo",
    titles: ["Major: Advertising", "Minor: Computer Science"],
    dates: ["Graduation Date: May 2019"]
  }
];
// const PDFImage = require("pdf-image").PDFImage;
// import PDFViewer from "pdf-viewer-reactjs"
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Resume extends Component {
  state = { view: 'career' };

  renderItem(item) {
    return (
      <div className="skillsAnimate resumeItem" key={item.titles[0]}>
        <img src={item.img} width={"30%"} alt={item.alt}></img>
        <div className="resumeFlexBody">
          <div>
            {item.titles.map((t, i) => <h5 key={i}>{t}</h5>)}
          </div>
          <div>
            {item.dates.map((d, i) => <h5 key={i}>{d}</h5>)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const current = this.state.view === 'career' ? experiences : educationexp;
    return (
      <div className="container resumeContainer">
        <div className="resumeToggle">
          <span
            className={`resumeTab${this.state.view === 'career' ? ' active' : ''}`}
            onClick={() => this.setState({ view: 'career' })}
          >
            Career
          </span>
          <span> | </span>
          <span
            className={`resumeTab${this.state.view === 'education' ? ' active' : ''}`}
            onClick={() => this.setState({ view: 'education' })}
          >
            Education
          </span>
        </div>
        <FadeIn delay={300} transitionDuration={1000}>
          {current.map(item => this.renderItem(item))}
        </FadeIn>
      </div>

    );
  }
}

export default Resume;
