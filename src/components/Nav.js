import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

function Nav() {
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="title nav-link" to="/">
                <h1>Logan Moss</h1>
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
            </ul>
      </nav>
  );
}

export default Nav;
