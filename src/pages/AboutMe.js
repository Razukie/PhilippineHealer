import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom"; // use Link for routing
import "./AboutMe.css";
import Footer from "../components/Footer";


export default function AboutMe() {
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
        </nav>
      </aside>
      </header>

                  {/* ABOUT ME */}
          <section className="section section-dark">
            {/* Image Card */}
            <div className="image-card">
              <img src="/finally.png" alt="Healing practice" />
            </div>

            {/* Text Content */}
            <div className="text">
              <span className="section-number">01</span>

              {/* Heading with rectangle */}
              <div className="heading-with-rectangle">
                <div className="rectangle"></div>
                <h2>ABOUT ME</h2>
              </div>

              <div className="aboutme-text">
                <h4>Exploring the Work of Johann John T. Paquito</h4>
              </div>

              <div className="underline-separator"></div>

              <p>
  <strong>Johann John T. Paquito</strong> is a spiritual healer dedicated to restoring balance
  in the body, mind, and spirit. Guided by his mentor and decades of experience,
  he works through Healing Through Nature, supporting stages of awareness, balance,
  and integration for those navigating stress, anxiety, and energetic blockages.
</p>


              <div className="services-see-more-container">
                {/* Optional: add See More link */}
              </div>
            </div>
          </section>



      {/* ABOUT ME SECTION */}
      <section className="section aboutme-section" id="story">
        <div className="text">
          <span className="section-number">02</span>
          <div className="heading-with-rectangle">
            <div className="rectangle"></div>
            <h2>My Story</h2>
          </div>

          <h4>Johann John T. Paquito</h4>
          <div className="underline-separator"></div>
          <h3>Philippine Healer</h3>

          <p>
            Johann John T. Paquito was born on March 10, 1957, and raised in Baguio City, Philippines. His path as a healer began at a young age, guided by a spiritual mentor who recognized his calling. At just fourteen, he was introduced to healing work, assisting alongside experienced practitioners in supporting those who were unwell.  By the age of twenty, his practice had deepened significantly, leading him to perform hands-on spiritual healing guided by intuition and spiritual insight. Over the following decade, Johann dedicated himself to healing journeys across different regions of the Philippines, and later extended his work internationally, offering healing support to diverse communities around the world.  From 2004 to 2006, he served as President of the Healers Association of Baguio City. He currently leads the Philippine Healer Circle, continuing his commitment to the growth, integrity, and guidance of spiritual healing practices.  With more than twenty-six years of experience, Johann has worked with individuals from various parts of the globe, including countries in Europe such as Luxembourg, Bulgaria, Russia, Slovenia, and Germany, as well as clients across Asia. His work is centered on restoring energetic balance, allowing the body, mind, and spirit to activate their natural capacity for self-healing.  Johann’s role as a healer is to support the release of energetic blockages that may affect physical, emotional, or spiritual well being. Guided by spiritual awareness, he works through direct energy engagement, helping realign inner balance and encourage the body’s innate healing processes.
          </p>

          
        </div>

            <div className="image-card">
              <img src="/pic1.jpeg" alt="Healing practice" />
            </div>
      </section>

      
        {/* PRACTICE */}
      <section className="section section-dark">
        <div className="image-card">
                  <img
              src="/pic9.jpg"
              alt="healing"
            />
                </div>

        <div className="text">
          <span className="section-number">03</span>
          <h2>ACHIEVEMENTS</h2>
          
          <h4>Filipino Spiritual Healer Johann John T. Paquito Shares Healing Energy in Germany.</h4>
          <div className="underline-separator"></div>
          <p>
                     Featured in German newspapers, this article introduces Johann John T. Paquito as a “Geistheiler aus den Philippinen” (Spiritual Healer from the Philippines). It highlights his seminar conducted for the Filipino community and presents him as the source of a Filipińska dawka energii pomocna na wszelkie dolegliwości (“Filipino dose of energy helpful for all ailments”). The coverage emphasizes his healing work, international presence, and return visits as a guest, reflecting the recognition of his spiritual and energy-healing practice in Germany. It also underscores his ongoing commitment to restoring balance through natural and spiritual healing methods while engaging with communities across Europe.
                    </p>
                    <div className="services-see-more-container">
            
          </div>

        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section className="section aboutme-section" id="story">
        <div className="text">
          <span className="section-number">04</span>
          <div className="heading-with-rectangle">
            <div className="rectangle"></div>
            <h2>ACHIEVEMENT</h2>
          </div>

          <h4>Philippinischer Heiler Kongress</h4>
          <div className="underline-separator"></div>
          <h3>November 14-15, 2015</h3>

          <p>
            Philippinischer Heiler Kongress (Philippine Healer Congress), held on November 14–15, 2015, at the venue LOFT. The event, conducted in a German-speaking country, focused on Philippine spiritual and faith healing traditions. The presence of Filipino representatives at the congress reflects the international recognition and cultural significance of Philippine healing practices within European healing and wellness communities.
          </p>

          
        </div>

        <div className="image-card">
          <img src="/pic10.png" alt="Healing practice" />
        </div>
      </section>

      {/* PRACTICE */}
<section className="section section-dark">
  <div className="image-card">
    <img
      src="/pic17.jpg"
      alt="healing"
    />
  </div>

  <div className="text">
    <span className="section-number">05</span>
    <h2>ACHIEVEMENTS</h2>
    
    <h4>Filipino Spiritual Healer Johann John T. Paquito Shares Healing Energy in Italy.</h4>
    <div className="underline-separator"></div>
    <p>
      Interviewed by Italian media, this article introduces Johann John T. Paquito as a “Guaritore Spirituale dalle Filippine” (Spiritual Healer from the Philippines). It highlights his seminar conducted for the Filipino community in Italy and presents him as a source of a “Filipino dose of energy helpful for all ailments.” The coverage emphasizes his healing work, international presence, and return visits as a guest, reflecting the recognition of his spiritual and energy-healing practice in Italy. It also underscores his ongoing commitment to restoring balance through natural and spiritual healing methods while engaging with communities across Europe.
    </p>
    <div className="services-see-more-container">
      
    </div>
  </div>
</section>


      {/* FOOTER */}
        <Footer />  
      
    </div>
      
  );
}
