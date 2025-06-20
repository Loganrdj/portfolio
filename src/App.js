import React, { Component, lazy, Suspense } from 'react';
import './App.css';
import Nav from "./components/Nav"
const Home = lazy(() => import("./components/Home"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/Resume"));
import FloatingLinks from "./components/FloatingLinks"
import WordleGate from "./components/WordleGate";
import ScrollToTop from "./utils/ScrollToTop";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


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
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {/* <Route path="/portfolio" component={Home}/> */}
                <Route exact path="/" component={Home} />
                <Route path="/resume" component={Resume} />
                <Route path="/projects" component={Projects} />
                <Route path="/contact" component={Contact} />
              </Switch>
              <FloatingLinks />
            </Suspense>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
