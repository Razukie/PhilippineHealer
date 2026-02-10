import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Crosshair, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";
import "./Location.css";
import AuthModal from "../components/AuthModal";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";


 
/* ---------------- TOP NAV ---------------- */
const TopNav = ({ menuOpen, setMenuOpen, currentUser, setAuthModalOpen }) => (
  <header className="top-nav">
    <div className="nav-inner">
      {/* Brand + Hamburger */}
      <div className="brand-hamburger">
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          <div />
          <div />
          <div />
        </div>
        <div className="brand-left">
          <h4>Johann John T. Paquito</h4>
          <hr className="brand-separator" />
          <p>Philippine Healer</p>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu-container">
        <ul className="desktop-menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/aboutme">About Me</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contacts">Contact</Link></li>
          <li><Link to="/location">Location</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
        </ul>

        {/* Profile Icon */}
        <div className="desktop-profile" onClick={() => setAuthModalOpen(true)}>
          {currentUser ? (
            currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile" />
            ) : (
              <div className="profile-initials">
                {(currentUser.displayName || currentUser.email || "")
                  .split(" ")
                  .map(s => s[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )
          ) : (
            <img src="/user.png" alt="Profile" />
          )}
        </div>
      </div>
    </div>

    {/* Mobile Overlay */}
    <div
      className={`mobile-overlay ${menuOpen ? "show" : ""}`}
      onClick={() => setMenuOpen(false)}
    />

    {/* Side Drawer */}
    <aside className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <div className="avatar">
          {currentUser ? (
            currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile" />
            ) : (
              <div className="profile-initials drawer-initials">
                {(currentUser.displayName || currentUser.email || "")
                  .split(" ")
                  .map(s => s[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )
          ) : (
            <img src="/profile2.png" alt="Profile" />
          )}
        </div>
        <div>
          <h4>{currentUser?.displayName || "Johann John T. Paquito"}</h4>
          <p className="drawer-email">{currentUser?.email || "Philippine Healer"}</p>
        </div>
      </div>

      <nav className="drawer-nav">
        <Link to="/home" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
        <Link to="/aboutme" onClick={() => setMenuOpen(false)}>👤 About Me</Link>
        <Link to="/services" onClick={() => setMenuOpen(false)}>🧭 Services</Link>
        <Link to="/contacts" onClick={() => setMenuOpen(false)}>💬 Contact</Link>
        <Link to="/location" onClick={() => setMenuOpen(false)}>📍 Location</Link>
        <Link to="/gallery" onClick={() => setMenuOpen(false)}>🖼️ Gallery</Link>
      </nav>
    </aside>
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

      <p className="info-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <MapPin size={18} color="#25D366" />
        <span style={{ fontWeight: 500 }}>Address</span>
      </p>
      <p className="info-text">
        <a href="https://wa.me/639457814574" target="_blank" rel="noopener noreferrer" style={{ color: "#4ade80", textDecoration: "none" }}>
          Sagada, Mountain Province Philippines
        </a>
      </p>

      <p className="info-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Phone size={18} color="#25D366" />
        <span style={{ fontWeight: 500 }}>Phone</span>
      </p>
      <p className="info-text">
        <a href="https://wa.me/639457814574" target="_blank" rel="noopener noreferrer" style={{ color: "#4ade80", textDecoration: "none" }}>
          +63 945 781 4574
        </a>
      </p>

      <p className="info-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <MessageCircle size={18} color="#25D366" />
        <span style={{ fontWeight: 500 }}>WhatsApp</span>
      </p>
      <p className="info-text">
        <a href="https://wa.me/639457814574" target="_blank" rel="noopener noreferrer" style={{ color: "#4ade80", textDecoration: "none" }}>
          +63 945 781 4574
        </a>
      </p>

      <p className="info-label" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Mail size={18} color="#25D366" />
        <span style={{ fontWeight: 500 }}>Email Address</span>
      </p>
      <p className="info-text">
        <a href="mailto:PhilippineHealer@gmail.com" style={{ color: "#4ade80", textDecoration: "none" }}>
          PhilippineHealer@gmail.com
        </a>
      </p>

      <div className="social-section">
        <p className="info-label">Connect with us</p>
        <div className="social-links">
          <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="social-icon facebook"><FaFacebook /></a>
          <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon instagram"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon linkedin"><FaLinkedin /></a>
          <a href="https://wa.me/639457814574" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp"><FaWhatsapp /></a>
          <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon tiktok"><FaTiktok /></a>
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


/* ---------------- LOCATION PAGE ---------------- */
const Location = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Track current user login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub(); // cleanup on unmount
  }, []);

  return (
    <div className="location-container1">
      {/* Top Navigation */}
      <TopNav
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        currentUser={currentUser}
        setAuthModalOpen={setAuthModalOpen}
      />

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
    <AuthModal 
            isOpen={authModalOpen} 
            onClose={() => setAuthModalOpen(false)} 
          />
      {/* UI Overlays */}
      <ContactCard />
      <HUDOverlay />
      
      <div className="vignette" />
      
    </div>
  );
};

export default Location;
