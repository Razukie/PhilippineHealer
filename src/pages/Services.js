import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom"; // use Link for routing
import "./Services.css";
import Footer from "../components/Footer"; // go up one level from pages


export default function Services() {
  useEffect(() => {
    const elements = document.querySelectorAll(".services-text");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.25 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  // Select all elements we want to animate
  const elements = document.querySelectorAll(".text, .image-card, .services-image-card");

  // IntersectionObserver callback
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show"); // reveal element
          observer.unobserve(entry.target);   // stop observing after first reveal
        }
      });
    },
    { threshold: 0.25 }
  );

  // Observe all selected elements
  elements.forEach((el) => observer.observe(el));

  // Cleanup
  return () => observer.disconnect();
}, []);
useEffect(() => {
  const elements = document.querySelectorAll(".text, .image-card, .services-image-card");

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
                                <li><a href="/gallery" className="nav-button">Gallery</a></li>
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
                    <Link to="/location" onClick={() => setMenuOpen(false)}>
                  <span>📍</span> Location
                </Link>
                    <Link to="/gallery" onClick={() => setMenuOpen(false)}>
                  <span>🖼️</span> Gallery
                </Link>
              </nav>
            </aside>
            </header>
        
      {/* Services Page */}
      {/* First Service Section (unchanged) */}
<section className="services-page">
  <div className="services-container">
    <section className="services-section">

      {/* IMAGE */}
      <div className="services-image-card">
        <img src="/spiritual2.png" alt="Healing service" />
      </div>

      {/* TEXT */}
     

{/* TEXT */}
<div className="services-text">
  <div className="services-heading"></div>

  <h4>Physical and Spiritual Mentors Worldwide Inc.</h4>
  <div className="services-divider"></div>

  <p>
    Physical and Spiritual Mentors Worldwide Inc. is an organization dedicated to guiding individuals toward holistic well-being through the balance of physical awareness and spiritual growth. It supports personal healing, self-discovery, and connection with nature by providing mentorship, community engagement, and educational or cultural activities. The organization aims to empower people to strengthen their inner resilience, improve their quality of life, and foster harmony between mind, body, spirit, and environment.
  </p>
</div>




    </section>
  </div>
</section>





     
  

<div className="underline"></div>
<h4 className="realm-title">
  SERVICE WE PROVIDE
</h4>
<section className="section section-dark">
  {/* Image Card */}
  <div className="image-card">
    <img src="/pic19.png" alt="Healing practice" />
  </div>

  {/* Text Content */}
  <div className="services-text">
    <span className="section-number">01</span>

    {/* Heading with rectangle */}
    <div className="heading-with-rectangle">
      <div className="rectangle"></div>
      <h2>HOW I CAN ASSIST YOU?</h2>
    </div>

    <h4>RECONNECT TO UNCONSIOUS MIND.</h4>
    <div className="underline-separator"></div>

    <p>
      Through intuitive spiritual and energy healing, clients are guided to reconnect with their true selves and awaken the unconscious mind. Each session promotes inner peace, emotional release, and alignment of body, mind, and spirit, supporting self-discovery and the body’s natural ability to heal and rebalance.
    </p>

    <div className="services-see-more-container">
      {/* Optional: add See More link */}
    </div>
  </div>
</section>


{/* ABOUT ME SECTION */}
      <section className="section aboutme-section" id="story">
        <div className="services-text">
          <span className="section-number">02</span>
          <div className="heading-with-rectangle">
            <div className="rectangle"></div>
            <h2>HOW CAN I GUIDE YOU?</h2>
          </div>

          <h4>GUIDANCE FROM HEALING NATURE.</h4>


          <div className="underline-separator"></div>
          

          <p>
            The reopening of the realm of self is a gentle and gradual journey toward restoring natural balance and stability. It begins with simple awareness and openness there is nothing external to acquire, for all the resources needed for healing already exist within.

          This process cannot be rushed or forced. When change is pushed too quickly, resistance may arise, creating further imbalance. True healing unfolds naturally when the self is given time, space, and compassionate guidance.

          Through this process, individuals are guided to reconnect with their own inner wisdom, allowing the mind and body to stabilize and realign. By responding to the innate, spiritual calling within, clarity returns, inner tension softens, and harmony is restored, leading to a calm, grounded, and balanced state of being.
            </p>
          
        </div>

            <div className="image-card">
              <img src="/pic18.png" alt="Healing practice" />
            </div>
      </section>

      <section className="section section-dark">
  {/* Image Card */}
  <div className="image-card">
    <img src="/pic20.jpg" alt="Healing practice" />
  </div>

  {/* Text Content */}
  <div className="services-text">
    <span className="section-number">03</span>

    {/* Heading with rectangle */}
    <div className="heading-with-rectangle">
      <div className="rectangle"></div>
      <h2>WHAT YOU'LL RECEIVE</h2>
    </div>

    <h4>AWAKENING FOR A FRESH START.</h4>
    <div className="underline-separator"></div>

    <p>
      Awakening for a Fresh Start is a gentle and intentional return to inner balance a renewal of the self where clarity, calm, and lightness naturally arise. It begins by creating healthy distance from toxic energies, whether emotional, environmental, or energetic, that weigh down the spirit. Through awareness, grounding, and simple cleansing practices, space is created to release what no longer serves you.

This is not a process of force, but of allowing. Healing unfolds in its own time, restoring harmony as resistance gently fades. As the inner self reawakens, a sense of renewal emerges—bringing peace of mind, protection, and a deeper connection to your true essence.

You are invited to receive this refresh, this moment of renewal.
What are you waiting for?
Step forward into a lighter, clearer, and more awakened version of yourself.
    </p>

    <div className="services-see-more-container">
      {/* Optional: add See More link */}
    </div>
  </div>
</section>


  
  <h4 className="realm-title">
  TYPES OF HEALING
</h4>

{/* ABOUT ME SECTION */}
      <section className="section aboutme-section" id="story">
        <div className="services-text">
          <span className="section-number">01</span>
          <div className="heading-with-rectangle">
            <div className="rectangle"></div>
            <h2>Individual Healing</h2>
          </div>

          <h4>ONE ON ONE HEALING</h4>
          <div className="underline-separator"></div>
          

                <p>
                  Individual healing is a deeply personal, one-on-one healing practice where the full attention of the healer is devoted to a single client. This focused approach allows the healing work to be thorough, intentional, and precisely aligned with the individual’s physical, emotional, mental, and spiritual condition. Each session is guided by the client’s unique energy, experiences, and inner state, making no two healing journeys the same.

                  In this private setting, a sacred and safe space is created free from external influence where the client can fully relax, release, and become receptive to healing. The healer works closely with subtle energies, identifying imbalances, blockages, or areas of tension that may not be immediately visible on the surface. Through gentle and natural methods, these disruptions are addressed without force, allowing the body and inner self to respond at their own rhythm.

                  As the healing unfolds, clients often experience a gradual restoration of balance and clarity. Emotional burdens begin to lighten, the mind settles, and the body enters a state of deep relaxation and renewal. Over time, individual healing supports inner protection, grounding, and a stronger connection to one’s inner wisdom and natural healing capacity. This personalized process nurtures lasting well-being, self-awareness, and alignment making individual healing a powerful path for those seeking meaningful and focused transformation.
                </p>


        </div>

            <div className="image-card">
              <img src="/pic13.jpeg" alt="Healing practice" />
            </div>
      </section>


 <section className="section section-dark">
  {/* Image Card */}
  <div className="image-card">
    <img src="/groupHealing1.jpg" alt="Healing practice" />
  </div>

  {/* Text Content */}
  <div className="services-text">
    <span className="section-number">02</span>

    {/* Heading with rectangle */}
    <div className="heading-with-rectangle">
      <div className="rectangle"></div>
      <h2>Group Healing</h2>
    </div>

    <h4>HEALING TOGETHER</h4>
<div className="underline-separator"></div>

<p>
Group healing is a collective healing experience where multiple individuals come together in a shared space of intention, presence, and renewal. Unlike one-on-one sessions, group healing works through the combined energy of the participants, creating a supportive and amplified healing environment. Each individual receives healing in their own way, while also benefiting from the collective flow of the group.

During a group healing session, a safe and sacred space is established where participants are guided into relaxation, awareness, and openness.
</p>


<div className="services-see-more-container">
  {/* Optional: add See More link */}
</div>

  </div>
</section>

{/* ABOUT ME SECTION */}
      <section className="section aboutme-section" id="story">
        <div className="services-text">
          <span className="section-number">03</span>
          <div className="heading-with-rectangle">
            <div className="rectangle"></div>
            <h2>Cave Meditation</h2>
          </div>

          <h4>ENTERING TO THE CAVE</h4>
          <div className="underline-separator"></div>
          

          <p>
The journey begins with entering the sacred cave in Sagada, a quiet sanctuary where the noise of the outer world fades. Here, in this sacred space, you are invited to meditate and attune yourself to the gentle rhythms of nature. The cool air, the subtle sounds of water and wind, and the natural energy of the cave create a serene environment for deep inner focus.  

Through stillness and meditation, you absorb the positive energy that flows from the earth and the surrounding natural elements. Awareness turns inward, allowing the mind, body, and spirit to reconnect and rejuvenate. The darkness of the cave becomes a safe and sacred space where old tensions dissolve, and clarity, calm, and renewal naturally arise.  

As you remain in this meditative state, energy flows freely through you, balancing emotions, settling the mind, and aligning your inner self. Emerging from this experience, you carry the cave's grounding energy, a renewed sense of protection, and a deeper connection to your own inner wisdom and the healing power of nature.
</p>

        </div>

            <div className="image-card">
              <img src="/IndividualCave.jpg" alt="Healing practice" />
            </div>
      </section>

      <div className="underline"></div>

      {/* ABOUT ME SECTION */}
      <section className="section aboutme-section" id="story">
        <div className="services-text">
          
          <div className="heading-with-rectangle">
           
           
          </div>

         <h4>When the Certificate of Incorporation Was Issued</h4>



          <div className="underline-separator"></div>
          

          <p>
            This Certificate of Incorporation confirms that Physical and Spiritual Mentors Worldwide Inc. has been duly registered and approved by the Securities and Exchange Commission under the Revised Corporation Code of the Philippines (Republic Act No. 11232), effective February 23, 2019. It grants the corporation juridical personality, allowing it to operate as a legal entity.

            This certificate does not authorize the corporation to issue or sell securities, solicit investments, or engage in regulated financial activities without prior approval or additional licenses from the SEC or other government agencies. As a registered corporation, it is required to submit annual reports to the Commission.

            The certificate was officially issued and sealed at the SEC office in Baguio City, Philippines, on February 2, 2026.
            </p>
          
        </div>

            <div className="image-card">
              <img src="/issuance2.jpg" alt="Healing practice" />
            </div>
      </section>



    {/* FOOTER */}
          <Footer />
    </div>
  );
}
