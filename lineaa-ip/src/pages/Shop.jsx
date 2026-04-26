import './Shop.css';
import { Link, useSearchParams } from 'react-router-dom';

import { allProducts as products } from '../data/products';

import { useState, useEffect } from 'react';

function Shop({ addToCart, addToWishlist }) {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategories, setActiveCategories] = useState([]);
  const [activePrices, setActivePrices] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [displayProducts, setDisplayProducts] = useState(products);

  // Sync with URL parameters on mount/navigation
  useEffect(() => {
    const catParam = searchParams.get('category');
    const queryParam = searchParams.get('q');
    
    if (catParam) {
      const cat = catParam.toLowerCase();
      const mapped = cat.endsWith('s') ? cat.slice(0, -1) : cat;
      setActiveCategories([mapped]);
    } else {
      setActiveCategories([]);
    }

    // Handled in the filter effect below
  }, [searchParams]);

  // Apply filters whenever criteria change
  useEffect(() => {
    let filtered = products;
    const query = searchParams.get('q')?.toLowerCase();

    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
    }

    if (activeCategories.length > 0) {
      filtered = filtered.filter(p => activeCategories.some(cat => p.category.toLowerCase().includes(cat)));
    }

    if (activePrices.length > 0) {
      filtered = filtered.filter(p => {
        if (activePrices.includes('under-500') && p.price < 500) return true;
        if (activePrices.includes('500-1000') && p.price >= 500 && p.price <= 1000) return true;
        if (activePrices.includes('1000-5000') && p.price > 1000 && p.price <= 5000) return true;
        if (activePrices.includes('over-5000') && p.price > 5000) return true;
        return false;
      });
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
    setCurrentPage(1); // Reset pagination on new filter
  }, [activeCategories, activePrices, sortBy, searchParams]);

  const handleCategoryChange = (val) => {
    setActiveCategories(prev => prev.includes(val) ? prev.filter(c => c !== val) : [...prev, val]);
  };

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
    <div className="shop-container">
      <div className="page-header">
        <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Shop</span>
        </div>
        <h1 className="page-title">Curated Shop</h1>
        <p className="page-subtitle">Explore our complete collection of handcrafted minimalist jewelry</p>
      </div>
      <div className="shop-layout">
        <aside className="sidebar">
            <div className="filter-group">
                <h3>Category</h3>
                <div className="filter-item">
                    <input type="checkbox" id="rings" checked={activeCategories.includes('ring')} onChange={() => handleCategoryChange('ring')} />
                    <label htmlFor="rings">Rings</label>
                </div>
                <div className="filter-item">
                    <input type="checkbox" id="necklaces" checked={activeCategories.includes('necklace')} onChange={() => handleCategoryChange('necklace')} />
                    <label htmlFor="necklaces">Necklaces</label>
                </div>
                <div className="filter-item">
                    <input type="checkbox" id="earrings" checked={activeCategories.includes('earring')} onChange={() => handleCategoryChange('earring')} />
                    <label htmlFor="earrings">Earrings</label>
                </div>
                <div className="filter-item">
                    <input type="checkbox" id="bracelets" checked={activeCategories.includes('bracelet')} onChange={() => handleCategoryChange('bracelet')} />
                    <label htmlFor="bracelets">Bracelets</label>
                </div>
            </div>

            <div className="filter-group">
                <h3>Price Range</h3>
                <div className="filter-item"><input type="checkbox" id="price1" checked={activePrices.includes('under-500')} onChange={() => handlePriceChange('under-500')} /><label htmlFor="price1">Under €500</label></div>
                <div className="filter-item"><input type="checkbox" id="price2" checked={activePrices.includes('500-1000')} onChange={() => handlePriceChange('500-1000')} /><label htmlFor="price2">€500 - €1,000</label></div>
                <div className="filter-item"><input type="checkbox" id="price3" checked={activePrices.includes('1000-5000')} onChange={() => handlePriceChange('1000-5000')} /><label htmlFor="price3">€1,000 - €5,000</label></div>
                <div className="filter-item"><input type="checkbox" id="price4" checked={activePrices.includes('over-5000')} onChange={() => handlePriceChange('over-5000')} /><label htmlFor="price4">€5,000+</label></div>
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
            <span className="results-count">Showing <strong>{displayProducts.length}</strong> products</span>
            <select className="sort-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
            </select>
          </div>
          
          <div className="product-grid">
            {displayProducts.map((product, idx) => (
                <Link to={`/product/${product.id}`} className="product-card" key={idx} style={{ textDecoration: 'none', color: 'inherit', background: 'var(--color-surface)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative', display: 'block' }}>
                    <div className="product-image" style={{ height: '300px', backgroundColor: '#f9f9f9' }}>
                        <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {product.badge && (
                            <span className="product-badge" style={{ position: 'absolute', top: '15px', left: '15px', background: '#000', color: '#fff', fontSize: '10px', padding: '4px 8px', borderRadius: '3px', fontWeight: '600', textTransform: 'uppercase' }}>
                                {product.badge}
                            </span>
                        )}
                        <div className="product-actions">
                            <button 
                                className="action-btn" 
                                title="Add to Wishlist"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}
                            >
                                ♡
                            </button>
                        </div>
                    </div>
                    <div className="product-info" style={{ padding: '20px' }}>
                        <div className="category" style={{ fontSize: '12px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                            {product.category}
                        </div>
                        <div className="product-name" style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>{product.name}</div>
                        <div className="product-price" style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary)' }}>
                            €{product.price.toLocaleString()}
                        </div>
                        <div className="product-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                            <button 
                              className="add-to-cart-btn" 
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                              style={{ flex: 1, padding: '10px', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Add to Bag
                            </button>
                            <button 
                              className="wishlist-btn" 
                              title="Add to Wishlist"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}
                              style={{ width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', color: 'var(--color-text)' }}>
                              ♡
                            </button>
                        </div>
                    </div>
                </Link>
            ))}
          </div>

          <div className="pagination">
              <button 
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                style={currentPage === 1 ? { opacity: 0.5, cursor: 'not-allowed' } : { cursor: 'pointer' }}
              >
                Previous
              </button>
              
              {[1, 2, 3].map(page => (
                <a 
                  href="#" 
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={(e) => goToPage(page, e)}
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  {page}
                </a>
              ))}

              <button 
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === 3}
                style={currentPage === 3 ? { opacity: 0.5, cursor: 'not-allowed' } : { cursor: 'pointer' }}
              >
                Next
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
