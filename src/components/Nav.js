import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className="top-nav">
      <nav>
        <ul>
          <li><Link to="/" className="nav-button">Home</Link></li>
          <li><Link to="/about" className="nav-button">About Me</Link></li>
          <li><Link to="/services" className="nav-button">Services</Link></li>
          <li><a href="#location" className="nav-button">Location</a></li>
          <li><a href="#contact" className="nav-button">Contact Us</a></li>
          <li><a href="#gallery" className="nav-button">Gallery</a></li>
        </ul>
      </nav>
    </header>
  );
}
