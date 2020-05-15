import React, { Component } from 'react';
import "../../App.css";
import { Document, Page, pdfjs } from "react-pdf";
// const PDFImage = require("pdf-image").PDFImage;
// import PDFViewer from "pdf-viewer-reactjs"
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = () => {
 

  return (
    <div className="container resumeContainer">
      <div className="skillsAnimate resumeItem">
          <img src={"https://myusf.usfca.edu/sites/default/files/images/OMC/usf_f_h2_2c_rgb_360.png"}width={"30%"}></img>
          <div className="resumeFlexBody">
            <div>
              <h5><strong>Major:</strong> Advertising</h5>
              <h5><strong>Minor:</strong> Computer Science</h5>
            </div>
            <h5><strong>Graduation Date:</strong> May 2019</h5>
          </div>
      </div>
      <div className="skillsAnimate resumeItem">
          <img src={"https://lh3.googleusercontent.com/proxy/UdmYXhtwI5B0v1ntmC6sJ5QBg7ZAmy_dK_y7T3qCHew1mXMbg5zaFlFDycRHJc7SkZe8MKvJLHgUh_hN5_55hmRUoMWPorsuV7ZMLwIdD05PiFfZBHFq8q3jqQ"}width={"30%"}></img>
          <div className="resumeFlexBody">
            <h5>FullStack Development Bootcamp</h5>
            <h5><strong>Graduation Date:</strong> May 2020</h5>
          </div>
      </div>
      <div className="skillsAnimate resumeItem">
          <img src={"https://www.wing.vc/uploads/images/companies/Bungalow_Full_BlackColor.png"}width={"30%"}></img>
          <div className="resumeFlexBody">
            <h5>Data Associate - Contract</h5>
            <h5>Sep 2019 - Oct 2019</h5>
          </div>
      </div>
      <div className="skillsAnimate resumeItem">
      <img src={"https://myusf.usfca.edu/sites/default/files/images/OMC/usf_f_h2_2c_rgb_360.png"}width={"30%"}></img>
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
    </div>
    // <PDFViewer
    //     document={{
    //         url: '',
    //     }}
    // />
)
  // var pdfImage = new PDFImage("/LoganResumeMarch2020.pdf")
  //   return(
  //     <div>
  //       <Document file={pdfImage}></Document>
  //     </div>
  //   )

  
  // state = {
  //   numPages: null,
  //   pageNumber: 1,
  // }

  // onDocumentLoadSuccess = ({ numPages }) => {
  //   this.setState({ numPages });
  // }

  // render(){
  //   const { pageNumber, numPages } = this.state;

  //   return (
  //     <div>
  //       <Document 
  //         file="/Users/lrmoss/Desktop/react-portfolio/portfolio/public/LoganResumeMarch2020.pdf"
  //         onLoadSuccess={this.onDocumentLoadSuccess}>
  //         <Page pageNumber={pageNumber} />
  //       </Document>
  //       <p>Page {pageNumber} of {numPages}</p>
  //     </div>
  //   );
  // }
  
}

export default Resume;
