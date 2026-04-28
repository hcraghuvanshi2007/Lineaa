import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-grid">

          {/* BRAND */}
          <div className="footer-brand">
            <h3>Linea Jewelry Inc.</h3>
            <p className="tagline">Minimalist jewelry crafted for the modern individual</p>

            <div className="footer-block">
              <strong>Visit Us</strong>
              <p>
                123 Madison Avenue<br />
                New York, NY 10016
              </p>
            </div>

            <div className="footer-block">
              <strong>Contact</strong>
              <p>
                +91 9015XXXXXX<br />
                avancaa@lineajewelry.com
              </p>
            </div>
          </div>

          {/* SHOP */}
          <div className="footer-links">
            <h4>Shop</h4>
            <Link to="/new-in">New In</Link>
            <Link to="/shop?category=rings">Rings</Link>
            <Link to="/shop?category=earrings">Earrings</Link>
            <Link to="/shop?category=bracelets">Bracelets</Link>
            <Link to="/shop?category=necklaces">Necklaces</Link>
          </div>

          {/* SUPPORT */}
          <div className="footer-links">
            <h4>Support</h4>
            <Link to="/about/size-guide">Size Guide</Link>
            <Link to="/about/customer-care">Care Instructions</Link>
            <Link to="/about/customer-care">Returns</Link>
            <Link to="/about/customer-care">Shipping</Link>
            <Link to="/about/customer-care">Contact</Link>
          </div>

          {/* CONNECT */}
          <div className="footer-links">
            <h4>Connect</h4>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">Newsletter</a>
          </div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© 2026 Linea. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
