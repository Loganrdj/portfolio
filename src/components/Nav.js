import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

function Nav() {
  return (
      <nav className="navAnimation navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <Link className="title flash" to="/">
                <h1 class="">Logan Moss</h1>
            </Link>
            <ul className="nav-links navbar-nav">
                
                <Link to="/resume" className="nav-link">
                    <li className="nav-item">Resume</li>
                </Link>
                <Link to="/projects" className="nav-link">
                    <li className="nav-item">Projects</li>
                </Link>
                <Link to="/contact" className="nav-link">
                    <li className="nav-item">Contact</li>
                </Link>
                <a href="https://github.com/Loganrdj" className="nav-link">
                    <li className="nav-item">Github</li>
                </a>
            </ul>
      </nav>
  );
}

export default Nav;
