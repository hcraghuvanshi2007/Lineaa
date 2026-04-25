import { Link } from 'react-router-dom';

function Navbar({ onOpenPanel }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-right">
          <div className="navbar-logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              LINEA
            </Link>
          </div>

          <div className="navbar-menu">
            <div className="nav-dropdown">
              <Link to="/shop" className="dropdown-toggle">Shop</Link>
              <div className="dropdown-menu">
                <Link to="/shop?category=rings" className="dropdown-item">Rings</Link>
                <Link to="/shop?category=necklaces" className="dropdown-item">Necklaces</Link>
                <Link to="/shop?category=earrings" className="dropdown-item">Earrings</Link>
                <Link to="/shop?category=bracelets" className="dropdown-item">Bracelets</Link>
                <Link to="/shop?category=watches" className="dropdown-item">Watches</Link>
              </div>
            </div>

            <div className="nav-dropdown">
              <Link to="/new-in" className="dropdown-toggle">New In</Link>
              <div className="dropdown-menu">
                <Link to="/new-in?filter=this-weeks-arrivals" className="dropdown-item">This Week's Arrivals</Link>
                <Link to="/new-in?filter=spring-collection" className="dropdown-item">Spring Collection</Link>
                <Link to="/new-in?filter=featured-designers" className="dropdown-item">Featured Designers</Link>
                <Link to="/new-in?filter=limited-edition" className="dropdown-item">Limited Edition</Link>
                <Link to="/new-in?filter=pre-orders" className="dropdown-item">Pre-Orders</Link>
              </div>
            </div>

            <div className="nav-dropdown">
              <a href="#" className="dropdown-toggle">About</a>
              <div className="dropdown-menu">
                <Link to="/about/story" className="dropdown-item">Our Story</Link>
                <Link to="/about/sustainability" className="dropdown-item">Sustainability</Link>
                <Link to="/about/size-guide" className="dropdown-item">Size Guide</Link>
                <Link to="/about/customer-care" className="dropdown-item">Customer Care</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-icons">
          <button className="icon-btn" aria-label="Search" id="search-btn" onClick={() => onOpenPanel('search')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <button className="icon-btn" aria-label="User Account" id="account-btn" onClick={() => onOpenPanel('account')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Wishlist" id="wishlist-btn" onClick={() => onOpenPanel('wishlist')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Shopping Cart" id="cart-btn" onClick={() => onOpenPanel('cart')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
