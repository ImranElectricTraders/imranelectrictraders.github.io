/**
 * Global Cart Logic for Imran Electric Traders
 * Handles: Persistence, Modal Injection, Add/Remove/Update, WhatsApp Integration
 */

// --- Constants ---
const CART_STORAGE_KEY = 'ie_cart';
const WHATSAPP_NUMBER = '923134556240';

// --- State ---
let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Cart HTML if not present
    if (!document.getElementById('cartModal')) {
        injectCartHTML();
    }

    // 2. Update UI Counts
    updateCartUI();

    // 3. Expose functions globally
    window.openCart = openCart;
    window.closeCart = closeCart;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateCartItemQty = updateCartItemQty;
    window.sendToWhatsapp = sendToWhatsapp;
    window.clearCart = clearCart;
});

// --- Core Logic ---

function saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    // Update all counters on the page
    const counters = document.querySelectorAll('#cartCount, .cart-count');
    counters.forEach(el => el.innerText = cart.reduce((acc, item) => acc + item.qty, 0));
}

/**
 * Add Item to Cart
 * @param {Object} product - { name, brand, category, price, image, qty, desc }
 * @param {HTMLElement} [sourceElement] - The button clicked (for animation)
 */
function addToCart(product, sourceElement) {
    // Validate
    if (!product.qty || product.qty < 1) product.qty = 1;

    // Check existing
    const existingIndex = cart.findIndex(item => item.name === product.name && item.category === product.category);

    if (existingIndex > -1) {
        cart[existingIndex].qty += product.qty;
    } else {
        // Ensure price is stored
        cart.push(product);
    }

    saveCart();

    // Animation
    if (sourceElement) {
        animateFlyToCart(sourceElement);
    }
}


function animateFlyToCart(sourceBtn) {
    // 1. Get Coordinates
    const btnRect = sourceBtn.getBoundingClientRect();
    const cartBtn = document.querySelector('.cart-btn-container');

    if (!cartBtn) return;

    const cartRect = cartBtn.getBoundingClientRect();

    // 2. Create Flying Element
    const flyer = document.createElement('div');
    flyer.classList.add('fly-item');

    // Start Position (Center of Button)
    // Ball is 60px, so offset is 30
    const startX = btnRect.left + btnRect.width / 2 - 30;
    const startY = btnRect.top + btnRect.height / 2 - 30;

    flyer.style.left = `${startX}px`;
    flyer.style.top = `${startY}px`;
    flyer.style.transform = 'scale(0)'; // Start small

    document.body.appendChild(flyer);

    // 3. Animate to Cart
    // Wait for DOM paint
    requestAnimationFrame(() => {
        flyer.style.transform = 'scale(1)'; // Pop up

        setTimeout(() => {
            const destX = cartRect.left + cartRect.width / 2 - 30;
            const destY = cartRect.top + cartRect.height / 2 - 30;

            flyer.style.transform = `translate(${destX - startX}px, ${destY - startY}px) scale(0.2)`;
            flyer.style.opacity = '0.5';
        }, 100);
    });

    // 4. Cleanup & Bump Cart
    setTimeout(() => {
        flyer.remove();
        // Bump Cart Animation
        const icon = cartBtn.querySelector('.cart-btn-icon');
        if (icon) {
            icon.style.transform = "scale(1.4)";
            icon.style.color = "var(--primary-yellow)";
            setTimeout(() => {
                icon.style.transform = "scale(1)";
                icon.style.color = "white";
            }, 200);
        }
    }, 900); // Check CSS transition time
}


function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCartTable();
}

function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        saveCart();
        renderCartTable();
    }
}

function updateCartItemQty(index, change) {
    if (cart[index]) {
        cart[index].qty += change;
        if (cart[index].qty < 1) cart[index].qty = 1; // Min 1
        saveCart();
        renderCartTable(); // Re-render to show new qty
    }
}

// --- Helper: Price Parsing ---
function parsePrice(priceStr) {
    if (!priceStr) return 0;
    // Remove "Rs.", "Rs", whitespace, commas
    // "Rs. 45" -> 45
    // "Rs. 35/yd" -> 35
    // "Contact for Rate" -> NaN
    const cleanStr = priceStr.toString().toLowerCase().replace(/rs\.?|rs/g, '').replace(/,/g, '').trim();
    // Try to extract the first number
    const match = cleanStr.match(/(\d+)/);
    if (match) {
        return parseInt(match[0]);
    }
    return 0; // Fallback for "Contact for Rate"
}

function formatCurrency(amount) {
    return "Rs. " + amount.toLocaleString();
}

// --- UI Rendering ---

