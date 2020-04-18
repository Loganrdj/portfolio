import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

function Nav() {
    const navStyling = {
        color: "white",
    }
  return (
      <nav>
            <Link className="title" style={navStyling} to="/">
                <h1>Logan Moss</h1>
            </Link>
            <ul className="nav-links">
                {/* This won't change the active link for unknown reason after being clicked */}
                
                <Link style={navStyling} to="/resume" className={window.location.pathname === "/resume" ? "nav-link active" : "nav-link"}>
                    <li>Resume</li>
                </Link>
                <Link style={navStyling} to="/projects" className={window.location.pathname === "/projects" ? "nav-link active" : "nav-link"}>
                    <li>Projects</li>
                </Link>
                <Link style={navStyling} to="/contact" className={window.location.pathname === "/contact" ? "nav-link active" : "nav-link"}>
                    <li>Contact</li>
                </Link>
            </ul>
      </nav>
  );
}

export default Nav;
