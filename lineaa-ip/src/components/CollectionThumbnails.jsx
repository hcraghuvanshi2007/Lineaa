import heroImg from '../assets/images/hero-image-Biu-8NYF.png';
import organicEarringImg from '../assets/images/organic-earring-BV1LtJhH.png';

import img1 from '../assets/images/ChatGPT Image Apr 25, 2026, 09_33_38 PM.png';
import img2 from '../assets/images/ChatGPT Image Apr 25, 2026, 09_37_30 PM.png';
import img3 from '../assets/images/ChatGPT Image Apr 25, 2026, 09_43_37 PM.png';
import img4 from '../assets/images/ChatGPT Image Apr 25, 2026, 09_47_44 PM.png';

function CollectionThumbnails() {
  return (
    <>
      {/* Hero wide thumbnail */}
      <div className="collections-thumbnail hero-thumbnail">
        <img src={heroImg} alt="Featured collection" />
        <div className="collection-caption">
          <a href="#" className="collection-title">Modern Heritage</a>
          <p className="collection-sub">Contemporary jewelry crafted with timeless elegance</p>
        </div>
      </div>

      {/* Organic earring - full width */}
      <div className="collections-thumbnail organic-thumbnail" id="organic-thumbnail">
        <div className="collection-image">
          <img src={organicEarringImg} alt="Featured collection" />
        </div>
        <div className="collection-caption">
          <a href="#" className="collection-title">Artisan Craft</a>
          <p className="collection-sub">Contemporary Handcrafted pieces with meticulous attention to detail</p>
        </div>
      </div>

      {/* Circular collection */}
      <div className="collections-thumbnail" id="circular-thumbnail">
        <div className="collection-image marquee-container">
          <div className="marquee-track">
            {/* First Set */}
            <img src={img1} alt="Collection 1" className="marquee-img" />
            <img src={img2} alt="Collection 2" className="marquee-img" />
            <img src={img3} alt="Collection 3" className="marquee-img" />
            <img src={img4} alt="Collection 4" className="marquee-img" />
            {/* Duplicated Set for Infinite Loop */}
            <img src={img1} alt="Collection 1" className="marquee-img" />
            <img src={img2} alt="Collection 2" className="marquee-img" />
            <img src={img3} alt="Collection 3" className="marquee-img" />
            <img src={img4} alt="Collection 4" className="marquee-img" />
          </div>
        </div>
        <div className="collection-caption">
          <a href="#" className="collection-title">Circular Elements</a>
          <p className="collection-sub">Geometric perfection meets contemporary minimalism</p>
        </div>
      </div>
    </>
  );
}

export default CollectionThumbnails;
