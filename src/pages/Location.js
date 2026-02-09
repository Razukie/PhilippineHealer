import React from "react";
import { Crosshair } from "lucide-react";
import "./Location.css";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin,MessageCircle } from "lucide-react";
import { FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";

/* ---------------- TOP NAV ---------------- */
const TopNav = ({ setMenuOpen }) => (
  <header className="top-nav">
    <div className="nav-inner">
      <div className="brand-hamburger">
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          <div />
          <div />
          <div />
        </div>
      </div>

      <div className="desktop-menu-container">
        <ul className="desktop-menu">
          <li><Link to="/home" className="nav-button">Home</Link></li>
          <li><Link to="/aboutme" className="nav-button">About Me</Link></li>
          <li><Link to="/services" className="nav-button">Services</Link></li>
          <li><Link to="/location" className="nav-button">Location</Link></li>
          <li><Link to="/contacts" className="nav-button">Contact</Link></li>
          <li><Link to="/gallery" className="nav-button">Gallery</Link></li>
        </ul>

        <div className="desktop-profile">
          <img src="/user.png" alt="Profile" />
        </div>
      </div>
    </div>
  </header>
);

/* ---------------- Contact Card ---------------- */
const ContactCard = () => (
  <div className="contact-card">
    <div className="card-content">
      <div className="nav-pill">
        <span>{"<"}</span>
        <span>{">"}</span>
      </div>

      <h2 className="card-title">Contacts</h2>

      <div>

       <p className="info-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <MapPin size={18} color="#25D366" /> 
  <span style={{ fontWeight: 500 }}>Address</span>
</p>

<p className="info-text">
  <a 
    href="https://wa.me/639457814574" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ color: "#4ade80", textDecoration: "none" }}
  >
    Sagada, Mountain Province Philippines
  </a>
</p>

<p className="info-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <Phone size={18} color="#25D366" /> 
  <span style={{ fontWeight: 500 }}>Phone</span>
</p>

<p className="info-text">
  <a 
    href="https://wa.me/639457814574" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ color: "#4ade80", textDecoration: "none" }}
  >
    +63 945 781 4574
  </a>
</p>

<p className="info-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <MessageCircle size={18} color="#25D366" /> 
  <span style={{ fontWeight: 500 }}>WhatsApp</span>
</p>

<p className="info-text">
  <a 
    href="https://wa.me/639457814574" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ color: "#4ade80", textDecoration: "none" }}
  >
    +63 945 781 4574
  </a>
</p>

<p className="info-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <Mail size={18} color="#25D366" /> 
  <span style={{ fontWeight: 500 }}>Email Address</span>
</p>

<p className="info-text">
  <a 
    href="https://wa.me/639457814574" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ color: "#4ade80", textDecoration: "none" }}
  >
    PhilippineHealer@gmail.com
  </a>
</p>




      <div className="social-section">
  <p className="info-label">Connect with us</p>
  <div className="social-links">
    <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
      <FaFacebook />
    </a>
    <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
      <FaInstagram />
    </a>
    <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
      <FaLinkedin />
    </a>
    <a href="https://wa.me/639457814574" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
      <FaWhatsapp />
    </a>
    <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon tiktok">
      <FaTiktok />
    </a>
  </div>
</div>
    </div>
  </div>
  </div>
);

/* ---------------- HUD Overlay ---------------- */
const HUDOverlay = () => (
  <>
    <div className="hud-container">
      <div className="scale-text">
        <span>0</span>
        <span>12km</span>
      </div>
      <div className="scale-bar">
        <div className="scale-tick tick-left"></div>
        <div className="scale-tick tick-right"></div>
      </div>
      <h1 className="location-name">SAGADA</h1>
    </div>

    <div className="crosshair-container">
      <Crosshair strokeWidth={1.5} />
    </div>
  </>
);

const Location = () => {
  return (
    <div className="location-container1">
      {/* Top Navigation */}
      <TopNav setMenuOpen={() => {}} />

      {/* Google Maps BACKGROUND */}
      <div className="map-container1">
        <iframe
          title="Sagada Street Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24978.98033541254!2d120.8886123!3d17.0857127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x338fd32840ba8fa3%3A0xb871200edfcb25d2!2sSagada%20Underground%20River!5e0!3m2!1sen!2sph!4v0000000000000"
          width="100%"
          height="350"
          style={{ border: 0, borderRadius: "24px" }}
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* UI Overlays */}
      <ContactCard />
      <HUDOverlay />
      <div className="vignette" />
    </div>
  );
};


export default Location;
