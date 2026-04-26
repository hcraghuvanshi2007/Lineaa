import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SidePanels from './components/SidePanels';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Orders = lazy(() => import('./pages/Orders'));
const Shop = lazy(() => import('./pages/Shop'));
const NewIn = lazy(() => import('./pages/NewIn'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Wishlist = lazy(() => import('./pages/Wishlist'));

// Loading Page for Suspense
const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-background)' }}>
    <div className="music-bars">
      <div className="bar"></div><div className="bar"></div><div className="bar"></div><div className="bar"></div>
    </div>
  </div>
);

import { allProducts } from './data/products';

function ProtectedRoute({ children, onOpenPanel }) {
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (!currentUser && onOpenPanel) {
      onOpenPanel('account');
    }
  }, [currentUser, onOpenPanel]);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  
  return children;
}



function AppContent() {
  const [activePanel, setActivePanel] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [profileData, setProfileData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });
  const { currentUser } = useAuth();

  const isInitialLoad = useRef(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset guard on user change
  useEffect(() => {
    isInitialLoad.current = true;
    setIsLoaded(false);
  }, [currentUser]);

  // Load data
  useEffect(() => {
    if (!currentUser) {
      setCartData([]);
      setWishlistData([]);
      setOrdersData([]);
      setProfileData({ fullName: '', phone: '', address: '', city: '', country: '' });
      setIsLoaded(true);
      return;
    }

    const loadData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.cart) setCartData(data.cart);
          if (data.wishlist) setWishlistData(data.wishlist);
          if (data.orders) setOrdersData(data.orders);
          if (data.profile) setProfileData(data.profile);
        }
      } catch (err) {
        console.error("Error loading user data:", err);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, [currentUser]);

  // Unified Autosave (Debounced)
  useEffect(() => {
    if (!currentUser || !isLoaded) return;
    
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), {
          cart: cartData,
          wishlist: wishlistData,
          orders: ordersData,
          profile: profileData
        }, { merge: true });
        console.log("☁️ Firestore Sync Complete");
      } catch (err) {
        console.error("☁️ Firestore Sync Failed:", err);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [cartData, wishlistData, ordersData, profileData, currentUser, isLoaded]);

  const addOrder = async (newOrder) => {
    // 1. Update local state immediately for UI
    const updatedOrders = [newOrder, ...ordersData];
    setOrdersData(updatedOrders);
    setCartData([]);
    
    // 2. Immediate, non-debounced save for this CRITICAL action
    if (currentUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), {
          orders: updatedOrders,
          cart: []
        }, { merge: true });
        console.log("💎 ORDER SAVED PERMANENTLY");
      } catch (err) {
        console.error("❌ ORDER SAVE FAILED:", err);
      }
    }
  };

  const addToCart = (product) => {
    if (!currentUser) {
      openPanel('account');
      return;
    }
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
    if (!currentUser) {
      openPanel('account');
      return;
    }
    setWishlistData(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
    openPanel('wishlist');
  };

  const removeFromWishlist = (id) => {
    setWishlistData(prev => prev.filter(item => item.id !== id));
  };

  const openPanel = (panelName) => {
    setActivePanel(panelName);
    document.body.style.overflow = 'hidden';
  };

  const closePanel = () => {
    setActivePanel(null);
    document.body.style.overflow = 'auto';
  };

  const subtotal = React.useMemo(() => 
    cartData.reduce((sum, item) => sum + item.price * item.qty, 0), 
  [cartData]);

  return (
    <>
      <ScrollToTop />
      <Navbar onOpenPanel={openPanel} cartCount={cartData.length} />

      <SidePanels
        activePanel={activePanel}
        onClose={closePanel}
        cartData={cartData}
        setCartData={setCartData}
        wishlistData={wishlistData}
        setWishlistData={setWishlistData}
        products={allProducts}
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} addToWishlist={addToWishlist} />} />
          <Route path="/new-in" element={<NewIn addToCart={addToCart} addToWishlist={addToWishlist} />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:page" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} addToWishlist={addToWishlist} />} />
          
          {/* Protected Routes */}
          <Route path="/wishlist" element={
            <ProtectedRoute onOpenPanel={openPanel}>
              <Wishlist wishlistData={wishlistData} addToCart={addToCart} removeFromWishlist={removeFromWishlist} allProducts={allProducts} />
            </ProtectedRoute>
          } />

          <Route path="/checkout" element={
            <ProtectedRoute onOpenPanel={openPanel}>
              <Checkout cartData={cartData} addOrder={addOrder} profileData={profileData} />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute onOpenPanel={openPanel}>
              <Orders ordersData={ordersData} allProducts={allProducts} />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

function App() {
  console.log("App Rendering - High Level");
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
