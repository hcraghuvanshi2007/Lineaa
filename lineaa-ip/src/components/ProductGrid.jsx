import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { allProducts as products } from '../data/products';

const ProductCard = React.memo(({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="product-image">
        {product.badge && <span className="badge">{product.badge}</span>}
        <img src={product.imgMain} className="img-main" alt={product.name} />
        <img src={product.imgHover} className="img-hover" alt={`${product.name} Hover`} />
      </div>
      <div className="product-info">
        <p className="category">{product.category}</p>
        <div className="info-row">
          <h3>{product.name}</h3>
          <span>€{product.price.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  );
});

function ProductGrid() {
  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <section className="product-section">
      <div className="product-grid">
        {products.slice(0, visibleCount).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {visibleCount < products.length && (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button 
            className="login-btn" 
            onClick={loadMore}
            style={{ width: 'auto', padding: '15px 50px', letterSpacing: '2px' }}
          >
            DISCOVER MORE
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
