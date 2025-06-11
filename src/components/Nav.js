import React from 'react';
import "../App.css";
import { Link, useLocation } from 'react-router-dom';

function Nav() {
    const location = useLocation();
  return (
      <nav className="navAnimation customNav">
            {location.pathname !== "/" && (
                <Link className="title" to="/">
                <h1>Logan Moss</h1>
                </Link>
            )}

            <ul className="customNavLinks">
                <a href="https://github.com/Loganrdj" className="customNavLink">
                    <li className="customNavLink">Github</li>
                </a>
                <Link to="/resume" className="customNavLink">
                    <li className="customNavLink">Resume</li>
                </Link>
                {/* <Link to="/contact" className="customNavLink ">
                    <li className="customNavLink">Contact</li>
                </Link> */}
                <Link to="/projects" className="customNavLink">
                    <li className="customNavLink">Projects</li>
                </Link>
                <Link to="/" className="customNavLink">
                    <li className="customNavLink">Home</li>
                </Link>
            </ul>
      </nav>
  );
}
export default Nav;
