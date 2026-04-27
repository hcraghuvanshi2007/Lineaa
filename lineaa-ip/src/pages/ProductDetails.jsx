import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProductDetails.css';
import { allProducts } from '../data/products';

function ProductDetails({ addToCart, addToWishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Scroll to top immediately when landing on a product details page
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Find product using String comparison
    const found = allProducts.find(p => String(p.id) === String(id));
    if (found) {
      setProduct(found);
      console.log("✅ Product found:", found.name);
    } else {
      console.error("❌ Product not found for ID:", id);
      setProduct(allProducts[0]); // Fallback to first product
    }
  }, [id]);

  if (!product) return <div className="product-details-container"><p>Loading product...</p></div>;

  return (
    <div className="product-details-container">
      <div className="product-details-layout">
        <div className="product-details-image">
          <img src={product.img} alt={product.name} />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>
        
        <div className="product-details-info">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/shop">Shop</Link>
            <span>›</span>
            <span>{product.name}</span>
          </div>

          <h4 className="product-category">{product.category}</h4>
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">€{product.price.toLocaleString()}</p>
          
          <div className="product-description">
            <p>{product.desc || 'Premium jewelry crafted for elegance.'}</p>
          </div>

          <div className="product-perks">
            <ul>
              <li>✓ Free secure shipping</li>
              <li>✓ 30-day return policy</li>
              <li>✓ 2-year quality guarantee</li>
            </ul>
          </div>

          <div className="product-actions-large">
            <button className="add-to-cart-large" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <button className="add-to-wishlist-large" onClick={() => addToWishlist(product)}>
              ♡ Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
