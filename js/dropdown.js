/* ============================================
   DROPDOWN.JS - Dropdown Menu Functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initializeDropdowns();
    initializeCategoryPage();
});

/* ============================================
   Initialize Dropdown Menus
   ============================================ */

function initializeDropdowns() {
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    navDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            // Prevent default link behavior
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                toggleDropdown(dropdown, menu);
            });
            
            // Close dropdown when item is clicked
            const items = menu.querySelectorAll('.dropdown-item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    closeDropdown(dropdown, menu);
                });
            });
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            closeAllDropdowns();
        }
    });
}

function toggleDropdown(dropdown, menu) {
    const isOpen = menu.classList.contains('active');
    closeAllDropdowns();
    
    if (!isOpen) {
        menu.classList.add('active');
    }
}

function closeDropdown(dropdown, menu) {
    menu.classList.remove('active');
}

function closeAllDropdowns() {
    const allMenus = document.querySelectorAll('.dropdown-menu');
    allMenus.forEach(menu => {
        menu.classList.remove('active');
    });
}

/* ============================================
   Category Page Functionality
   ============================================ */

function initializeCategoryPage() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const filter = urlParams.get('filter');
    const section = urlParams.get('section');
    
    // Update breadcrumb if on category page
    if (category || filter || section) {
        updateBreadcrumb(category || filter || section);
        updatePageContent(category, filter, section);
    }
}

function updateBreadcrumb(page) {
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    
    if (breadcrumbContainer && breadcrumbCurrent) {
        breadcrumbContainer.style.display = 'block';
        breadcrumbCurrent.textContent = formatCategoryName(page);
    }
}

function updatePageContent(category, filter, section) {
    const mainContent = document.querySelector('.main-content');
    
    if (!mainContent) return;
    
    // Hide hero and category sections
    const heroSection = mainContent.querySelector('.hero-section');
    const categoriesSection = mainContent.querySelector('.categories-section');
    const storySectionSect = mainContent.querySelector('.story-section');
    
    if (heroSection) heroSection.style.display = 'none';
    if (categoriesSection) categoriesSection.style.display = 'none';
    if (storySectionSect) storySectionSect.style.display = 'none';
    
    // Create shop layout if not exists
    if (!mainContent.querySelector('.shop-layout')) {
        createShopLayout(mainContent, category || filter || section);
    }
}

function createShopLayout(mainContent, page) {
    const productsSection = mainContent.querySelector('.products-section');
    
    if (!productsSection) return;
    
    // Create shop wrapper
    const shopWrapper = document.createElement('div');
    shopWrapper.className = 'shop-layout';
    shopWrapper.innerHTML = `
        <div class="container">
            <div class="shop-container">
                <!-- Sidebar Filters -->
                <aside class="shop-sidebar">
                    <div class="filter-section">
                        <h3 class="filter-title">Category</h3>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-rings" value="rings">
                            <label for="filter-rings">Rings</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-earrings" value="earrings">
                            <label for="filter-earrings">Earrings</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-bracelets" value="bracelets">
                            <label for="filter-bracelets">Bracelets</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-necklaces" value="necklaces">
                            <label for="filter-necklaces">Necklaces</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-watches" value="watches">
                            <label for="filter-watches">Watches</label>
                        </div>
                    </div>
                    
                    <div class="filter-section">
                        <h3 class="filter-title">Price Range</h3>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-price-0" value="0-500">
                            <label for="filter-price-0">€0 - €500</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-price-1" value="500-1500">
                            <label for="filter-price-1">€500 - €1,500</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-price-2" value="1500-3000">
                            <label for="filter-price-2">€1,500 - €3,000</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" id="filter-price-3" value="3000+">
                            <label for="filter-price-3">€3,000+</label>
                        </div>
                    </div>
                </aside>
                
                <!-- Main Content -->
                <div class="shop-main">
                    <div class="shop-header">
                        <h1 class="shop-title">${formatCategoryName(page)}</h1>
                        <div class="shop-controls">
                            <span class="shop-info">24 items</span>
                            <select class="sort-select" id="sort-select">
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="shop-products" id="products-container">
                        <!-- Products will be loaded here -->
                        <div class="product-card">
                            <div class="product-image" style="background-image: url('assets/images/product-1.jpg')">
                                <div class="product-overlay"></div>
                                <button class="product-add-btn">Add to Cart</button>
                            </div>
                            <div class="product-info">
                                <h4 class="product-name">Pantheon</h4>
                                <p class="product-category">Earrings</p>
                                <p class="product-price">€2,850</p>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image" style="background-image: url('assets/images/product-2.jpg')">
                                <div class="product-overlay"></div>
                                <button class="product-add-btn">Add to Cart</button>
                            </div>
                            <div class="product-info">
                                <h4 class="product-name">Eclipse</h4>
                                <p class="product-category">Bracelets</p>
                                <p class="product-price">€3,200</p>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image" style="background-image: url('assets/images/product-3.jpg')">
                                <div class="product-overlay"></div>
                                <button class="product-add-btn">Add to Cart</button>
                            </div>
                            <div class="product-info">
                                <h4 class="product-name">Halo</h4>
                                <p class="product-category">Earrings</p>
                                <p class="product-price">€1,950</p>
                            </div>
                        </div>
                        
                        <div class="product-card">
                            <div class="product-image" style="background-image: url('assets/images/product-4.jpg')">
                                <div class="product-overlay"></div>
                                <button class="product-add-btn">Add to Cart</button>
                            </div>
                            <div class="product-info">
                                <h4 class="product-name">Oblique</h4>
                                <p class="product-category">Earrings</p>
                                <p class="product-price">€1,650</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Pagination -->
                    <div class="pagination">
                        <button class="pagination-btn">←</button>
                        <button class="pagination-btn active">1</button>
                        <button class="pagination-btn">2</button>
                        <button class="pagination-btn">3</button>
                        <span class="pagination-info">...</span>
                        <button class="pagination-btn">8</button>
                        <button class="pagination-btn">→</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Replace products section with shop layout
    productsSection.replaceWith(shopWrapper);
}

function formatCategoryName(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/* ============================================
   Filter and Sort Functionality
   ============================================ */

function initializeFilters() {
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const sortSelect = document.getElementById('sort-select');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            applyFilters();
        });
    });
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            applySorting(sortSelect.value);
        });
    }
}

function applyFilters() {
    // Get selected filters
    const selectedFilters = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        selectedFilters.push(checkbox.value);
    });
    
    console.log('Applied filters:', selectedFilters);
    // Add your filter logic here
}

function applySorting(sortType) {
    console.log('Applied sorting:', sortType);
    // Add your sorting logic here
}