import React, { useRef, useState, useEffect } from "react";

import "./Gallery.css";
import { Star } from "lucide-react";
import { rtdb } from "../firebase";
import { ref as dbRef, onValue } from "firebase/database";
import { Link } from "react-router-dom"; // make sure this is imported
import Footer from "../components/Footer";
const galleryData = [
  
  
  
  
  {id: 4,src: "/preparing2.jpg",category: "Solo Healing",title: "Healing Ritual",description: "I snapped a photo while Johann Paquito was performing the healing ritual. Watching him work was incredible you could feel the calm and energy around us. The way he guided us to connect with nature really helped me release tension and find balance.",author: "— Visitor",rating: 4.7},
  {id: 5,src: "/solidarity.jpg",category: "Mission",title: "Solidarity Mission",description: "We held a Solidarity Mission with our German friends for the SINAB-ANG organization. It was inspiring to see everyone come together with such care and intention, supporting the community and spreading positive energy.",author: "— Johann Paquito",rating: 4.8},
  {id: 6,src: "/solidarity-kids.jpg",category: "Mission",title: "Solidarity Mission with Kids",description: "I had so much fun during the Solidarity Mission with our German friends for the SINAB-ANG organization. Johann Paquito showed us how to connect with nature and helped us feel calm and happy. It was amazing to be part of something so special and to learn from him!",author: "— Miguel, 10 years old",rating: 4.9},
  { id: 6, src: "/pic7.png",  category: "Culture", title: "Artisan Crafts", description: "Watching local masters craft intricate silver jewelry with techniques passed down over eras." },
  { id: 7, src: "/pic10.png", category: "Relaxation", title: "Evening Tea", description: "Unwinding with herbal tea by the crackling fire after a long day of exploration." },
];

function GalleryItem({ item, index, onClick, isActive }) {
  const [orientation, setOrientation] = useState("landscape");
  const imgRef = useRef(null);

  const handleLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      setOrientation(naturalWidth > naturalHeight ? "landscape" : "portrait");
    }
  };

  return (
    <div
      className={`gallery-item ${isActive ? "active" : ""} ${orientation}`}
      onClick={() => onClick(index)}
    >
      <div className="img-holder">
         <img 
            ref={imgRef}
            src={item.src} 
            alt={item.title} 
            onLoad={handleLoad}
            loading="lazy" 
         />
      </div>
      <div className="item-label">{item.title}</div>
      {item.author && <div className="item-author">{item.author}</div>}
    </div>
  );
}

export default function GalleryPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const featuredRef = useRef(null);
  const [items, setItems] = useState(galleryData);

  const currentItem = items[selectedIndex] || galleryData[0];

  useEffect(() => {
    const feedbacksRef = dbRef(rtdb, "Feedbacks");
    const unsubscribe = onValue(feedbacksRef, (snapshot) => {
      const val = snapshot.val() || {};
      const list = Object.keys(val)
        .map((k) => ({ key: k, ...val[k] }))
        .filter((i) => i.approved)
        .map((i) => ({
          id: i.id || i.key,
          src: i.src,
          category: i.category,
          title: i.title,
          description: i.description,
          author: i.author ? (i.author.trim().startsWith('—') ? i.author : `— ${i.author}`) : "",
          rating: i.rating
        }));

      // Prepend approved uploads to static gallery
      setItems([...list, ...galleryData]);
    }, (err) => console.error(err));

    return () => unsubscribe();
  }, []);

  const handleSelect = (index) => {
    if (index === selectedIndex) return;
    if (window.innerWidth < 1024) {
      featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setIsAnimating(false);
    }, 400); 
  };

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedIndex((prev) => (prev + 1) % items.length);
      setIsAnimating(false);
    }, 400);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
      setIsAnimating(false);
    }, 400);
  };

  // If items change, ensure selectedIndex is within bounds
  useEffect(() => {
    if (selectedIndex >= items.length) setSelectedIndex(0);
  }, [items, selectedIndex]);

  return (
    <>
      {/* ========================== */}
      {/* Header */}
      {/* ========================== */}
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
              <li><Link to="/home" className="nav-button">Home</Link></li>
              <li><Link to="/aboutme" className="nav-button">About Me</Link></li>
              <li><Link to="/services" className="nav-button">Services</Link></li>
              <li><Link to="/contacts" className="nav-button">Contact</Link></li>
              <li><Link to="/location" className="nav-button">Location</Link></li>
              <li><Link to="/gallery" className="nav-button">Gallery</Link></li>
            </ul>
            <div className="desktop-profile">
              <img src="/user.png" alt="Profile" />
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        <div className={`mobile-overlay ${menuOpen ? "show" : ""}`} onClick={() => setMenuOpen(false)} />

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
            <Link to="/home" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
            <Link to="/aboutme" onClick={() => setMenuOpen(false)}>👤 About Me</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>🧭 Services</Link>
            <Link to="/contacts" onClick={() => setMenuOpen(false)}>💬 Contact</Link>
            <Link to="/gallery" onClick={() => setMenuOpen(false)}>🖼 Gallery</Link>
          </nav>
        </aside>
      </header>

      

      {/* ========================== */}
      {/* Gallery Section */}
      {/* ========================== */}
      <section className="gallery-section">
        <header className="gallery-header">
          
          <h2>Gallery</h2>
          <p className="overline">Philippine Healer</p>
        </header>

        <div className="featured-wrapper" ref={featuredRef}>
          <div className="featured-image-box">
            <img src={currentItem.src} alt={currentItem.title} className={`main-img ${isAnimating ? "zoom-out" : "zoom-in"}`} />
            <div className="nav-controls">
              <button onClick={handlePrev} aria-label="Previous">←</button>
              <button onClick={handleNext} aria-label="Next">→</button>
            </div>
          </div>
          <div className="featured-text-box">
            <div className={`text-content-inner ${isAnimating ? "fade-out" : "fade-in"}`}>
              <span className="category-tag">{currentItem.category}</span>
              <h3>{currentItem.title}</h3>
              <div className="separator"></div>
              <p>{currentItem.description}</p>
              {/* ⭐ Static Rating Display */}
                  {/* ⭐ Static Rating Display */}
                  <div className="static-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={
                          star <= Math.floor(currentItem.rating)
                            ? "star-filled"
                            : "star-empty"
                        }
                      />
                    ))}

                    <span className="rating-text">
                      {currentItem.rating}/5
                    </span>
                  </div>


                {currentItem.author && (
                  <span className="comment-author">{currentItem.author}</span>
                )}
              <div className="meta-footer">
                <span className="index-number">{selectedIndex + 1} <span className="light">/ {items.length}</span></span>
              </div>
            </div>
          </div>
        </div>
                   
        <div className="gallery-grid">
          {items.map((item, index) => (
            <GalleryItem key={item.id || item.key || index} item={item} index={index} onClick={handleSelect} isActive={index === selectedIndex} />
          ))}
        </div>

        <div className="cta-content">
            <h3>Join Our Healing Community</h3>
            <p>Share your transformative experience and inspire others on their journey to wellness</p>
            <div className="cta-buttons">
              <Link to="/upload" className="cta-btn primary">
                ✨ Share Your Experience
              </Link>

              <Link to="/upload-dashboard" className="cta-btn primary">
                ✨ Share Your Experience
              </Link>
              
            </div>
          </div>

        
        {/* FOOTER */}
              <Footer />
      </section>
    </>
  );
}
