import React, { useState } from 'react';
import "../App.css";
import { Link, useLocation } from 'react-router-dom';

function Nav({ className = '' }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navAnimation customNav ${className}`}>
      <Link
        className="title"
        to="/"
        onClick={closeMenu}
        style={{ visibility: location.pathname === "/" ? "hidden" : "visible" }}
      >
        <h1>Logan Moss</h1>
      </Link>

      <button className="mobileMenuButton" onClick={toggleMenu} aria-label="Toggle navigation">
        {menuOpen ? "✖" : "☰"}
      </button>

      <ul className={`customNavLinks ${menuOpen ? "showMobileMenu" : ""}`}>
        <Link
          to="/resume"
          className="customNavLink"
          onClick={closeMenu}
          style={{ color: location.pathname === "/" ? "#00f0ed" : "white" }}
        >
          <li
            className="customNavLink"
            style={{ color: location.pathname === "/" ? "#00f0ed" : "white" }}
          >
            Resume
          </li>
        </Link>
        {/* <Link to="/contact" className="customNavLink ">
                    <li className="customNavLink">Contact</li>
                </Link> */}
        <Link
          to="/projects"
          className="customNavLink"
          onClick={closeMenu}
          style={{ color: location.pathname === "/" ? "#00f0ed" : "white" }}
        >
          <li
            className="customNavLink"
            style={{ color: location.pathname === "/" ? "#00f0ed" : "white" }}
          >
            Projects
          </li>
        </Link>
      </ul>
    </nav>
  );
}
export default Nav;
