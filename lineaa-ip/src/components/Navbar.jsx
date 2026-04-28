import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

function Navbar({ onOpenPanel }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    console.log(`Toggling ${dropdownName} dropdown`);
    setOpenDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  // Close menu/dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    // Add listener when menu OR dropdown is open
    if (isMenuOpen || openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMenuOpen, openDropdown]);

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.navbarContainer}>
        <div className={styles.navRight}>
          <div className={styles.navbarLogo}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              LINEA
            </Link>
          </div>

          <div className={`${styles.navbarMenu} ${isMenuOpen ? styles.menuOpen : ''}`}>
            <div className={styles.navDropdown}>
              <button
                className={styles.dropdownToggle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('shop');
                }}
              >
                Shop
              </button>
              <div className={`${styles.dropdownMenu} ${openDropdown === 'shop' ? styles.active : ''}`}>
                <Link to="/shop" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>All Products</Link>
                <hr style={{ margin: '5px 0', border: 'none', borderTop: '1px solid var(--color-border)' }} />
                <Link to="/shop?category=rings" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Rings</Link>
                <Link to="/shop?category=necklaces" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Necklaces</Link>
                <Link to="/shop?category=earrings" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Earrings</Link>
                <Link to="/shop?category=bracelets" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Bracelets</Link>
              </div>
            </div>

            <div className={styles.navDropdown}>
              <button
                className={styles.dropdownToggle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('newin');
                }}
              >
                New In
              </button>
              <div className={`${styles.dropdownMenu} ${openDropdown === 'newin' ? styles.active : ''}`}>
                <Link to="/new-in" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>All New In</Link>
                <hr style={{ margin: '5px 0', border: 'none', borderTop: '1px solid var(--color-border)' }} />
                <Link to="/new-in?filter=this-weeks-arrivals" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>This Week's Arrivals</Link>
                <Link to="/new-in?filter=spring-collection" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Spring Collection</Link>
                <Link to="/new-in?filter=featured-designers" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Featured Designers</Link>
                <Link to="/new-in?filter=limited-edition" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Limited Edition</Link>
                <Link to="/new-in?filter=pre-orders" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Pre-Orders</Link>
              </div>
            </div>

            <div className={styles.navDropdown}>
              <button
                className={styles.dropdownToggle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown('about');
                }}
              >
                About
              </button>
              <div className={`${styles.dropdownMenu} ${openDropdown === 'about' ? styles.active : ''}`}>
                <Link to="/about" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>About Us</Link>
                <hr style={{ margin: '5px 0', border: 'none', borderTop: '1px solid var(--color-border)' }} />
                <Link to="/about/story" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Our Story</Link>
                <Link to="/about/sustainability" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Sustainability</Link>
                <Link to="/about/size-guide" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Size Guide</Link>
                <Link to="/about/customer-care" className={styles.dropdownItem} onClick={() => {
                  setOpenDropdown(null);
                  closeMenu();
                }}>Customer Care</Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.navbarIcons}>
          <button 
            className={`${styles.iconBtn} ${styles.menuToggle}`}
            aria-label="Menu" 
            id="menu-btn" 
            onClick={toggleMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
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
