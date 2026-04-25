import './Shop.css';
import { Link } from 'react-router-dom';

import haloImg from '../assets/images/halo-CMlMG7vQ.jpg';
import obliqueImg from '../assets/images/oblique-BrLAWbgb.jpg';
import shadowlineImg from '../assets/images/shadowline-DPSA61jB.jpg';
import pantheonImg from '../assets/images/pantheon-ChbEbbTu.jpg';
import eclipseImg from '../assets/images/eclipse-ErA5xE4T.jpg';

const products = [
  { id: 1, name: 'Halo', category: 'Earrings', price: 119, img: haloImg },
  { id: 2, name: 'Oblique', category: 'Earrings', price: 179, img: obliqueImg },
  { id: 3, name: 'Shadow Line', category: 'Bracelet', price: 349, img: shadowlineImg },
  { id: 4, name: 'Pantheon', category: 'Earrings', price: 129, img: pantheonImg },
  { id: 5, name: 'Eclipse', category: 'Bracelets', price: 399, img: eclipseImg },
  { id: 6, name: 'Halo', category: 'Earrings', price: 119, img: haloImg },
];

function Shop({ addToCart, addToWishlist }) {
  return (
    <div className="shop-container">
      <div className="shop-layout">
        <aside className="sidebar">
            <div className="filter-group">
                <h3>Category</h3>
                <div className="filter-item">
                    <input type="checkbox" id="rings" value="rings" />
                    <label htmlFor="rings">Rings</label>
                </div>
                <div className="filter-item">
                    <input type="checkbox" id="necklaces" value="necklaces" />
                    <label htmlFor="necklaces">Necklaces</label>
                </div>
                <div className="filter-item">
                    <input type="checkbox" id="earrings" value="earrings" />
                    <label htmlFor="earrings">Earrings</label>
                </div>
                <div className="filter-item">
                    <input type="checkbox" id="bracelets" value="bracelets" />
                    <label htmlFor="bracelets">Bracelets</label>
                </div>
            </div>

            <div className="filter-group">
                <h3>Price Range</h3>
                <div className="filter-item"><input type="checkbox" id="price1" /><label htmlFor="price1">Under €500</label></div>
                <div className="filter-item"><input type="checkbox" id="price2" /><label htmlFor="price2">€500 - €1,000</label></div>
                <div className="filter-item"><input type="checkbox" id="price3" /><label htmlFor="price3">€1,000 - €5,000</label></div>
                <div className="filter-item"><input type="checkbox" id="price4" /><label htmlFor="price4">€5,000+</label></div>
            </div>
            
            <div className="filter-group">
                <h3>Material</h3>
                <div className="filter-item"><input type="checkbox" id="gold" /><label htmlFor="gold">Gold</label></div>
                <div className="filter-item"><input type="checkbox" id="silver" /><label htmlFor="silver">Silver</label></div>
                <div className="filter-item"><input type="checkbox" id="platinum" /><label htmlFor="platinum">Platinum</label></div>
            </div>
        </aside>

        <div className="shop-content">
          <div className="controls-bar">
            <span className="results-count">Showing <strong>{products.length}</strong> products</span>
            <select className="sort-dropdown">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
            </select>
          </div>
          
          <div className="product-grid">
            {products.map((product, idx) => (
                <div className="product-card" key={idx}>
                    <div className="product-image">
                        <img src={product.img} alt={product.name} />
                    </div>
                    <div className="product-info">
                        <div className="category" style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                            {product.category}
                        </div>
                        <div className="product-name" style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{product.name}</div>
                        <div className="product-price" style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary)' }}>
                            €{product.price}
                        </div>
                        <div className="product-actions" style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                            <button 
                              className="add-to-cart-btn" 
                              onClick={() => addToCart(product)}
                              style={{ flex: 1, padding: '8px', background: 'var(--color-text)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
                              Add to Bag
                            </button>
                            <button 
                              className="wishlist-btn" 
                              onClick={() => addToWishlist(product)}
                              style={{ width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-secondary)', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'var(--color-text)' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                              </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
          </div>

          <div className="pagination">
              <button>Previous</button>
              <Link to="#" className="active">1</Link>
              <Link to="#">2</Link>
              <Link to="#">3</Link>
              <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
