import React, { useState, useEffect } from "react";
import "./CookieBanner.css";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        We use cookies to ensure the best possible experience. By using our site you agree with our{" "}
        <a href="/cookie-policy">Cookie Policy</a>.
      </p>
      <button onClick={handleAccept} className="cookie-ok-btn">
        OK
      </button>
    </div>
  );
}
