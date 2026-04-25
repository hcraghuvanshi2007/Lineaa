import { useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import NewIn from './pages/NewIn';
import About from './pages/About';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import SidePanels from './components/SidePanels';
import ScrollToTop from './components/ScrollToTop';

import pantheonImg from './assets/images/pantheon-ChbEbbTu.jpg';
import eclipseImg from './assets/images/eclipse-ErA5xE4T.jpg';
import haloImg from './assets/images/halo-CMlMG7vQ.jpg';

const initialCartData = [
  { id: 1, name: 'Pantheon', category: 'Earrings', price: 2850, qty: 1, img: pantheonImg },
  { id: 2, name: 'Eclipse', category: 'Bracelets', price: 3200, qty: 1, img: eclipseImg },
  { id: 3, name: 'Halo', category: 'Earrings', price: 1950, qty: 1, img: haloImg },
];

function App() {
  const [activePanel, setActivePanel] = useState(null);
  const [cartData, setCartData] = useState(initialCartData);
  const [wishlistData, setWishlistData] = useState([]);

  const addToCart = (product) => {
    setCartData(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    openPanel('cart');
  };

  const addToWishlist = (product) => {
    setWishlistData(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
    openPanel('wishlist');
  };

  const openPanel = (panelName) => {
    setActivePanel(panelName);
    document.body.style.overflow = 'hidden';
  };

  const closePanel = () => {
    setActivePanel(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <ScrollToTop />
      <Navbar onOpenPanel={openPanel} />

      <SidePanels
        activePanel={activePanel}
        onClose={closePanel}
        cartData={cartData}
        setCartData={setCartData}
        wishlistData={wishlistData}
        setWishlistData={setWishlistData}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} addToWishlist={addToWishlist} />} />
        <Route path="/new-in" element={<NewIn addToCart={addToCart} addToWishlist={addToWishlist} />} />
        <Route path="/about/:page" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} addToWishlist={addToWishlist} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
