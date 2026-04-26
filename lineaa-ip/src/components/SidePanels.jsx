import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SearchPanel({ onClose, products = [] }) {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    setSearchValue(tag);
  };

  // Live filtering of "available" products
  const filteredProducts = useMemo(() => {
    if (!searchValue.trim()) return [];
    
    const search = searchValue.toLowerCase();
    
    return products.filter(p => {
      const name = p.name.toLowerCase();
      const cat = p.category.toLowerCase();
      
      // Robust matching: check if either contains the other
      const match = name.includes(search) || search.includes(name) || 
                    cat.includes(search) || search.includes(cat);
                    
      const isAvailable = p.badge !== 'COMING SOON';
      return match && isAvailable;
    }).slice(0, 4); // Limit to 4 quick results
  }, [searchValue, products]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchValue.trim()) return;

    // Check for exact product match
    const exactMatch = products.find(p => p.name.toLowerCase() === searchValue.toLowerCase().trim());
    
    if (exactMatch) {
      navigate(`/product/${exactMatch.id}`);
    } else {
      // General shop search
      navigate(`/shop?q=${encodeURIComponent(searchValue.trim())}`);
    }
    
    onClose('search');
  };

  return (
    <div className="side-panel active" id="search-panel">
      <div className="panel-header">
        <h2>Search</h2>
        <button className="panel-close" onClick={() => onClose('search')}>✕</button>
      </div>
      <div className="panel-content">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for jewelry..."
            id="search-input"
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit" className="search-submit-btn" title="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '15px', color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Popular Searches
          </h3>
          <div className="popular-searches">
            {['Pantheon', 'Eclipse', 'Shadow Line', 'Halo Series', 'Minimalist Rings'].map(tag => (
              <button key={tag} className="search-tag" onClick={() => handleTagClick(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {searchValue.trim() && (
          <div className="search-results-container">
            <h3 style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {filteredProducts.length > 0 ? "Quick Results" : "No Available Products Found"}
            </h3>
            
            <div id="quick-results">
              {filteredProducts.map(product => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className="search-result-item"
                  onClick={() => onClose('search')}
                >
                  <img src={product.img} alt={product.name} className="result-img" />
                  <div className="result-info">
                    <span className="name">{product.name}</span>
                    <span className="price">€{product.price.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length > 0 && (
              <Link 
                to={`/shop?q=${encodeURIComponent(searchValue)}`} 
                className="view-more-search"
                onClick={() => onClose('search')}
              >
                View All in Shop
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useAuth } from '../context/AuthContext';

function AccountPanel({ onClose, profileData, setProfileData }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, login, logout, currentUser } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    setLoading(true);
    try {
      if (activeTab === 'login') {
        await login(email, password);
        onClose('account');
      } else {
        await signup(email, password);
        // Update profile data in state immediately
        setProfileData({
          fullName,
          phone,
          address,
          city,
          country
        });
        setMsg('Account created successfully!');
        setActiveTab('login');
      }
    } catch (err) {
      setError(err.message.replace('Firebase:', '').trim());
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose('account');
    } catch (err) {
      setError('Failed to log out');
    }
  };

  if (currentUser) {
    return (
      <div className="side-panel active" id="account-panel">
        <div className="panel-header">
          <h2>My Profile</h2>
          <button className="panel-close" onClick={() => onClose('account')}>✕</button>
        </div>
        <div className="panel-content">
          <div className="profile-info">
            <div className="profile-avatar">
              {profileData.fullName ? profileData.fullName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
            </div>
            <h3>{profileData.fullName || 'Welcome Member'}</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '15px' }}>{currentUser.email}</p>
            
            {profileData.address && (
              <div className="profile-meta" style={{ textAlign: 'center', fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '10px' }}>
                <p>{profileData.address}</p>
                <p>{profileData.city}, {profileData.country}</p>
                <p>{profileData.phone}</p>
              </div>
            )}
          </div>
          
          <div className="profile-links">
            <Link to="/wishlist" className="profile-link" onClick={() => onClose('account')}>My Favorites</Link>
            <Link to="/orders" className="profile-link" onClick={() => onClose('account')}>Order History</Link>
            <Link to="/about/customer-care" className="profile-link" onClick={() => onClose('account')}>Support</Link>
          </div>

          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="side-panel active" id="account-panel">
      <div className="panel-header">
        <h2>My Account</h2>
        <button className="panel-close" onClick={() => onClose('account')}>✕</button>
      </div>
      <div className="panel-content">
        <div className="account-tabs">
          <button
            className={`account-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`account-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {msg && <div className="auth-success">{msg}</div>}

        <form onSubmit={handleAuth} className="auth-form">
          {activeTab === 'signup' && (
             <>
               <div className="form-group">
                 <label>Full Name</label>
                 <input 
                   type="text" 
                   placeholder="Your Name" 
                   required 
                   value={fullName}
                   onChange={(e) => setFullName(e.target.value)}
                 />
               </div>
               <div className="form-group">
                 <label>Phone Number</label>
                 <input 
                   type="tel" 
                   placeholder="+1 (555) 000-0000" 
                   required 
                   value={phone}
                   onChange={(e) => setPhone(e.target.value)}
                 />
               </div>
               <div className="form-group">
                 <label>Address</label>
                 <input 
                   type="text" 
                   placeholder="123 Boutique St" 
                   required 
                   value={address}
                   onChange={(e) => setAddress(e.target.value)}
                 />
               </div>
               <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
                 <div className="form-group" style={{ flex: 1 }}>
                   <label>City</label>
                   <input 
                     type="text" 
                     placeholder="Paris" 
                     required 
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                   />
                 </div>
                 <div className="form-group" style={{ flex: 1 }}>
                   <label>Country</label>
                   <input 
                     type="text" 
                     placeholder="France" 
                     required 
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                   />
                 </div>
               </div>
             </>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="your@email.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login-btn" disabled={loading}>
            {loading ? 'Processing...' : (activeTab === 'login' ? 'Login' : 'Create Account')}
          </button>
        </form>

        {activeTab === 'login' && (
          <div className="signup-link">
            <a href="#">Forgot password?</a>
          </div>
        )}

        {activeTab === 'signup' && (
          <div className="signup-link">
            By signing up, you agree to our <a href="#">Terms</a>
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistPanel({ onClose, wishlistData, setWishlistData }) {
  const removeItem = (id) => {
    setWishlistData(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="side-panel active" id="wishlist-panel">
      <div className="panel-header">
        <h2>Your Favorites</h2>
        <button className="panel-close" onClick={() => onClose('wishlist')}>✕</button>
      </div>
      <div className="panel-content">
        {wishlistData.length === 0 ? (
          <div className="wishlist-empty">
            <p>You haven't added any favorites yet. Browse our collection and click the heart icon to save items you love.</p>
          </div>
        ) : (
          <div id="wishlist-items">
            {wishlistData.map(item => (
              <div key={item.id} className="wishlist-item" style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
                <div className="wishlist-item-image" style={{ width: '70px', height: '70px', background: 'var(--color-secondary)', borderRadius: '6px', overflow: 'hidden' }}>
                  <img 
                    src={products?.find(p => p.id === item.id)?.img || item.img} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    onError={(e) => {
                      const fallback = products?.find(p => p.id === item.id)?.img;
                      if (fallback) e.target.src = fallback;
                    }}
                  />
                </div>
                <div className="wishlist-item-details" style={{ flex: 1 }}>
                  <div className="wishlist-item-name" style={{ fontSize: '13px', fontWeight: '500', marginBottom: '5px' }}>{item.name}</div>
                  <div className="wishlist-item-price" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-primary)' }}>€{item.price}</div>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', fontSize: '18px' }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CartPanel({ onClose, cartData, setCartData, wishlistData, setWishlistData }) {
  const [itemToRemove, setItemToRemove] = useState(null);
  const updateQty = (id, delta) => {
    setCartData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartData(prev => prev.filter(item => item.id !== id));
    setItemToRemove(null);
  };

  const moveToWishlist = (item) => {
    setWishlistData(prev => {
      if (prev.find(w => w.id === item.id)) return prev;
      return [...prev, item];
    });
    removeItem(item.id);
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire bag?")) {
      setCartData([]);
    }
  };

  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="side-panel active" id="cart-panel">
      <div className="panel-header">
        <h2>Shopping Bag</h2>
        <button className="panel-close" onClick={() => onClose('cart')}>✕</button>
      </div>
      <div className="panel-content">
        {cartData.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty. Browse our collection and add items you love.</p>
          </div>
        ) : (
          <div id="cart-items">
            {cartData.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={products?.find(p => p.id === item.id)?.img || item.img} 
                    alt={item.name} 
                    onError={(e) => {
                      const fallback = products?.find(p => p.id === item.id)?.img;
                      if (fallback) e.target.src = fallback;
                    }}
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '5px' }}>{item.category}</div>
                  <div className="cart-item-price">€{item.price.toLocaleString()}</div>
                  <div className="cart-item-quantity">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => setItemToRemove(item)}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span id="subtotal">€{subtotal.toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>TBD</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span id="total">€{subtotal.toLocaleString()}</span>
        </div>
        <Link to="/checkout" className="login-btn" style={{ marginTop: '15px', display: 'block', textDecoration: 'none', textAlign: 'center' }} onClick={() => onClose('cart')}>
          Proceed to Checkout
        </Link>
        <button
          className="login-btn"
          style={{ background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)', marginTop: '10px' }}
          onClick={() => onClose('cart')}
        >
          Continue Shopping
        </button>
        {cartData.length > 0 && (
          <button
            onClick={clearCart}
            className="clear-cart-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Clear Entire Bag
          </button>
        )}
      </div>

      {itemToRemove && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--color-surface)', width: '90%', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Remove Item?</h3>
              <button onClick={() => setItemToRemove(null)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '12px', fontWeight: '500' }}>Cancel</span>✕
              </button>
            </div>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>What would you like to do with <strong>{itemToRemove.name}</strong>?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={() => moveToWishlist(itemToRemove)}
                style={{ padding: '10px', background: 'var(--color-secondary)', color: 'var(--color-text)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
              >
                Add to Wishlist & Remove
              </button>
              <button 
                onClick={() => removeItem(itemToRemove.id)}
                style={{ padding: '10px', background: '#FFF5F5', color: '#D32F2F', border: '1px solid #FFCDD2', borderRadius: '4px', cursor: 'pointer', fontWeight: '500' }}
              >
                Remove Item Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidePanels({ activePanel, onClose, cartData, setCartData, wishlistData, setWishlistData, products, profileData, setProfileData }) {
  if (!activePanel) return null;

  return (
    <>
      <div className="panel-overlay active" id="panel-overlay" onClick={() => onClose(activePanel)} />
      {activePanel === 'search' && <SearchPanel onClose={onClose} products={products} />}
      {activePanel === 'account' && <AccountPanel onClose={onClose} profileData={profileData} setProfileData={setProfileData} />}
      {activePanel === 'wishlist' && <WishlistPanel onClose={onClose} wishlistData={wishlistData} setWishlistData={setWishlistData} />}
      {activePanel === 'cart' && <CartPanel onClose={onClose} cartData={cartData} setCartData={setCartData} wishlistData={wishlistData} setWishlistData={setWishlistData} />}
    </>
  );
}

export default SidePanels;
