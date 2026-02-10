import React, { useEffect,useState} from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner"; // adjust the path if needed
import ChatWidget from "./components/ChatWidget"; // Check this path!
import AuthModal from "./components/AuthModal";
import { auth } from "./components/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".text");

    const observer = new IntersectionObserver(
      (entries) => {  
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show"); // keeps it alive & dynamic
          }
        });
      },
      {
        threshold: 0.25, // triggers when 25% visible
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setCurrentUser(u));
    return () => unsub();
  }, []);

 

useEffect(() => {
  const elements = document.querySelectorAll(".text, .image-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    },
    { threshold: 0.25 }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, []);



  return (
    
  <div className="app">
        <CookieBanner />  {/* <-- This will render the cookie banner */}
        
        <header className="top-nav">
          <div className="nav-inner">
{/* 2. Place the ChatWidget here */}
      <ChatWidget />
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
                    <li><Link to="/contacts" className="nav-button">Contact</Link></li>
                    <li><Link to="/location" className="nav-button">Location</Link></li>
                    <li><Link to="/gallery" className="nav-button">Gallery</Link></li>
                  </ul>

                      {/* Profile icon on the right */}
                      <div className="desktop-profile" onClick={() => setAuthModalOpen(true)}>
                        {currentUser ? (
                          <>
                            {currentUser.photoURL ? (
                              <img src={currentUser.photoURL} alt="Profile" />
                            ) : (
                              <div className="profile-initials">{(currentUser.displayName || currentUser.email || "").split(" ").map(s=>s[0]).slice(0,2).join("").toUpperCase()}</div>
                            )}
                            <div className="profile-name">{currentUser.displayName || currentUser.email}</div>
                          </>
                        ) : (
                          <img src="/user.png" alt="Profile" />
                        )}
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
      {currentUser ? (
        currentUser.photoURL ? (
          <img src={currentUser.photoURL} alt="Profile" />
        ) : (
          <div className="profile-initials drawer-initials">{(currentUser.displayName || currentUser.email || "").split(" ").map(s => s[0]).slice(0,2).join("").toUpperCase()}</div>
        )
      ) : (
        <img src="/profile2.png" alt="Profile" />
      )}
    </div>
    <div>
      {currentUser ? (
        <>
          <h4>{currentUser.displayName || currentUser.email}</h4>
          <p className="drawer-email">{currentUser.email}</p>
        </>
      ) : (
        <>
          <h4>Johann John T. Paquito</h4>
          <p>Philippine Healer</p>
        </>
      )}
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


              
              {/* HERO */}
              <section className="hero">
          <div className="hero-bg">
            <img src="/background1.png" alt="healing" className="hero-img" />
            <div className="hero-overlay" />
          </div>
          <div className="hero-content">
            
            <h1>
              Reconnect With Your Body’s <br />
              Natural Power To Heal
            </h1>
            <p>
              Gentle practices rooted in mindfulness, balance, and respect for nature.
            </p>
          </div>
        </section>


                {/* PRACTICE */}
      <section className="section section-dark">
        <div className="image-card">
                  <img
              src="/profilepic3.png"
              alt="healing"
            />
                </div>

        <div className="text">
          <span className="section-number">01</span>
          <h2>My Story</h2>
          
          <h4>Johann John T. Paquito</h4>
          
          <div className="underline-separator"></div>
          <h3>Philippine Healer</h3>

          <p>
                      Johann John T. Paquito is a spiritual healer from Baguio City, Philippines, with over twenty-six years of experience in energy-based healing practices. His healing journey began at a young age under the guidance of a spiritual mentor who recognized his natural calling. By his teenage years, he was already assisting experienced practitioners, and in early adulthood, he developed a deep, intuitive approach to hands-on spiritual healing.

          His work has taken him across various regions of the Philippines and later to international communities throughout Europe and Asia. Johann previously served as President of the Healers Association of Baguio City from 2004 to 2006 and currently leads the Philippine Healer Circle. His healing practice focuses on restoring energetic balance by supporting the release of blockages that affect physical, emotional, and spiritual well-being, allowing the body, mind, and spirit to activate their natural capacity for self-healing.Beginning your healing journey requires nothing special only awareness and openness. You already carry within you the natural capacity to heal. When change is rushed or forced, resistance may arise. Healing unfolds most naturally when it is supported gently, allowing balance to return in its own time.</p>
                    <div className="services-see-more-container">
            <a href="/aboutme" className="services-moresee">
              See more &rarr;
            </a>
          </div>

        </div>
      </section>


        <div className="underline"></div>

      

      {/* STORY */}
          <section className="section">
            <div className="text">
              <span className="section-number">01</span>
              
              {/* Rounded rectangle + heading */}
              <div className="heading-with-rectangle">
                <div className="rectangle"></div>
                <h2>Services</h2>
              </div>
              <h4>Preparing For Healing</h4>
              <div className="underline-separator"></div>
              
              <p>

            The healing process can be conducted either through distance healing or in-person sessions. In distance healing, supportive energy is directed without the need for physical presence, allowing healing to be received wherever the individual or group may be. In-person sessions offer direct, hands-on support, allowing the healer to work energetically in the same space. Both approaches, guided by focused intention and spiritual awareness, help restore energetic balance, release blockages, and support the body, mind, and spirit in activating their natural self-healing abilities.

            Healing may be experienced individually or in a group setting. Individual sessions provide focused attention and deeper alignment for personal needs, while group sessions create a shared healing space that fosters collective balance, mutual support, and amplified energy. Both options are designed to gently guide participants back toward stability, harmony, and inner alignment.
              </p>
                    <div className="see-more-container">
                  <Link
            to="/services"
            className="see-more"
            onClick={() => window.scrollTo(0, 0)}
          >
            See more &rarr;
          </Link>

                </div>

            </div>

            <div className="image-card">
  <img src="/pic16.png" alt="healing" />
</div>

          </section>
      
        <div className="underline"></div>
      {/* LOCATION */}
              <section className="section" id="location">
                <div className="text">
                <span className="section-number">03</span>

                <div className="heading-with-rectangle">
                  <div className="rectangle"></div>
                  <h2>Location</h2>
                </div>

                <h4>Where You Can Find Me</h4>
                <div className="underline-separator"></div>

                        <p>
                      Located near the <strong>Sagada Underground River</strong> in Sagada, Mountain Province a serene natural landmark in the Cordillera Mountains that’s perfect for reflection and healing. 
                      Sagada is a peaceful town renowned for its lush pine forests, misty mountain views, and cool climate. 
                      Visitors are often drawn to its unique cultural heritage, including hanging coffins, traditional Igorot villages, and warm local hospitality. 
                      The Sagada Underground River adds an element of adventure and wonder, winding through limestone caves with clear, flowing waters that create a tranquil and meditative environment. 
                      Surrounded by verdant rice terraces, pine-covered slopes, and serene valleys, this area provides an ideal setting to slow down, reconnect with nature, and experience a sense of inner calm and balance.
                    </p>


      <div className="see-more-container">
                <a href="/contacts" className="see-more">

                
              See more →
            </a>
          </div>
        </div>

          <div className="map-container">
            <iframe
              title="Sagada Underground River Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24978.98033541254!2d120.888612345678!3d17.0857127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x338fd32840ba8fa3%3A0xb871200edfcb25d2!2sSagada%20Underground%20River!5e0!3m2!1sen!2sph!4v0000000000000"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: "24px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

       
       


      



      {/* FOOTER */}
      <Footer />
      
      {/* AUTH MODAL */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
}
