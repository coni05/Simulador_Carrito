// Datos de productos
// Datos de productos con imágenes reales
const productsData = [
    {
        id: 1,
        name: "Laptop Dell Inspiron 15",
        price: 899.99,
        category: "Tecnología",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Mouse Inalámbrico Logitech",
        price: 29.99,
        category: "Tecnología",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Teclado Mecánico RGB",
        price: 79.99,
        category: "Tecnología",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Monitor 27 pulgadas 4K",
        price: 299.99,
        category: "Tecnología",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Auriculares Bluetooth Sony",
        price: 149.99,
        category: "Audio",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Webcam HD 1080p",
        price: 69.99,
        category: "Tecnología",
        image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Disco Duro Externo 1TB",
        price: 89.99,
        category: "Almacenamiento",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "USB 3.0 64GB",
        price: 19.99,
        category: "Almacenamiento",
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQqkLExKfOdKMAkPrn9xTq4I3gItAodnTT9ns5KDKxrXNa6DqxhGjIV6CMbeZzDdhlAsH41QdNhNuCMa5sfHOp1LzKQeD-ue05l2pbomEn9FkQA1ETIYTrY"
    }
];

// Estado de la aplicación
const state = {
    cart: []
};

// Constantes
const TAX_RATE = 0.16;
const STORAGE_KEY = 'shopping_cart';

// ==================== FUNCIONES PURAS ====================

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe
 * @param {Array} cart - Carrito actual
 * @param {Object} product - Producto a agregar
 * @returns {Array} Nuevo carrito actualizado
 */
const addToCart = (cart, product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        return cart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }
    
    return [...cart, { ...product, quantity: 1 }];
};

/**
 * Elimina un producto del carrito
 * @param {Array} cart - Carrito actual
 * @param {number} productId - ID del producto a eliminar
 * @returns {Array} Nuevo carrito sin el producto
 */
const removeFromCart = (cart, productId) => {
    return cart.filter(item => item.id !== productId);
};

/**
 * Actualiza la cantidad de un producto en el carrito
 * @param {Array} cart - Carrito actual
 * @param {number} productId - ID del producto
 * @param {number} quantity - Nueva cantidad
 * @returns {Array} Nuevo carrito actualizado
 */
const updateQuantity = (cart, productId, quantity) => {
    if (quantity <= 0) {
        return removeFromCart(cart, productId);
    }
    
    return cart.map(item =>
        item.id === productId
            ? { ...item, quantity }
            : item
    );
};

/**
 * Incrementa la cantidad de un producto
 * @param {Array} cart - Carrito actual
 * @param {number} productId - ID del producto
 * @returns {Array} Nuevo carrito actualizado
 */
const incrementQuantity = (cart, productId) => {
    return cart.map(item =>
        item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
    );
};

/**
 * Decrementa la cantidad de un producto
 * @param {Array} cart - Carrito actual
 * @param {number} productId - ID del producto
 * @returns {Array} Nuevo carrito actualizado
 */
const decrementQuantity = (cart, productId) => {
    return cart.map(item =>
        item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
    ).filter(item => item.quantity > 0);
};

/**
 * Vacía el carrito completamente
 * @returns {Array} Carrito vacío
 */
const clearCart = () => {
    return [];
};

/**
 * Calcula el subtotal del carrito
 * @param {Array} cart - Carrito actual
 * @returns {number} Subtotal
 */
const calculateSubtotal = (cart) => {
    return cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
};

/**
 * Calcula el impuesto
 * @param {number} subtotal - Subtotal
 * @returns {number} Impuesto
 */
const calculateTax = (subtotal) => {
    return subtotal * TAX_RATE;
};

/**
 * Calcula el total
 * @param {number} subtotal - Subtotal
 * @returns {number} Total
 */
const calculateTotal = (subtotal) => {
    return subtotal + calculateTax(subtotal);
};

/**
 * Obtiene el total de items en el carrito
 * @param {Array} cart - Carrito actual
 * @returns {number} Total de items
 */
const getTotalItems = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Formatea un número como moneda
 * @param {number} amount - Cantidad a formatear
 * @returns {string} Cantidad formateada
 */
const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
};

// ==================== FUNCIONES CON EFECTOS SECUNDARIOS ====================

/**
 * Guarda el carrito en LocalStorage
 */
const saveCartToStorage = () => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
    } catch (error) {
        console.error('Error al guardar en LocalStorage:', error);
    }
};

/**
 * Carga el carrito desde LocalStorage
 */
const loadCartFromStorage = () => {
    try {
        const storedCart = localStorage.getItem(STORAGE_KEY);
        if (storedCart) {
            state.cart = JSON.parse(storedCart);
            return true;
        }
    } catch (error) {
        console.error('Error al cargar desde LocalStorage:', error);
    }
    return false;
};

