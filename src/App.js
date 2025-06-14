import React, { Component } from 'react';
import './App.css';
import Nav from "./components/Nav"
import Home from "./components/Home"
import Contact from "./components/Contact/Contact"
import Projects from "./components/Projects/Projects"
import Resume from "./components/Resume/Resume"
import FloatingLinks from "./components/FloatingLinks"
import ScrollToTop from "./utils/ScrollToTop";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


class App extends Component {
  render(){
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop />
        <Nav />
        <div className="App">
          <Switch>
            {/* <Route path="/portfolio" component={Home}/> */}
            <Route exact path="/" component={Home}/>
            <Route path="/resume" component={Resume}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/contact" component={Contact}/>
          </Switch>
          <FloatingLinks />
        </div>
      </Router>
    );
  }
}

export default App;
