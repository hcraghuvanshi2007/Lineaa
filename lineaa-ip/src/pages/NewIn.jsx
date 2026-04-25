import './NewIn.css';
import { Link, useSearchParams } from 'react-router-dom';

import pantheonImg from '../assets/images/pantheon-ChbEbbTu.jpg';
import eclipseImg from '../assets/images/eclipse-ErA5xE4T.jpg';
import haloImg from '../assets/images/halo-CMlMG7vQ.jpg';
import obliqueImg from '../assets/images/oblique-BrLAWbgb.jpg';
import shadowlineImg from '../assets/images/shadowline-DPSA61jB.jpg';
// using existing image for missing lintel-CG5vNX3U.jpg
import lintelImg from '../assets/images/pantheon-ChbEbbTu.jpg';

const products = [
  { id: 1, name: 'Pantheon', badge: 'NEW', badgeClass: '', category: 'Earrings', price: 2850, img: pantheonImg },
  { id: 2, name: 'Eclipse', badge: 'EXCLUSIVE', badgeClass: 'exclusive', category: 'Bracelets', price: 3200, img: eclipseImg },
  { id: 3, name: 'Halo', badge: 'NEW', badgeClass: '', category: 'Earrings', price: 1950, img: haloImg },
  { id: 4, name: 'Oblique', badge: 'COMING SOON', badgeClass: 'coming-soon', category: 'Earrings', price: 1790, img: obliqueImg },
  { id: 5, name: 'Shadow Line', badge: 'EXCLUSIVE', badgeClass: 'exclusive', category: 'Bracelets', price: 2340, img: shadowlineImg },
];

import { useState, useEffect } from 'react';

const collectionContent = {
  'all': {
    title: 'New Collections',
    desc: 'Discover our latest arrivals and exclusive collections'
  },
  'this-weeks-arrivals': {
    title: "This Week's Arrivals",
    desc: 'Explore the freshest designs added to our catalog this week.'
  },
  'spring-collection': {
    title: 'Spring Collection',
    desc: 'Lightweight textures and vibrant minimalist pieces for the new season.'
  },
  'featured-designers': {
    title: 'Featured Designers',
    desc: "Exclusive collaborations with the world's most visionary artists."
  },
  'limited-edition': {
    title: 'Limited Edition',
    desc: 'Rare, one-of-a-kind pieces that will not be restocked.'
  },
  'pre-orders': {
    title: 'Pre-Orders',
    desc: 'Secure your favorites from our upcoming collection before they launch.'
  }
};

