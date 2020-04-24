import React, { Component } from 'react';
import "../../App.css";
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Resume extends Component {

  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render(){
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document 
          file="/Users/lrmoss/Desktop/react-portfolio/portfolio/public/LoganResumeMarch2020.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
  
}

export default Resume;