/**
 * Renderiza la lista de productos en el DOM
 */
const renderProducts = () => {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    productsGrid.innerHTML = productsData.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">${formatCurrency(product.price)}</p>
                <button 
                    class="btn btn-primary add-to-cart-btn" 
                    data-id="${product.id}"
                    aria-label="Agregar ${product.name} al carrito"
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
};

/**
 * Renderiza el carrito en el DOM
 */
const renderCart = () => {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    if (!cartItems) return;
    
    // Actualizar contador
    const totalItems = getTotalItems(state.cart);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Renderizar items
    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>Tu carrito está vacío</p>
                <p>¡Agrega algunos productos!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = state.cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatCurrency(item.price)} c/u</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrement-btn" data-id="${item.id}" aria-label="Disminuir cantidad">
                        −
                    </button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increment-btn" data-id="${item.id}" aria-label="Aumentar cantidad">
                        +
                    </button>
                </div>
                <div class="cart-item-total">
                    ${formatCurrency(item.price * item.quantity)}
                </div>
                <button class="btn btn-secondary btn-small remove-btn" data-id="${item.id}" aria-label="Eliminar ${item.name}">
                    🗑️
                </button>
            </div>
        `).join('');
    }
    
    // Calcular y mostrar totales
    const subtotal = calculateSubtotal(state.cart);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal);
    
    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (taxEl) taxEl.textContent = formatCurrency(tax);
    if (totalEl) totalEl.textContent = formatCurrency(total);
};

/**
 * Inicializa los event listeners
 */
const initEventListeners = () => {
    const productsGrid = document.getElementById('productsGrid');
    const cartItems = document.getElementById('cartItems');
    const clearCartBtn = document.getElementById('clearCart');
    const cartIcon = document.getElementById('cartIcon');
    const cartSection = document.getElementById('cartSection');
    const cartOverlay = document.getElementById('cartOverlay');
    
    // Delegación de eventos para productos
    if (productsGrid) {
        productsGrid.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart-btn');
            if (addToCartBtn) {
                const productId = parseInt(addToCartBtn.dataset.id);
                const product = productsData.find(p => p.id === productId);
                
                if (product) {
                    state.cart = addToCart(state.cart, product);
                    saveCartToStorage();
                    renderCart();
                    
                    // Animación del botón
                    addToCartBtn.textContent = '✓ Agregado';
                    addToCartBtn.style.background = '#2ed573';
                    setTimeout(() => {
                        addToCartBtn.textContent = 'Agregar al Carrito';
                        addToCartBtn.style.background = '';
                    }, 1000);
                }
            }
        });
    }
    
    // Delegación de eventos para carrito
    if (cartItems) {
        cartItems.addEventListener('click', (e) => {
            const incrementBtn = e.target.closest('.increment-btn');
            const decrementBtn = e.target.closest('.decrement-btn');
            const removeBtn = e.target.closest('.remove-btn');
            
            if (incrementBtn) {
                const productId = parseInt(incrementBtn.dataset.id);
                state.cart = incrementQuantity(state.cart, productId);
                saveCartToStorage();
                renderCart();
            }
            
            if (decrementBtn) {
                const productId = parseInt(decrementBtn.dataset.id);
                state.cart = decrementQuantity(state.cart, productId);
                saveCartToStorage();
                renderCart();
            }
            
            if (removeBtn) {
                const productId = parseInt(removeBtn.dataset.id);
                state.cart = removeFromCart(state.cart, productId);
                saveCartToStorage();
                renderCart();
            }
        });
    }
    
    // Vaciar carrito
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (state.cart.length > 0 && confirm('¿Estás seguro de vaciar el carrito?')) {
                state.cart = clearCart();
                saveCartToStorage();
                renderCart();
            }
        });
    }
    
    // Toggle carrito en móvil
    if (cartIcon && cartSection && cartOverlay) {
        cartIcon.addEventListener('click', () => {
            cartSection.classList.toggle('active');
            cartOverlay.classList.toggle('active');
        });
        
        cartOverlay.addEventListener('click', () => {
            cartSection.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }
};

/**
 * Inicializa la aplicación
 */
const init = () => {
    // Cargar carrito desde LocalStorage
    loadCartFromStorage();
    
    // Renderizar productos
    renderProducts();
    
    // Renderizar carrito
    renderCart();
    
    // Inicializar event listeners
    initEventListeners();
    
    console.log('Aplicación inicializada correctamente');
};

// Iniciar aplicación cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


// Exportar funciones para testing (si estamos en un entorno que lo soporta)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        calculateSubtotal,
        calculateTax,
        calculateTotal,
        getTotalItems,
        formatCurrency,
        productsData,
        TAX_RATE
    };
}


