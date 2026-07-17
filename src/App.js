import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import Nav from "./components/Nav"
import Home from "./components/Home"
import FloatingLinks from "./components/FloatingLinks"
import WordleGate from "./components/WordleGate";
import ScrollToTop from "./utils/ScrollToTop";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const Contact = lazy(() => import("./components/Contact/Contact"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/Resume"));


class App extends Component {
  state = { gateUnlocked: false };

  handleUnlock = () => {
    this.setState({ gateUnlocked: true });
  };

  render(){
    const { gateUnlocked } = this.state;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        {!gateUnlocked && <WordleGate onUnlock={this.handleUnlock} />}
        <div className="site-wrapper">
          <ScrollToTop />
          <Nav />
          <div className="App">
            <Suspense fallback={null}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/resume" component={Resume} />
                <Route path="/projects" component={Projects} />
                <Route path="/contact" component={Contact} />
              </Switch>
            </Suspense>
            <FloatingLinks />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
