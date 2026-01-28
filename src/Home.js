import React, { useEffect } from "react";
import "./Home.css";

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

  return (
    
    <div className="app">

<header className="top-nav">
  <nav>
    <ul>
      <li><a href="#hero" className="nav-button">Home</a></li>
      <li><a href="#story" className="nav-button">About Me</a></li>
      <li><a href="#services" className="nav-button">Services</a></li>
      <li><a href="#location" className="nav-button">Location</a></li>
      <li><a href="#contact" className="nav-button">Contact Us</a></li>
    </ul>
  </nav>
</header>

      
      {/* HERO */}
      <section className="hero">
  <div className="hero-bg">
    <img src="/background1.png" alt="healing" className="hero-img" />
    <div className="hero-overlay" />
  </div>
  <div className="hero-content">
    <span className="hero-tag">Holistic Healing</span>
    <h1>
      Reconnect With Your Body’s <br />
      Natural Power To Heal
    </h1>
    <p>
      Gentle practices rooted in mindfulness, balance, and respect for nature.
    </p>
  </div>
</section>


      {/* STORY */}
<section className="section">
  <div className="text">
    <span className="section-number">01</span>
    
    {/* Rounded rectangle + heading */}
    <div className="heading-with-rectangle">
      <div className="rectangle"></div>
      <h2>My Story</h2>
    </div>
    <h4>Johann John T. Paquito</h4>
    <div className="underline-separator"></div>
    <h3>Philippine Healer</h3>
    <p>
      I am Johann John T. Paquito, a spiritual healer from Baguio City, Philippines. My healing journey began at a young age under the guidance of a spiritual mentor. With decades of experience in hands-on energy healing, I focus on helping restore balance to the body, mind, and spirit...
    </p>
          <div className="see-more-container">
        <a href="#more" className="see-more">
          See more &rarr;
        </a>
      </div>

  </div>

  <div className="image-card">
    <img
      src="/pic1.jpeg"
      alt="healing"
    />
  </div>
</section>


      {/* PRACTICE */}
      <section className="section section-dark">
        <div className="image-card">
                  <img
              src="/pic4.png"
              alt="healing"
            />
                </div>

        <div className="text">
          <span className="section-number">02</span>
          <h2>Services</h2>
          
          <h4>Preparing For Healing</h4>
          <div className="underline-separator"></div>
          <p>
                      Beginning your healing journey requires nothing special only awareness and openness. You already have what you need within you.
          Moving too quickly or forcing change can create resistance. Gentle, natural support allows healing to unfold with ease and balance.
                    </p>
                    <div className="services-see-more-container">
            <a href="#services-more" className="services-moresee">
              See more &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* LOCATION */}
<section className="section" id="location">
  <div className="text">
    <span className="section-number">03</span>

    {/* Rounded rectangle + heading */}
    <div className="heading-with-rectangle">
      <div className="rectangle"></div>
      <h2>Location</h2>
    </div>

    <h4>Where You Can Find Me</h4>
    <div className="underline-separator"></div>
    

    <p>
      Located in the heart of Baguio City, my healing space is designed to promote
      calm, grounding, and balance. Surrounded by nature and fresh mountain air,
      the environment supports deep relaxation and natural energy flow.
      or more details, please click
    </p>

    <div className="see-more-container">
      <a href="#location-more" className="see-more">
        See more &rarr;
      </a>
    </div>
  </div>

   <div className="map-container">
    <iframe
      title="Location Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119371.15008670638!2d120.4972272708881!3d16.40885158264125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a142502e9c77%3A0x557fb6c39765cdd8!2sSM%20City%20Baguio!5e0!3m2!1sen!2sph!4v1706540000000!5m2!1sen!2sph"
      width="100%"
      height="350"
      style={{ border: 0, borderRadius: "24px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

</section>


      



      <footer className="footer">
        <p>© 2026 Johann John T. Paquito</p>
        <span>Healing • Balance • Mindfulness</span>
      </footer>
    </div>
  );
}
