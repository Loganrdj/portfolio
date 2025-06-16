import React, { Component } from 'react';
import './App.css';
import Nav from "./components/Nav"
import Home from "./components/Home"
import Contact from "./components/Contact/Contact"
import Projects from "./components/Projects/Projects"
import Resume from "./components/Resume/Resume"
import FloatingLinks from "./components/FloatingLinks"
import WordleGate from "./components/WordleGate";
import ScrollToTop from "./utils/ScrollToTop";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends Component {
  state = { gateUnlocked: false, gateFailed: false, hideStep: -1 };

  handleUnlock = () => {
    this.setState({ gateUnlocked: true });
  };

  handleFail = () => {
    this.setState({ gateFailed: true, hideStep: 0 }, () => {
      this.hideInterval = setInterval(() => {
        this.setState(prev => {
          if (prev.hideStep >= 2) {
            clearInterval(this.hideInterval);
            return { hideStep: 3 };
          }
          return { hideStep: prev.hideStep + 1 };
        });
      }, 500);
    });
  };

  componentWillUnmount() {
    clearInterval(this.hideInterval);
  }

  render(){
    const { gateUnlocked, hideStep } = this.state;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        {!gateUnlocked && (
          <WordleGate onUnlock={this.handleUnlock} onFail={this.handleFail} />
        )}
        <div className={`site-wrapper ${hideStep >= 2 ? 'hidden' : ''}`}>
          <ScrollToTop />
          <Nav className={hideStep >= 0 ? 'fade-out' : ''} />
          <div className={`App ${hideStep >= 1 ? 'fade-out' : ''}`}>
            <Switch>
              {/* <Route path="/portfolio" component={Home}/> */}
              <Route exact path="/" render={() => <Home hideStep={hideStep} />} />
              <Route path="/resume" component={Resume} />
              <Route path="/projects" component={Projects} />
              <Route path="/contact" component={Contact} />
            </Switch>
            <FloatingLinks className={hideStep >= 0 ? 'fade-out' : ''} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
