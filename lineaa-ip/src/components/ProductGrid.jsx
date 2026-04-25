import pantheonImg from '../assets/images/pantheon-ChbEbbTu.jpg';
import organicEarringImg from '../assets/images/organic-earring-BV1LtJhH.png';
import eclipseImg from '../assets/images/eclipse-ErA5xE4T.jpg';
import linkBraceletImg from '../assets/images/link-bracelet-CMFM2KKw.png';
import haloImg from '../assets/images/halo-CMlMG7vQ.jpg';

const products = [
  {
    id: 1,
    badge: 'NEW',
    imgMain: pantheonImg,
    imgHover: organicEarringImg,
    category: 'Earrings',
    name: 'Pantheon',
    price: '€2,850',
  },
  {
    id: 2,
    badge: null,
    imgMain: eclipseImg,
    imgHover: linkBraceletImg,
    category: 'Bracelets',
    name: 'Eclipse',
    price: '€3,200',
  },
  {
    id: 3,
    badge: 'NEW',
    imgMain: haloImg,
    imgHover: organicEarringImg,
    category: 'Earrings',
    name: 'Halo',
    price: '€1,950',
  },
];

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image">
        {product.badge && <span className="badge">{product.badge}</span>}
        <img src={product.imgMain} className="img-main" alt={product.name} />
        <img src={product.imgHover} className="img-hover" alt={`${product.name} Hover`} />
      </div>
      <div className="product-info">
        <p className="category">{product.category}</p>
        <div className="info-row">
          <h3>{product.name}</h3>
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  return (
    <section className="product-section">
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
