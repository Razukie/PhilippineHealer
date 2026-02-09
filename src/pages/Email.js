// src/pages/Email.js
import React, { useEffect, useState, useRef } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Email.css";

export default function Email() {
  const [active, setActive] = useState("start");
  const form = useRef();

  /* ================= Scroll Spy ================= */
  useEffect(() => {
    const sections = document.querySelectorAll("[data-step]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.dataset.step);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => sections.forEach(sec => observer.unobserve(sec));
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const [sending, setSending] = useState(false);
  /* ========== SEND EMAIL USING EMAILJS ========== */
  const sendEmail = (e) => {
  e.preventDefault();
  setSending(true);

  emailjs.sendForm(
  "service_s7szu8m",
  "template_g8rkmty",
  form.current,
  "rpO4pTEU0k-btHwzd",
  { to_email: "muripaga.at99@s.msumain.edu.ph" } // optional
)


  .then(() => {
    alert("✅ Message sent successfully!");
    form.current.reset();
  })
  .catch((error) => {
    console.error(error);
    alert("❌ Failed to send message.");
  })
  .finally(() => {
    setSending(false);
  });
};

  return (
    <section className="email-page">
      <header className="top-nav">
                <div className="nav-inner">
      
                          {/* Brand + Hamburger on left */}
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
      
                          {/* Desktop Menu - centered */}
                          <div className="desktop-menu-container">
                        {/* Centered desktop menu */}
                        <ul className="desktop-menu">
                          <li><Link to="/home" className="nav-button">Home</Link></li>
                          <li><Link to="/aboutme" className="nav-button">About Me</Link></li>
                          <li><Link to="/services" className="nav-button">Services</Link></li>
                          <li><Link to="/location" className="nav-button">Location</Link></li>
                          <li><Link to="/contacts" className="nav-button">Contact</Link></li>
                          <li><Link to="/gallery" className="nav-button">Gallery</Link></li>
      
                        </ul>
      
                            {/* Profile icon on the right */}
                            <div className="desktop-profile">
                              <img src="/user.png" alt="Profile" />
                            </div>
                          </div>
      
      
        </div>
      
        {/* Mobile Overlay */}
        <div className={`mobile-overlay ${menuOpen ? "show" : ""}`}
           onClick={() => setMenuOpen(false)} />
        
      
        {/* Overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      
      {/* Side Drawer */}
      <aside className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="avatar">
            <img src="/profile2.png" alt="Profile" />
          </div>
          <div>
            <h4>Johann John T. Paquito</h4>
            <p>Philippine Healer</p>
          </div>
        </div>
      
        <nav className="drawer-nav">
          <Link to="/home" onClick={() => setMenuOpen(false)}>
            <span>🏠</span> Home
          </Link>
          <Link to="/aboutme" onClick={() => setMenuOpen(false)}>
            <span>👤</span> About Me
          </Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>
            <span>🧭</span> Services
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <span>💬</span> Contact
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <span>💬</span> Contact
          </Link>
        </nav>
      </aside>
      
      
      </header>
      {/* START SECTION */}
      <div id="start" data-step="start" className="email-block">
        <header className="top-nav">
          {/* Your header code here */}
        </header>

        <div className="email-container">
          
          {/* Illustration */}
          <div className="email-illustration">
            <img src="/mail.png" alt="Mail Illustration" />
            
          </div>
          

          {/* FORM */}
          <form ref={form} className="email-form" onSubmit={sendEmail}>

            <label>Firstname</label>
            <input type="text" name="firstname" required />

            <label>Lastname</label>
            <input type="text" name="lastname" required />

            <label>Gmail</label>
            <input type="text" name="gmail" required placeholder="Your Gmail here" />

            <input type="hidden" name="email" value="muripaga.at99@s.msumain.edu.ph" />



           <label>Concern / Message</label>
          <textarea
            name="message"
            className="email-message"
            rows="6"
            placeholder="Write your concern here..."
            required
            />


            <button className="email-ok-btn" type="submit" disabled={sending}>
          {sending ? "Sending..." : "OK"}
</button>


            {/* SOCIALS */}
            <div className="email-social-section">
              <p className="email-info-label">Connect with us</p>
              <div className="email-social-links">
                <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="email-social-icon facebook"><FaFacebook /></a>
                <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="email-social-icon instagram"><FaInstagram /></a>
                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="email-social-icon linkedin"><FaLinkedin /></a>
                <a href="https://wa.me/639457814574" target="_blank" rel="noopener noreferrer" className="email-social-icon whatsapp"><FaWhatsapp /></a>
                <a href="https://www.tiktok.com/@yourprofile" target="_blank" rel="noopener noreferrer" className="email-social-icon tiktok"><FaTiktok /></a>
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* STEP NAV */}
      <div className="email-steps">
        <div className="step-line">
          <div className="step-progress" />
        </div>

        <div className="step-labels">
          <span className={active === "start" ? "active" : ""} onClick={() => scrollTo("start")}>Start</span>
          <span className={active === "01" ? "active" : ""} onClick={() => scrollTo("step1")}>01</span>
          <span className={active === "02" ? "active" : ""} onClick={() => scrollTo("step2")}>02</span>
          <span className={active === "03" ? "active" : ""} onClick={() => scrollTo("step3")}>03</span>
        </div>
      </div>

    </section>
  );
}
