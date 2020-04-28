import React, { Component } from 'react';
import "../../App.css";
import { Document, Page, pdfjs } from "react-pdf";
// const PDFImage = require("pdf-image").PDFImage;
// import PDFViewer from "pdf-viewer-reactjs"
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Resume = () => {

  return (
    <div></div>
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
