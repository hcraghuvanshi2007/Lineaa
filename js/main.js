/* ============================================
   MAIN.JS - Initialize Application
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('LINEA Website Initialized');
    
    // Initialize all modules
    initializeNavbar();
    initializeHero();
    initializeProducts();
});

/* ============================================
   NAVBAR.JS - Navigation Interactions
   ============================================ */

function initializeNavbar() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const searchBtn = document.getElementById('search-btn');
    const userBtn = document.getElementById('user-btn');
    const heartBtn = document.getElementById('heart-btn');
    const cartBtn = document.getElementById('cart-btn');
    
    // Mobile Menu Toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Icon Button Actions (Add your feature functionality later)
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            console.log('Search clicked - Add search modal later');
        });
    }
    
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            console.log('User clicked - Add login/account modal later');
        });
    }
    
    if (heartBtn) {
        heartBtn.addEventListener('click', () => {
            console.log('Wishlist clicked - Add wishlist modal later');
        });
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            console.log('Cart clicked - Add cart modal later');
        });
    }
}

function toggleMobileMenu() {
    const navbarLeft = document.querySelector('.navbar-left');
    if (navbarLeft) {
        navbarLeft.classList.toggle('active');
    }
}

/* ============================================
   HERO.JS - Hero Section & Carousel
   ============================================ */

function initializeHero() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    // Add click events to carousel dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto-rotate carousel every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }, 5000);
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    function updateCarousel() {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }
}

/* ============================================
   PRODUCTS.JS - Product Interactions
   ============================================ */

function initializeProducts() {
    const productAddBtns = document.querySelectorAll('.product-add-btn');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    productAddBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart(btn);
        });
    });
    
    function addToCart(btn) {
        // Get product information
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        // Increment cart count
        cartItems++;
        if (cartCount) {
            cartCount.textContent = cartItems;
        }
        
        // Visual feedback
        btn.textContent = 'Added!';
        btn.style.backgroundColor = '#d4af37';
        btn.style.color = '#1a1a1a';
        
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.style.backgroundColor = '';
            btn.style.color = '';
        }, 2000);
        
        console.log(`Added ${productName} to cart. Total items: ${cartItems}`);
        
        // Add your cart logic here later
    }
}

/* ============================================
   SMOOTH SCROLL BEHAVIOR
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ============================================
   INTERSECTION OBSERVER FOR LAZY LOADING
   ============================================ */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all product cards and category cards
document.querySelectorAll('.product-card, .category-card').forEach(el => {
    observer.observe(el);
});

/* ============================================
   READY FOR FUTURE FEATURES
   ============================================ 
   
   Add later:
   - Search functionality
   - User authentication
   - Wishlist management
   - Shopping cart logic
   - Product filtering
   - Form validation
   - More animations and hover effects
   
============================================ */