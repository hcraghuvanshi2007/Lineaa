import './NewIn.css';
import { Link } from 'react-router-dom';

import pantheonImg from '../assets/images/pantheon-ChbEbbTu.jpg';
import eclipseImg from '../assets/images/eclipse-ErA5xE4T.jpg';
import haloImg from '../assets/images/halo-CMlMG7vQ.jpg';
import obliqueImg from '../assets/images/oblique-BrLAWbgb.jpg';
import shadowlineImg from '../assets/images/shadowline-DPSA61jB.jpg';
// using existing image for missing lintel-CG5vNX3U.jpg
import lintelImg from '../assets/images/pantheon-ChbEbbTu.jpg';

const products = [
  { id: 1, name: 'Pantheon', badge: 'NEW', badgeClass: '', category: 'Earring', price: 349, img: pantheonImg },
  { id: 2, name: 'Eclipse', badge: 'EXCLUSIVE', badgeClass: 'exclusive', category: 'Bracelets', price: 599, img: eclipseImg },
  { id: 3, name: 'Halo', badge: 'COMING SOON', badgeClass: 'coming-soon', category: 'Earrings', price: 170, img: haloImg },
  { id: 4, name: 'Lintel', badge: 'NEW', badgeClass: '', category: 'Earrings', price: 300, img: lintelImg },
  { id: 5, name: 'Shadow line', badge: 'EXCLUSIVE', badgeClass: 'exclusive', category: 'Bracelet', price: 700, img: shadowlineImg },
  { id: 6, name: 'Oblique', badge: 'COMING SOON', badgeClass: 'coming-soon', category: 'Earring', price: 178, img: obliqueImg },
];

function NewIn({ addToCart, addToWishlist }) {
  return (
    <div className="new-in-container">
      <div className="new-in-header">
        <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>New In</span>
        </div>
        <h1>New Collections</h1>
        <p>Discover our latest arrivals and exclusive collections</p>
      </div>
      
      <div className="collection-highlight">
        <h2>Latest Arrivals</h2>
        <p>Fresh designs added weekly. Be the first to discover our newest pieces.</p>
      </div>

      <div className="new-in-layout">
        <aside className="sidebar">
            <div className="filter-group">
                <h3>Collections</h3>
                <div className="filter-item"><input type="radio" name="collection" id="this-week" /><label htmlFor="this-week">This Week's Arrivals</label></div>
                <div className="filter-item"><input type="radio" name="collection" id="spring" /><label htmlFor="spring">Spring Collection</label></div>
                <div className="filter-item"><input type="radio" name="collection" id="featured" /><label htmlFor="featured">Featured Designers</label></div>
                <div className="filter-item"><input type="radio" name="collection" id="limited" /><label htmlFor="limited">Limited Edition</label></div>
                <div className="filter-item"><input type="radio" name="collection" id="preorder" /><label htmlFor="preorder">Pre-Orders</label></div>
            </div>

            <div className="filter-group">
                <h3>Availability</h3>
                <div className="filter-item"><input type="checkbox" id="all" /><label htmlFor="all">All</label></div>
                <div className="filter-item"><input type="checkbox" id="in-stock" /><label htmlFor="in-stock">In Stock</label></div>
                <div className="filter-item"><input type="checkbox" id="pre-order" /><label htmlFor="pre-order">Pre-Order</label></div>
            </div>
            
            <div className="filter-group">
                <h3>Price Range</h3>
                <div className="filter-item"><input type="checkbox" id="price1" /><label htmlFor="price1">Under €500</label></div>
                <div className="filter-item"><input type="checkbox" id="price2" /><label htmlFor="price2">€500 - €1,000</label></div>
                <div className="filter-item"><input type="checkbox" id="price3" /><label htmlFor="price3">€1,000 - €5,000</label></div>
                <div className="filter-item"><input type="checkbox" id="price4" /><label htmlFor="price4">€5,000+</label></div>
            </div>
        </aside>

        <div className="new-in-content">
          <div className="controls-bar" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: 'var(--color-secondary)', borderRadius: '8px' }}>
            <span className="results-count">Showing <strong>{products.length}</strong> products</span>
            <select className="sort-dropdown" style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
            </select>
          </div>
          
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
            {products.map((product, idx) => (
                <div className="product-card" key={idx} style={{ background: 'var(--color-surface)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative' }}>
                    <div className="product-image" style={{ height: '300px' }}>
                        <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {product.badge && (
                            <span className={`product-badge ${product.badgeClass}`}>
                                {product.badge}
                            </span>
                        )}
                    </div>
                    <div className="product-info" style={{ padding: '20px' }}>
                        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                            {product.category}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>{product.name}</div>
                        <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-primary)' }}>
                            ${product.price}
                        </div>
                        <div className="product-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            <button 
                              className="add-to-cart-btn" 
                              onClick={() => addToCart(product)}
                              style={{ flex: 1, padding: '10px', background: 'var(--color-text)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                              Add to Bag
                            </button>
                            <button 
                              className="wishlist-btn" 
                              onClick={() => addToWishlist(product)}
                              style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-secondary)', border: 'none', borderRadius: '4px', cursor: 'pointer', color: 'var(--color-text)' }}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                              </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
          </div>

          <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
              <button style={{ padding: '10px 15px', border: '1px solid var(--color-border)', borderRadius: '6px', background: '#fff' }}>Previous</button>
              <Link to="#" className="active" style={{ padding: '10px 15px', border: '1px solid var(--color-primary)', background: 'var(--color-primary)', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>1</Link>
              <Link to="#" style={{ padding: '10px 15px', border: '1px solid var(--color-border)', borderRadius: '6px', textDecoration: 'none', color: 'var(--color-text)' }}>2</Link>
              <Link to="#" style={{ padding: '10px 15px', border: '1px solid var(--color-border)', borderRadius: '6px', textDecoration: 'none', color: 'var(--color-text)' }}>3</Link>
              <button style={{ padding: '10px 15px', border: '1px solid var(--color-border)', borderRadius: '6px', background: '#fff' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewIn;