function NewIn({ addToCart, addToWishlist }) {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [activePrices, setActivePrices] = useState([]);
  const [activeCollection, setActiveCollection] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [displayProducts, setDisplayProducts] = useState(products);

  // Map URL filters to internal state
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      setActiveCollection(filterParam);
    } else {
      setActiveCollection('all');
    }
  }, [searchParams]);

  // Apply filters whenever criteria change
  useEffect(() => {
    let filtered = products;

    if (activePrices.length > 0) {
      filtered = filtered.filter(p => {
        if (activePrices.includes('under-500') && p.price < 500) return true;
        if (activePrices.includes('500-1000') && p.price >= 500 && p.price <= 1000) return true;
        if (activePrices.includes('1000-5000') && p.price > 1000 && p.price <= 5000) return true;
        if (activePrices.includes('over-5000') && p.price > 5000) return true;
        return false;
      });
    }

    // Pseudo-filtering for collections (shuffling for demo)
    if (activeCollection !== 'all') {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    if (sortBy === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered = filtered.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'popular') {
      filtered = filtered.sort((a, b) => a.id - b.id);
    }

    setDisplayProducts([...filtered]);
    setCurrentPage(1);
  }, [activePrices, sortBy]);

  const handlePriceChange = (val) => {
    setActivePrices(prev => prev.includes(val) ? prev.filter(p => p !== val) : [...prev, val]);
  };

  const goToPage = (page, e) => {
    if (e) e.preventDefault();
    if (page < 1 || page > 3) return; // limit to 3 pseudo-pages for demo
    
    setCurrentPage(page);
    
    // Create random shuffle of exact same products array
    if (page === 1) {
      setDisplayProducts(products); // base layout for page 1
    } else {
      setDisplayProducts([...products].sort(() => Math.random() - 0.5));
    }

    // Scroll to top of grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="new-in-container">
      <div className="page-header">
        <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>New In</span>
        </div>
        <h1 className="page-title">New Collections</h1>
        <p className="page-subtitle">Discover our latest arrivals and exclusive collections</p>
      </div>
      
      <div className="collection-highlight">
        <h2>{collectionContent[activeCollection]?.title || 'Latest Arrivals'}</h2>
        <p>{collectionContent[activeCollection]?.desc || 'Fresh designs added weekly. Be the first to discover our newest pieces.'}</p>
      </div>

      <div className="new-in-layout">
        <aside className="sidebar">
            <div className="filter-group">
                <h3>Collections</h3>
                <div className="filter-item">
                    <input type="radio" name="collection" id="all-coll" checked={activeCollection === 'all'} onChange={() => setActiveCollection('all')} />
                    <label htmlFor="all-coll">All Items</label>
                </div>
                <div className="filter-item">
                    <input type="radio" name="collection" id="this-week" checked={activeCollection === 'this-weeks-arrivals'} onChange={() => setActiveCollection('this-weeks-arrivals')} />
                    <label htmlFor="this-week">This Week's Arrivals</label>
                </div>
                <div className="filter-item">
                    <input type="radio" name="collection" id="spring" checked={activeCollection === 'spring-collection'} onChange={() => setActiveCollection('spring-collection')} />
                    <label htmlFor="spring">Spring Collection</label>
                </div>
                <div className="filter-item">
                    <input type="radio" name="collection" id="featured-coll" checked={activeCollection === 'featured-designers'} onChange={() => setActiveCollection('featured-designers')} />
                    <label htmlFor="featured-coll">Featured Designers</label>
                </div>
                <div className="filter-item">
                    <input type="radio" name="collection" id="limited" checked={activeCollection === 'limited-edition'} onChange={() => setActiveCollection('limited-edition')} />
                    <label htmlFor="limited">Limited Edition</label>
                </div>
                <div className="filter-item">
                    <input type="radio" name="collection" id="preorder" checked={activeCollection === 'pre-orders'} onChange={() => setActiveCollection('pre-orders')} />
                    <label htmlFor="preorder">Pre-Orders</label>
                </div>
            </div>

            <div className="filter-group">
                <h3>Availability</h3>
                <div className="filter-item"><input type="checkbox" id="all" /><label htmlFor="all">All</label></div>
                <div className="filter-item"><input type="checkbox" id="in-stock" /><label htmlFor="in-stock">In Stock</label></div>
                <div className="filter-item"><input type="checkbox" id="pre-order" /><label htmlFor="pre-order">Pre-Order</label></div>
            </div>
            
            <div className="filter-group">
                <h3>Price Range</h3>
                <div className="filter-item"><input type="checkbox" id="price1" checked={activePrices.includes('under-500')} onChange={() => handlePriceChange('under-500')} /><label htmlFor="price1">Under €500</label></div>
                <div className="filter-item"><input type="checkbox" id="price2" checked={activePrices.includes('500-1000')} onChange={() => handlePriceChange('500-1000')} /><label htmlFor="price2">€500 - €1,000</label></div>
                <div className="filter-item"><input type="checkbox" id="price3" checked={activePrices.includes('1000-5000')} onChange={() => handlePriceChange('1000-5000')} /><label htmlFor="price3">€1,000 - €5,000</label></div>
                <div className="filter-item"><input type="checkbox" id="price4" checked={activePrices.includes('over-5000')} onChange={() => handlePriceChange('over-5000')} /><label htmlFor="price4">€5,000+</label></div>
            </div>
        </aside>

        <div className="new-in-content">
          <div className="controls-bar" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: 'var(--color-secondary)', borderRadius: '8px' }}>
            <span className="results-count">Showing <strong>{displayProducts.length}</strong> products</span>
            <select className="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: '6px' }}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
            </select>
          </div>
          
          <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '20px' }}>
            {displayProducts.map((product, idx) => (
                <Link to={`/product/${product.id}`} className="product-card" key={idx} style={{ textDecoration: 'none', color: 'inherit', background: 'var(--color-surface)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative', display: 'block' }}>
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
                            €{product.price.toLocaleString()}
                        </div>
                        <div className="product-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            <button 
                              className="add-to-cart-btn" 
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                              style={{ flex: '1', padding: '10px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '12px' }}
                            >
                              Add to Bag
                            </button>
                            <button 
                              className="wishlist-btn"
                              title="Add to Wishlist"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}
                              style={{ padding: '10px 15px', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', color: 'var(--color-text)', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}
                            >
                              ♡
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
          </div>

          <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '40px' }}>
              <button 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ padding: '10px 15px', border: '1px solid var(--color-border)', borderRadius: '6px', background: '#fff', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>

              {[1, 2, 3].map(page => (
                <a 
                  href="#" 
                  key={page}
                  onClick={(e) => goToPage(page, e)}
                  style={{ 
                    padding: '10px 15px', 
                    border: currentPage === page ? '1px solid var(--color-primary)' : '1px solid var(--color-border)', 
                    background: currentPage === page ? 'var(--color-primary)' : 'transparent', 
                    color: currentPage === page ? 'white' : 'var(--color-text)', 
                    borderRadius: '6px', 
                    textDecoration: 'none' 
                  }}
                >
                  {page}
                </a>
              ))}

              <button 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === 3}
                style={{ padding: '10px 15px', border: '1px solid var(--color-border)', borderRadius: '6px', background: '#fff', opacity: currentPage === 3 ? 0.5 : 1, cursor: currentPage === 3 ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewIn;
