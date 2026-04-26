import React from 'react';
import './BrandExperience.css';

function BrandExperience() {
  const brandLines = [
    "Artisan Crafted",
    "Minimalist Vision",
    "Ethically Sourced",
    "Timeless Aesthetics",
    "Modern Integrity",
    "Hand-Finished Details",
    "Bespoke Jewelry",
    "Creative Fluidity",
    "Pure Materials",
    "Lineaa Signature"
  ];

  return (
    <div className="brand-experience">
      <div className="be-left">
        <div className="vignette-overlay"></div>
        <iframe
          className="be-video"
          src="https://www.youtube.com/embed/kYOP52BUZTI?autoplay=1&mute=1&controls=0&loop=1&playlist=kYOP52BUZTI&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&end=52"
          title="Lineaa Brands - Artisan Craftsmanship"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      
      <div className="be-right">
        <div className="be-scroller">
          <div className="be-track">
            {brandLines.map((line, index) => (
              <div key={index} className="be-line">
                {line}
              </div>
            ))}
            {/* Clone for loop */}
            {brandLines.map((line, index) => (
              <div key={`clone-${index}`} className="be-line">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandExperience;
