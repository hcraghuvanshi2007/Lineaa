# LINEA – Minimalist Jewelry Landing Page

A modern, fully responsive landing page for a fictional jewelry brand **LINEA**. The page showcases minimalist jewelry collections with a clean aesthetic, smooth interactions, and a focus on user experience through favorites and shopping cart functionality.

---

## 🌐 Live Preview
## Click the (Live Demo) button to see the Live Web Page  **=> [![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://hcraghuvanshi2007.github.io/Lineaa/) <=**


---

## ✨ Key Features

### 🎨 Design & Layout
- **Modern hero section** with compelling headline: "Timeless Elegance"
- **Featured collections grid** showcasing Rings, Earrings, Necklaces, and more
- **Sticky navigation bar** with dropdowns for Shop, New In, and About
- **Search, account, wishlist, and cart icons** in the header for quick access
- **Clean, minimal color palette** inspired by contemporary jewelry design
- **Responsive grid layout** that adapts to different screen sizes

### 🛍️ Shopping Features
- **Favorites/Wishlist panel** (toggle-able sidebar)
  - View saved items with images and prices
  - Empty-state message when no favorites
  - Quick access from navbar icon
  
- **Shopping cart panel** (toggle-able sidebar)
  - Display cart items with quantities
  - Shows subtotal and total pricing
  - Remove items functionality
  - Empty-state message when cart is empty
  - Quantity adjustment buttons (+ / −)

### 🎯 User Interaction
- **Dynamic data rendering** using vanilla JavaScript
- **Smooth panel transitions** for cart and favorites
- **Interactive buttons** for adding/removing items
- **Real-time calculation** of totals and subtotals

### 📱 Responsive Design
- Mobile-first approach
- Flexbox-based layout system
- Optimized for all screen sizes (mobile, tablet, desktop)
- Touch-friendly interface elements

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic structure & accessibility |
| **CSS3** | Styling, layout (flexbox), custom properties, animations |
| **Vanilla JavaScript** | Data rendering, UI interactions, cart management |

**No dependencies or frameworks** – built with core web technologies for maximum compatibility and learning value.

---

## 📂 Project Structure

```
linea-jewelry/
├── index.html              # Main application file (HTML + CSS + JS)
├── README.md               # Project documentation
```

All HTML, CSS, and JavaScript are contained in a single `index.html` file for easy deployment and simplicity.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/linea-jewelry.git
cd linea-jewelry
```

### 2. Start a Local Development Server

Choose your preferred method:

**Option A: Python**
```bash
python -m http.server 8000
```

**Option B: Node.js (http-server)**
```bash
npm install -g http-server
http-server
```

**Option C: VS Code Live Server**
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### 3. Open in Browser

Navigate to `http://localhost:8000` (or your server's address)

---

## 🧩 How It Works

### Navbar & Navigation
- Sticky positioning keeps the navbar visible while scrolling
- Dropdown menus for product categories
- Icons for search, account, wishlist, and cart in the top-right

### Hero Section
- Full-width banner with compelling headline
- Subtext describing the brand value proposition
- Smooth gradient background for visual appeal

### Product Collections
- Grid layout displaying product categories (Earrings, Necklaces, Rings, Bracelets)
- High-quality images from Unsplash
- Hover effects and transitions for interactivity

### Favorites System
```javascript
// Example: Favorites data structure
const favoritesData = [
    { id: 1, name: "Silver Ring", type: "Ring", price: 149, image: "..." },
    { id: 2, name: "Gold Necklace", type: "Necklace", price: 249, image: "..." }
];
```

### Cart System
```javascript
// Example: Cart data structure
const cartData = [
    { id: 1, name: "Minimalist Earrings", type: "Earrings", price: 89, qty: 2, image: "..." },
    { id: 2, name: "Chain Bracelet", type: "Bracelet", price: 129, qty: 1, image: "..." }
];

// Dynamic total calculation
const total = cartData.reduce((sum, item) => sum + (item.price * item.qty), 0);
```

### Footer
- Company information (address, contact, email)
- Organized link sections: Shop, Support, Connect
- Social media links (Instagram, Pinterest)
- Copyright notice

---

## 🎨 Customization Guide

### Change Brand Colors

Edit the CSS variables at the top of `<style>` tag in `index.html`:

```css
:root {
    --color-primary: #218080;           /* Main brand color */
    --color-primary-hover: #1a7472;     /* Hover state */
    --color-primary-active: #1a6873;    /* Active state */
    --color-text: #133435;              /* Primary text */
    --color-text-secondary: #626C7C;    /* Secondary text */
    --color-surface: #FFFDF9;           /* Card/surface backgrounds */
    --color-background: #FCFCF9;        /* Page background */
    --color-border: #E0D8CE;            /* Borders */
    --color-secondary: rgba(33, 128, 141, 0.12);
    --color-orange-500: #A84B2F;
}
```

