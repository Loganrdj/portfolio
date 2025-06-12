import React, { useState } from 'react';
import "../App.css";
import { Link, useLocation } from 'react-router-dom';

function Nav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navAnimation customNav">
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
          style={{ color: location.pathname === "/" ? "#00f0ed" : "black" }}
        >
          <li
            className="customNavLink"
            style={{ color: location.pathname === "/" ? "#00f0ed" : "black" }}
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
          style={{ color: location.pathname === "/" ? "#00f0ed" : "black" }}
        >
          <li
            className="customNavLink"
            style={{ color: location.pathname === "/" ? "#00f0ed" : "black" }}
          >
            Projects
          </li>
        </Link>
        <Link
          to="/"
          className="customNavLink"
          onClick={closeMenu}
          style={{ color: location.pathname === "/" ? "#00f0ed" : "black" }}
        >
          <li
            className="customNavLink"
            style={{ color: location.pathname === "/" ? "#00f0ed" : "black" }}
          >
            Home
          </li>
        </Link>
      </ul>
    </nav>
  );
}
export default Nav;
