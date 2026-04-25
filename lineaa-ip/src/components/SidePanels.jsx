import { useState } from 'react';

function SearchPanel({ onClose }) {
  const [searchValue, setSearchValue] = useState('');

  const handleTagClick = (tag) => {
    setSearchValue(tag);
  };

  return (
    <div className="side-panel active" id="search-panel">
      <div className="panel-header">
        <h2>Search</h2>
        <button className="panel-close" onClick={() => onClose('search')}>✕</button>
      </div>
      <div className="panel-content">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search for jewelry..."
            id="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '15px', color: 'var(--color-text)' }}>
            Popular Searches
          </h3>
          <div className="popular-searches">
            {['Gold Rings', 'Silver Necklaces', 'Pearl Earrings', 'Designer Bracelets', 'Wedding Rings', 'Vintage Collection'].map(tag => (
              <button key={tag} className="search-tag" onClick={() => handleTagClick(tag)}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('login');

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

        {activeTab === 'login' && (
          <div className="tab-content active" id="login-tab">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <button className="login-btn">Login</button>
            <div className="signup-link">
              <a href="#">Forgot password?</a>
            </div>
          </div>
        )}

        {activeTab === 'signup' && (
          <div className="tab-content active" id="signup-tab">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="John" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Doe" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <button className="login-btn">Create Account</button>
            <div className="signup-link">
              By signing up, you agree to our <a href="#">Terms</a>
            </div>
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
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                  <img src={item.img} alt={item.name} />
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
        <button className="login-btn" style={{ marginTop: '15px' }}>Proceed to Checkout</button>
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

function SidePanels({ activePanel, onClose, cartData, setCartData, wishlistData, setWishlistData }) {
  if (!activePanel) return null;

  return (
    <>
      <div className="panel-overlay active" id="panel-overlay" onClick={() => onClose(activePanel)} />
      {activePanel === 'search' && <SearchPanel onClose={onClose} />}
      {activePanel === 'account' && <AccountPanel onClose={onClose} />}
      {activePanel === 'wishlist' && <WishlistPanel onClose={onClose} wishlistData={wishlistData} setWishlistData={setWishlistData} />}
      {activePanel === 'cart' && <CartPanel onClose={onClose} cartData={cartData} setCartData={setCartData} wishlistData={wishlistData} setWishlistData={setWishlistData} />}
    </>
  );
}

export default SidePanels;