### Update Product Images

Replace Unsplash URLs with your own images:

```javascript
const products = [
    {
        name: "Your Product Name",
        image: "https://your-image-url.jpg",
        category: "Rings"
    }
];
```

### Modify Collection Data

Edit the `collectionsData` array in the JavaScript section to add or remove product categories.

### Change Company Details

Update the footer section with your actual business information:

```html
<div class="footer-section">
    <h4>Visit Us</h4>
    <p>Your Address Here</p>
    <p>City, State ZIP Code</p>
</div>
```

---

## 📊 Performance Considerations

- **Single-file architecture** = minimal HTTP requests
- **CSS custom properties** = easy theming without recompilation
- **Vanilla JS** = no framework overhead
- **Image optimization** = using responsive image URLs (Unsplash)

For production:
- Minify CSS and JavaScript
- Optimize images (WebP format, proper sizing)
- Add service workers for offline capability
- Implement lazy loading for images

---

## 🔄 Possible Enhancements

### Phase 1: Core Features
- [ ] Add "Add to Cart" buttons for each product
- [ ] Implement persistent storage using `localStorage`
- [ ] Create product detail pages with full descriptions
- [ ] Add product filtering and search functionality

### Phase 2: Backend Integration
- [ ] Connect to a backend API (Node.js + Express, Firebase, etc.)
- [ ] Implement user authentication and accounts
- [ ] Add payment processing (Stripe, PayPal)
- [ ] Create admin dashboard for inventory management

### Phase 3: Advanced Features
- [ ] Dark mode toggle
- [ ] Product recommendations based on browsing history
- [ ] Customer reviews and ratings
- [ ] Inventory management system
- [ ] Order tracking and history

### Phase 4: Deployment
- [ ] Deploy to GitHub Pages, Netlify, or Vercel
- [ ] Set up continuous deployment (CI/CD)
- [ ] Implement analytics (Google Analytics)
- [ ] Add email marketing integration

---

## 🐛 Troubleshooting

### Images not loading?
- Check your internet connection (images are loaded from Unsplash CDN)
- Replace URLs with local image paths if needed

### Cart/Favorites data not persisting?
- Currently stored in JavaScript memory only
- Implement `localStorage` to persist across sessions:

```javascript
// Save to localStorage
localStorage.setItem('cartData', JSON.stringify(cartData));

// Load from localStorage
const savedCart = JSON.parse(localStorage.getItem('cartData') || '[]');
```

### Navbar dropdowns not working?
- Ensure JavaScript is enabled in your browser
- Check browser console for any JavaScript errors

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature: description of what you added"
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Include screenshots if UI changes are made

### Code Style Guidelines
- Use semantic HTML elements
- Write CSS with mobile-first approach
- Keep JavaScript functions small and focused
- Add comments for complex logic
- Follow consistent naming conventions (kebab-case for CSS, camelCase for JS)

---

## 📜 License

This project is provided as-is for **educational and portfolio purposes**.

You are free to:
- ✅ Use this project as a learning resource
- ✅ Modify and adapt for your own projects
- ✅ Include in your portfolio

You should:
- ⚠️ Replace brand name, copy, and images for commercial use
- ⚠️ Credit the original project if you use it publicly
- ⚠️ Not use for commercial purposes without modification

For commercial licensing or inquiries, please contact the project maintainer.

---

## 👨‍💻 Author

**Harshit**  
- 📚 B.Tech CSE (Data Science) – First Year
- 💻 Full-Stack Web Developer & Competitive Hackathon Participant
- 🎯 Passionate about building scalable web applications and exploring cloud engineering
- 📍 Location: Delhi, India

### Connect With Me
- **Email:** hcraghuvanshi2007@gmail.com

---

## 🙏 Acknowledgments

- **Design Inspiration:** Modern minimalist e-commerce platforms
- **Images:** [Unsplash](https://unsplash.com) – Free high-quality photography
- **Typography:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Community:** Thanks to all contributors and supporters

---

## 📝 Changelog

### Version 1.0.0 (January 2026)
- Initial release
- Implemented hero section and product collections
- Added favorites and cart functionality
- Responsive design for all devices
- Footer with organized navigation

---

## 📞 Support

If you have questions or need help:

1. **Check the Documentation** – Review this README and code comments
2. **Search Issues** – Look for similar problems on GitHub Issues
3. **Create an Issue** – Open a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
4. **Contact the Author** – Reach out via email or LinkedIn

---

## 🌟 Show Your Support

If you find this project helpful, please:
- ⭐ Star this repository
- 🍴 Fork it and make it your own
- 📢 Share it with others
- 💬 Provide feedback and suggestions

---

**Made with ❤️ by Himanchal**

Last Updated: January 5, 2026

