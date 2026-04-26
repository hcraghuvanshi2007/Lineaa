import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar({ onOpenPanel }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navRight}>
          <div className={styles.navbarLogo}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              LINEA
            </Link>
          </div>

          <div className={styles.navbarMenu}>
            <div className={styles.navDropdown}>
              <Link to="/shop" className={styles.dropdownToggle}>Shop</Link>
              <div className={styles.dropdownMenu}>
                <Link to="/shop?category=rings" className={styles.dropdownItem}>Rings</Link>
                <Link to="/shop?category=necklaces" className={styles.dropdownItem}>Necklaces</Link>
                <Link to="/shop?category=earrings" className={styles.dropdownItem}>Earrings</Link>
                <Link to="/shop?category=bracelets" className={styles.dropdownItem}>Bracelets</Link>
              </div>
            </div>

            <div className={styles.navDropdown}>
              <Link to="/new-in" className={styles.dropdownToggle}>New In</Link>
              <div className={styles.dropdownMenu}>
                <Link to="/new-in?filter=this-weeks-arrivals" className={styles.dropdownItem}>This Week's Arrivals</Link>
                <Link to="/new-in?filter=spring-collection" className={styles.dropdownItem}>Spring Collection</Link>
                <Link to="/new-in?filter=featured-designers" className={styles.dropdownItem}>Featured Designers</Link>
                <Link to="/new-in?filter=limited-edition" className={styles.dropdownItem}>Limited Edition</Link>
                <Link to="/new-in?filter=pre-orders" className={styles.dropdownItem}>Pre-Orders</Link>
              </div>
            </div>

            <div className={styles.navDropdown}>
              <Link to="/about" className={styles.dropdownToggle}>About</Link>
              <div className={styles.dropdownMenu}>
                <Link to="/about/story" className={styles.dropdownItem}>Our Story</Link>
                <Link to="/about/sustainability" className={styles.dropdownItem}>Sustainability</Link>
                <Link to="/about/size-guide" className={styles.dropdownItem}>Size Guide</Link>
                <Link to="/about/customer-care" className={styles.dropdownItem}>Customer Care</Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.navbarIcons}>
          <button className={styles.iconBtn} aria-label="Search" id="search-btn" onClick={() => onOpenPanel('search')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="User Account" id="account-btn" onClick={() => onOpenPanel('account')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Wishlist" id="wishlist-btn" onClick={() => onOpenPanel('wishlist')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Shopping Cart" id="cart-btn" onClick={() => onOpenPanel('cart')}>
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
