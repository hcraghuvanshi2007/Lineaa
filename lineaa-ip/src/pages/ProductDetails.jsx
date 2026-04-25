import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ProductDetails.css';

// Mock DB imported globally from the assets the site already uses
import pantheonImg from '../assets/images/pantheon-ChbEbbTu.jpg';
import eclipseImg from '../assets/images/eclipse-ErA5xE4T.jpg';
import haloImg from '../assets/images/halo-CMlMG7vQ.jpg';
import obliqueImg from '../assets/images/oblique-BrLAWbgb.jpg';
import shadowlineImg from '../assets/images/shadowline-DPSA61jB.jpg';

const productsDB = [
  { id: '1', name: 'Pantheon', badge: 'NEW', category: 'Earrings', price: 2850, img: pantheonImg, desc: 'Elegantly crafted earrings designed for premium aesthetic.' },
  { id: '2', name: 'Eclipse', badge: 'EXCLUSIVE', category: 'Bracelets', price: 3200, img: eclipseImg, desc: 'A stunning link bracelet offering minimalist perfection.' },
  { id: '3', name: 'Halo', badge: 'NEW', category: 'Earrings', price: 1950, img: haloImg, desc: 'Contemporary double-hoop design bringing elegance to any evening out.' },
  { id: '4', name: 'Oblique', badge: 'COMING SOON', category: 'Earrings', price: 1790, img: obliqueImg, desc: 'Geometric angular earrings bringing sharp contrast and luxury.' },
  { id: '5', name: 'Shadow Line', badge: 'EXCLUSIVE', category: 'Bracelets', price: 2340, img: shadowlineImg, desc: 'Minimalist shadow aesthetics bound with delicate silver rings.' },
];

function ProductDetails({ addToCart, addToWishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Scroll to top immediately when landing on a product details page
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // In a real app, this would be an API call fetching item by ID. 
    // Here we query our simulated global DB wrapper.
    const found = productsDB.find(p => p.id === id);
    setProduct(found || productsDB[0]); 
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
            <p>{product.desc}</p>
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
