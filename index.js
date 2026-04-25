    // Panel Management
const panels = {
    search: document.getElementById('search-panel'),
    account: document.getElementById('account-panel'),
    wishlist: document.getElementById('wishlist-panel'),
    cart: document.getElementById('cart-panel')
};

const overlay = document.getElementById('panel-overlay');

// Open Panel
function openPanel(panelName) {
    panels[panelName].classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Panel
function closePanel(panelName) {
    panels[panelName].classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close All Panels
function closeAllPanels() {
    Object.keys(panels).forEach(key => {
        panels[key].classList.remove('active');
    });
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Button Event Listeners
document.getElementById('search-btn').addEventListener('click', () => openPanel('search'));
document.getElementById('account-btn').addEventListener('click', () => openPanel('account'));
document.getElementById('wishlist-btn').addEventListener('click', () => openPanel('wishlist'));
document.getElementById('cart-btn').addEventListener('click', () => openPanel('cart'));

// Close on overlay click
overlay.addEventListener('click', closeAllPanels);

// Account tabs
document.querySelectorAll('.account-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        document.querySelectorAll('.account-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(tabName + '-tab').classList.add('active');
    });
});

// Search functionality
document.querySelectorAll('.search-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        document.getElementById('search-input').value = this.textContent;
    });
});

// Sample cart data
const cartData = [
    { id: 1, name: 'Earrings', type: 'Pantheon', price: 2850, qty: 1, image: 'assets/images/pantheon-ChbEbbTu.jpg' },
    { id: 2, name: 'Bracelets', type: 'Eclipse', price: 3200, qty: 1, image: 'assets/images/eclipse-ErA5xE4T.jpg' },
    { id: 3, name: 'Earrings', type: 'Halo', price: 1950, qty: 1, image: 'assets/images/halo-CMlMG7vQ.jpg' }
];

// Update cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const emptyMsg = document.getElementById('cart-empty-msg');
    
    if (cartData.length === 0) {
        cartItemsDiv.innerHTML = '';
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        cartItemsDiv.innerHTML = cartData.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 5px;">${item.type}</div>
                    <div class="cart-item-price">€${item.price.toLocaleString()}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn">−</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn">+</button>
                    </div>
                </div>
                <button class="remove-btn">✕</button>
            </div>
        `).join('');
    }

    // Update summary
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('subtotal').textContent = '€' + subtotal.toLocaleString();
    document.getElementById('total').textContent = '€' + subtotal.toLocaleString();
}

// Initialize cart
updateCartDisplay();
