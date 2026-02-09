import React from "react";
import { Link } from "react-router-dom";
// 1. Add FaWhatsapp and FaTiktok to the import list
import { FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      
      <div className="footer-content">
        
        {/* Left Side: Brand & Bio */}
        <div className="footer-left">
          <h2>Johann John T. Paquito</h2>
          <p>Empowering healing, balance, and mindfulness through spiritual guidance.</p>
          
          <div className="social-icons">
            {/* Existing Icons */}
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>

            {/* 2. New Icons Added Here */}
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            <a href="https://tiktok.com/@yourprofile" target="_blank" rel="noreferrer"><FaTiktok /></a>
          </div>

          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ↑ Back to Top
          </button>
        </div>

        {/* Right Side: Links */}
        <div className="footer-links">
          <div className="links-column">
            <h4>Site Map</h4>
            <Link to="/home">Home</Link>
            <Link to="/aboutme">About Me</Link>
            <Link to="/services">Services</Link>
            <Link to="/contacts">Contact Me</Link>
            <Link to="/services">Location</Link>
            <Link to="/gallery">Gallery</Link>   
          </div>

          <div className="links-column">
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#lawyer">Lawyer's Corners</a>
          </div>
        </div>

      </div> 

      {/* Bottom bar */}
      <div className="footer-bottom">
        © Philippine Healer I Johann John T. Paquito. All Rights Reserved.
      </div>
    </footer>
  );
}