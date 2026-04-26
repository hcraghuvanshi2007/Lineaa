import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Shop.css'; // Reuse product grid styles

function Wishlist({ wishlistData, addToCart, removeFromWishlist, allProducts }) {
  const { currentUser } = useAuth();

  return (
    <div className="wishlist-page">
      <section className="page-header">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Wishlist</span>
        </div>
        <h1 className="page-title">Your Favorites</h1>
        <p className="page-subtitle">A curated collection of the pieces you love most.</p>
      </section>

      <div className="shop-container" style={{ padding: '0 48px 100px' }}>
        {wishlistData.length === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>Your wishlist is currently empty.</p>
            <Link to="/shop" className="login-btn" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '12px 40px' }}>
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlistData.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={allProducts?.find(p => p.id === product.id)?.img || product.img} 
                      alt={product.name} 
                      onError={(e) => {
                        const fallback = allProducts?.find(p => p.id === product.id)?.img;
                        if (fallback) e.target.src = fallback;
                      }}
                    />
                  </Link>
                  <button className="wishlist-btn active" onClick={() => removeFromWishlist(product.id)}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="product-price">€{product.price.toLocaleString()}</div>
                  <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Bag</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
