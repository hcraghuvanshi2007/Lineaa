import pantheonImg from '../assets/images/pantheon-ChbEbbTu.jpg';
import eclipseImg from '../assets/images/eclipse-ErA5xE4T.jpg';
import haloImg from '../assets/images/halo-CMlMG7vQ.jpg';
import obliqueImg from '../assets/images/oblique-BrLAWbgb.jpg';
import shadowlineImg from '../assets/images/shadowline-DPSA61jB.jpg';
import solitaireRingImg from '../assets/images/solitaire-ring.png';
import ringCatalogImg from '../assets/images/ring-catalog.png';
import necklaceCatalogImg from '../assets/images/necklace-catalog.png';
import earringCatalogImg from '../assets/images/earring-catalog.png';
import braceletCatalogImg from '../assets/images/bracelet-catalog.png';
import organicEarringImg from '../assets/images/organic-earring-BV1LtJhH.png';
import linkBraceletImg from '../assets/images/link-bracelet-CMFM2KKw.png';

export const allProducts = [
  { 
    id: 1, 
    name: 'Pantheon', 
    category: 'Earrings', 
    price: 2850, 
    img: pantheonImg, 
    imgMain: pantheonImg, 
    imgHover: organicEarringImg, 
    badge: 'NEW' 
  },
  { 
    id: 2, 
    name: 'Eclipse', 
    category: 'Bracelets', 
    price: 3200, 
    img: eclipseImg, 
    imgMain: eclipseImg, 
    imgHover: linkBraceletImg, 
    badge: 'EXCLUSIVE' 
  },
  { 
    id: 3, 
    name: 'Halo', 
    category: 'Earrings', 
    price: 1950, 
    img: haloImg, 
    imgMain: haloImg, 
    imgHover: organicEarringImg, 
    badge: 'NEW' 
  },
  { 
    id: 4, 
    name: 'Orbit', 
    category: 'Bracelets', 
    price: 2450, 
    img: linkBraceletImg, 
    imgMain: linkBraceletImg, 
    imgHover: eclipseImg, 
    badge: 'COLLECTIBLE' 
  },
  { 
    id: 5, 
    name: 'Aura', 
    category: 'Earrings', 
    price: 3100, 
    img: organicEarringImg, 
    imgMain: organicEarringImg, 
    imgHover: pantheonImg, 
    badge: 'EXCLUSIVE' 
  },
  { 
    id: 6, 
    name: 'Vortex', 
    category: 'Earrings', 
    price: 2250, 
    img: pantheonImg, 
    imgMain: pantheonImg, 
    imgHover: haloImg, 
    badge: 'NEW' 
  },
  { 
    id: 7, 
    name: 'Solitaire Ring', 
    category: 'Rings', 
    price: 4200, 
    img: solitaireRingImg, 
    imgMain: solitaireRingImg, 
    imgHover: ringCatalogImg, 
    badge: 'NEW' 
  },
  { 
    id: 8, 
    name: 'Zenith Ring', 
    category: 'Rings', 
    price: 3100, 
    img: ringCatalogImg, 
    imgMain: ringCatalogImg, 
    imgHover: solitaireRingImg, 
    badge: 'TOP RATED' 
  },
  { 
    id: 9, 
    name: 'Serenity Necklace', 
    category: 'Necklaces', 
    price: 4500, 
    img: necklaceCatalogImg, 
    imgMain: necklaceCatalogImg, 
    imgHover: shadowlineImg, 
    badge: 'NEW' 
  },
  { 
    id: 10, 
    name: 'Unity Bracelet', 
    category: 'Bracelets', 
    price: 3200, 
    img: braceletCatalogImg, 
    imgMain: braceletCatalogImg, 
    imgHover: obliqueImg, 
    badge: 'EXCLUSIVE' 
  },
];