function injectCartHTML() {
    const modalHTML = `
    <div class="cart-modal" id="cartModal">
        <div class="cart-content">
            <div class="cart-header">
                <h2>Your Invoice</h2>
                <button class="close-cart-btn" onclick="closeCart()">✕</button>
            </div>
            <div class="cart-body">
                <table class="cart-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th style="width:35%;">Product</th>
                            <th>Rate</th>
                            <th>Qty</th>
                            <th style="text-align:right;">Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="cartTableBody">
                        <!-- Items injected here -->
                    </tbody>
                    <tfoot id="cartTableFoot" style="display:none; border-top: 1px solid #444;">
                         <tr>
                            <td colspan="4" style="text-align:right; font-weight:bold; padding:10px;">Subtotal:</td>
                            <td id="cartSubtotal" style="text-align:right; font-weight:bold; color:white;">Rs. 0</td>
                            <td></td>
                        </tr>
                         <tr>
                            <td colspan="4" style="text-align:right; font-size:0.9rem; padding:5px 10px; color:#aaa;">+ 2% Service Charge:</td>
                            <td id="cartTax" style="text-align:right; font-size:0.9rem; color:#aaa;">Rs. 0</td>
                            <td></td>
                        </tr>
                         <tr>
                            <td colspan="4" style="text-align:right; font-weight:900; font-size:1.2rem; padding:15px 10px; color:var(--primary-yellow);">GRAND TOTAL:</td>
                            <td id="cartGrandTotal" style="text-align:right; font-weight:900; font-size:1.2rem; color:var(--primary-yellow);">Rs. 0</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <div id="emptyCartMsg" style="text-align:center; padding:40px; color:#666; display:none;">
                    <p style="font-size: 1.2rem; margin-bottom: 10px;">Your cart is empty.</p>
                    <button onclick="closeCart()" style="padding:10px 20px; border:1px solid #444; background:none; color:white; cursor:pointer;">Continue Browsing</button>
                </div>
            </div>
            <div class="cart-footer">
                <div>
                     <button onclick="clearCart()" style="font-size:0.8rem; color:#666; background:none; border:none; text-decoration:underline; cursor:pointer;">Clear All</button>
                </div>
                <button class="whatsapp-btn" onclick="sendToWhatsapp()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Confirm Order & Send Bill
                </button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openCart() {
    renderCartTable();
    document.getElementById('cartModal').classList.add('active');
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

function renderCartTable() {
    const tbody = document.getElementById('cartTableBody');
    const tfoot = document.getElementById('cartTableFoot'); // Footer for totals
    const emptyMsg = document.getElementById('emptyCartMsg');
    const table = document.querySelector('.cart-table');

    // Totals Elements
    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const grandTotalEl = document.getElementById('cartGrandTotal');


    tbody.innerHTML = '';

    if (cart.length === 0) {
        table.style.display = 'none';
        emptyMsg.style.display = 'block';
        return;
    } else {
        table.style.display = 'table';
        emptyMsg.style.display = 'none';
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        // Calculations
        const parsedPrice = parsePrice(item.price);
        const itemTotal = parsedPrice * item.qty;

        if (parsedPrice > 0) {
            subtotal += itemTotal;
        }

        const tr = document.createElement('tr');
        tr.className = 'cart-item-row';

        // Display Text
        const rateText = parsedPrice > 0 ? formatCurrency(parsedPrice) : "<span style='font-size:0.8rem; color:#aaa;'>TBD</span>";
        const totalText = parsedPrice > 0 ? formatCurrency(itemTotal) : "-";

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <div style="font-weight:bold; color:white;">${item.name}</div>
                <div style="font-size:0.8rem; color:#888;">${item.brand || ''}</div>
            </td>
            <td>${rateText}</td>
            <td>
                <div class="cart-qty-control">
                    <button class="qty-btn-mini" onclick="updateCartItemQty(${index}, -1)">-</button>
                    <span style="font-weight:bold; min-width:20px; text-align:center;">${item.qty}</span>
                    <button class="qty-btn-mini" onclick="updateCartItemQty(${index}, 1)">+</button>
                </div>
            </td>
             <td style="text-align:right; color:white;">${totalText}</td>
            <td>
                <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Footer Totals
    const tax = Math.round(subtotal * 0.02);
    const grandTotal = subtotal + tax;

    subtotalEl.innerText = formatCurrency(subtotal);
    taxEl.innerText = formatCurrency(tax);
    grandTotalEl.innerText = formatCurrency(grandTotal);

    if (tfoot) tfoot.style.display = 'table-footer-group';
}

// --- WhatsApp Invoice Logic ---

function sendToWhatsapp() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // 1. Get Date/Time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // 2. Calculations
    let subtotal = 0;

    // 3. Build Invoice Message
    // 🌟 Using emojis and cleaner spacing for a premium feel
    let message = `🌟 *ORDER INVOICE - IMRAN ELECTRIC TRADERS* 🌟\n`;
    message += `📅 *Date:* ${dateStr} at ${timeStr}\n`;
    message += `──────────────────────\n\n`;
    message += `*🛒 ORDER DETAILS:*\n\n`;

    cart.forEach((item, index) => {
        const parsedPrice = parsePrice(item.price);
        const itemTotal = parsedPrice * item.qty;

        if (parsedPrice > 0) subtotal += itemTotal;

        const rateStr = parsedPrice > 0 ? `Rs. ${parsedPrice.toLocaleString()}` : 'TBD';
        const totalStr = parsedPrice > 0 ? `Rs. ${itemTotal.toLocaleString()}` : '-';

        message += `*${index + 1}. ${item.name}* (${item.brand})\n`;
        message += `   ▫️ Price: ${rateStr}\n`;
        message += `   ▫️ Qty: ${item.qty}   ➡   *${totalStr}*\n\n`;
    });

    const tax = Math.round(subtotal * 0.02);
    const grandTotal = subtotal + tax;

    message += `──────────────────────\n`;
    message += `💰 *Subtotal:*       Rs. ${subtotal.toLocaleString()}\n`;
    message += `🔧 *Service (2%):*   Rs. ${tax.toLocaleString()}\n`;
    message += `──────────────────────\n`;
    message += `✅ *GRAND TOTAL:   Rs. ${grandTotal.toLocaleString()}*\n`;
    message += `──────────────────────\n\n`;

    message += `📝 *Customer Note:*\n"Assalam-o-Alaikum, kindly confirm this order and delivery time."\n\n`;
    message += `📍 *Sent from Website*`;

    // 4. Send
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}
