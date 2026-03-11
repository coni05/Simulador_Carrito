// Importar las funciones a testear
const {
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
} = require('../js/app.js');

// ==================== UTILIDADES DE TEST ====================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

/**
 * Función para afirmar que dos valores son iguales
 */
function assertEquals(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✓ ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.error(`✗ ${testName}`);
        console.error(`  Esperado: ${expected}`);
        console.error(`  Obtenido: ${actual}`);
        testsFailed++;
        return false;
    }
}

/**
 * Función para afirmar que dos arrays son iguales
 */
function assertArrayEquals(actual, expected, testName) {
    totalTests++;
    const areEqual = JSON.stringify(actual) === JSON.stringify(expected);
    if (areEqual) {
        console.log(`✓ ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.error(`✗ ${testName}`);
        console.error(`  Esperado: ${JSON.stringify(expected)}`);
        console.error(`  Obtenido: ${JSON.stringify(actual)}`);
        testsFailed++;
        return false;
    }
}

/**
 * Función para afirmar que una condición es verdadera
 */
function assertTrue(condition, testName) {
    totalTests++;
    if (condition) {
        console.log(`✓ ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.error(`✗ ${testName}`);
        console.error(`  Esperado: true`);
        console.error(`  Obtenido: ${condition}`);
        testsFailed++;
        return false;
    }
}

// ==================== TESTS DE addToCart ====================

function testAddToCart() {
    console.log('\n📦 Tests de addToCart:');
    
    // Test 1: Agregar primer producto al carrito vacío
    const cart1 = [];
    const product1 = { id: 1, name: "Producto 1", price: 100, quantity: 1 };
    const result1 = addToCart(cart1, product1);
    assertArrayEquals(result1, [product1], 'Agregar primer producto al carrito vacío');
    
    // Test 2: Agregar producto diferente (no debe duplicar, debe agregar nuevo)
    const cart2 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const product2 = { id: 2, name: "Producto 2", price: 200, quantity: 1 };
    const result2 = addToCart(cart2, product2);
    assertEquals(result2.length, 2, 'Agregar producto diferente debe aumentar longitud');
    
    // Test 3: Agregar mismo producto (debe incrementar cantidad)
    const cart3 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const product3 = { id: 1, name: "Producto 1", price: 100, quantity: 1 };
    const result3 = addToCart(cart3, product3);
    assertEquals(result3[0].quantity, 2, 'Agregar mismo producto debe incrementar cantidad a 2');
    
    // Test 4: Agregar mismo producto múltiples veces
    const cart4 = [{ id: 1, name: "Producto 1", price: 100, quantity: 2 }];
    const product4 = { id: 1, name: "Producto 1", price: 100, quantity: 1 };
    const result4 = addToCart(cart4, product4);
    assertEquals(result4[0].quantity, 3, 'Agregar mismo producto debe incrementar cantidad a 3');
    
    // Test 5: No mutar el carrito original
    const cart5 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const product5 = { id: 1, name: "Producto 1", price: 100, quantity: 1 };
    const result5 = addToCart(cart5, product5);
    assertTrue(cart5[0].quantity === 1, 'No debe mutar el carrito original');
    assertTrue(result5[0].quantity === 2, 'Debe retornar nuevo carrito con cantidad actualizada');
}

// ==================== TESTS DE removeFromCart ====================

function testRemoveFromCart() {
    console.log('\n📦 Tests de removeFromCart:');
    
    // Test 1: Eliminar producto existente
    const cart1 = [
        { id: 1, name: "Producto 1", price: 100, quantity: 1 },
        { id: 2, name: "Producto 2", price: 200, quantity: 1 }
    ];
    const result1 = removeFromCart(cart1, 1);
    assertEquals(result1.length, 1, 'Eliminar producto debe reducir longitud');
    assertEquals(result1[0].id, 2, 'Debe mantener el otro producto');
    
    // Test 2: Eliminar producto inexistente
    const cart2 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result2 = removeFromCart(cart2, 999);
    assertArrayEquals(result2, cart2, 'Eliminar producto inexistente no debe cambiar el carrito');
    
    // Test 3: Eliminar de carrito vacío
    const cart3 = [];
    const result3 = removeFromCart(cart3, 1);
    assertArrayEquals(result3, [], 'Eliminar de carrito vacío debe retornar array vacío');
    
    // Test 4: No mutar el carrito original
    const cart4 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result4 = removeFromCart(cart4, 1);
    assertTrue(cart4.length === 1, 'No debe mutar el carrito original');
    assertTrue(result4.length === 0, 'Debe retornar nuevo carrito sin el producto');
}

// ==================== TESTS DE incrementQuantity ====================

function testIncrementQuantity() {
    console.log('\n📦 Tests de incrementQuantity:');
    
    // Test 1: Incrementar cantidad
    const cart1 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result1 = incrementQuantity(cart1, 1);
    assertEquals(result1[0].quantity, 2, 'Incrementar debe aumentar cantidad a 2');
    
    // Test 2: Incrementar producto inexistente
    const cart2 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result2 = incrementQuantity(cart2, 999);
    assertEquals(result2[0].quantity, 1, 'Incrementar producto inexistente no debe cambiar cantidad');
    
    // Test 3: No mutar el carrito original
    const cart3 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result3 = incrementQuantity(cart3, 1);
    assertTrue(cart3[0].quantity === 1, 'No debe mutar el carrito original');
}

// ==================== TESTS DE decrementQuantity ====================

function testDecrementQuantity() {
    console.log('\n📦 Tests de decrementQuantity:');
    
    // Test 1: Decrementar cantidad
    const cart1 = [{ id: 1, name: "Producto 1", price: 100, quantity: 3 }];
    const result1 = decrementQuantity(cart1, 1);
    assertEquals(result1[0].quantity, 2, 'Decrementar debe reducir cantidad a 2');
    
    // Test 2: Decrementar a 1 (no debe eliminar)
    const cart2 = [{ id: 1, name: "Producto 1", price: 100, quantity: 2 }];
    const result2 = decrementQuantity(cart2, 1);
    assertEquals(result2[0].quantity, 1, 'Decrementar a 1 debe mantener el producto');
    assertEquals(result2.length, 1, 'Debe mantener longitud de 1');
    
    // Test 3: Decrementar producto con cantidad 1 (debe eliminar)
    const cart3 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result3 = decrementQuantity(cart3, 1);
    assertEquals(result3.length, 0, 'Decrementar a 0 debe eliminar el producto');
    
    // Test 4: Decrementar producto inexistente
    const cart4 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result4 = decrementQuantity(cart4, 999);
    assertEquals(result4[0].quantity, 1, 'Decrementar producto inexistente no debe cambiar');
}

// ==================== TESTS DE calculateSubtotal ====================

function testCalculateSubtotal() {
    console.log('\n📦 Tests de calculateSubtotal:');
    
    // Test 1: Carrito vacío
    const cart1 = [];
    const result1 = calculateSubtotal(cart1);
    assertEquals(result1, 0, 'Subtotal de carrito vacío debe ser 0');
    
    // Test 2: Un producto
    const cart2 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result2 = calculateSubtotal(cart2);
    assertEquals(result2, 100, 'Subtotal de un producto debe ser su precio');
    
    // Test 3: Múltiples productos
    const cart3 = [
        { id: 1, name: "Producto 1", price: 100, quantity: 2 },
        { id: 2, name: "Producto 2", price: 50, quantity: 3 }
    ];
    const result3 = calculateSubtotal(cart3);
    assertEquals(result3, 350, 'Subtotal debe ser suma de (precio * cantidad)');
    
    // Test 4: Producto con cantidad 0
    const cart4 = [{ id: 1, name: "Producto 1", price: 100, quantity: 0 }];
    const result4 = calculateSubtotal(cart4);
    assertEquals(result4, 0, 'Producto con cantidad 0 debe sumar 0');
}

// ==================== TESTS DE calculateTax ====================

function testCalculateTax() {
    console.log('\n📦 Tests de calculateTax:');
    
    // Test 1: Calcular impuesto de 100
    const result1 = calculateTax(100);
    assertEquals(result1, 16, 'Impuesto de 100 debe ser 16 (16%)');
    
    // Test 2: Calcular impuesto de 0
    const result2 = calculateTax(0);
    assertEquals(result2, 0, 'Impuesto de 0 debe ser 0');
    
    // Test 3: Calcular impuesto decimal
    const result3 = calculateTax(50.50);
    assertTrue(Math.abs(result3 - 8.08) < 0.01, 'Impuesto de 50.50 debe ser ~8.08');
}

// ==================== TESTS DE calculateTotal ====================

function testCalculateTotal() {
    console.log('\n📦 Tests de calculateTotal:');
    
    // Test 1: Total con subtotal 100
    const result1 = calculateTotal(100);
    assertEquals(result1, 116, 'Total de 100 debe ser 116 (con 16% de impuesto)');
    
    // Test 2: Total con subtotal 0
    const result2 = calculateTotal(0);
    assertEquals(result2, 0, 'Total de 0 debe ser 0');
    
    // Test 3: Total con decimal
    const result3 = calculateTotal(50);
    assertEquals(result3, 58, 'Total de 50 debe ser 58');
}

// ==================== TESTS DE getTotalItems ====================

function testGetTotalItems() {
    console.log('\n📦 Tests de getTotalItems:');
    
    // Test 1: Carrito vacío
    const cart1 = [];
    const result1 = getTotalItems(cart1);
    assertEquals(result1, 0, 'Total items de carrito vacío debe ser 0');
    
    // Test 2: Un producto con cantidad 1
    const cart2 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result2 = getTotalItems(cart2);
    assertEquals(result2, 1, 'Total items debe ser 1');
    
    // Test 3: Múltiples productos
    const cart3 = [
        { id: 1, name: "Producto 1", price: 100, quantity: 2 },
        { id: 2, name: "Producto 2", price: 50, quantity: 3 }
    ];
    const result3 = getTotalItems(cart3);
    assertEquals(result3, 5, 'Total items debe ser suma de cantidades (2+3=5)');
}

// ==================== TESTS DE formatCurrency ====================

function testFormatCurrency() {
    console.log('\n📦 Tests de formatCurrency:');
    
    // Test 1: Formatear entero
    const result1 = formatCurrency(100);
    assertEquals(result1, '$100.00', 'Formatear 100 debe ser $100.00');
    
    // Test 2: Formatear decimal
    const result2 = formatCurrency(99.99);
    assertEquals(result2, '$99.99', 'Formatear 99.99 debe ser $99.99');
    
    // Test 3: Formatear 0
    const result3 = formatCurrency(0);
    assertEquals(result3, '$0.00', 'Formatear 0 debe ser $0.00');
    
    // Test 4: Formatear número con muchos decimales
    const result4 = formatCurrency(99.999);
    assertEquals(result4, '$100.00', 'Formatear 99.999 debe redondear a $100.00');
}

// ==================== TESTS DE clearCart ====================

function testClearCart() {
    console.log('\n📦 Tests de clearCart:');
    
    // Test 1: Vaciar carrito con productos
    const result1 = clearCart();
    assertArrayEquals(result1, [], 'clearCart debe retornar array vacío');
    
    // Test 2: Llamar múltiples veces
    const result2 = clearCart();
    const result3 = clearCart();
    assertArrayEquals(result2, result3, 'clearCart debe ser consistente');
}

// ==================== TESTS DE updateQuantity ====================

function testUpdateQuantity() {
    console.log('\n📦 Tests de updateQuantity:');
    
    // Test 1: Actualizar cantidad
    const cart1 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result1 = updateQuantity(cart1, 1, 5);
    assertEquals(result1[0].quantity, 5, 'Actualizar cantidad debe cambiar a 5');
    
    // Test 2: Actualizar a 0 (debe eliminar)
    const cart2 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result2 = updateQuantity(cart2, 1, 0);
    assertEquals(result2.length, 0, 'Actualizar a 0 debe eliminar el producto');
    
    // Test 3: Actualizar producto inexistente
    const cart3 = [{ id: 1, name: "Producto 1", price: 100, quantity: 1 }];
    const result3 = updateQuantity(cart3, 999, 5);
    assertEquals(result3[0].quantity, 1, 'Actualizar producto inexistente no debe cambiar');
}

// ==================== EJECUTAR TODOS LOS TESTS ====================

function runAllTests() {
    console.log('🚀 Iniciando tests del simulador de carrito...\n');
    console.log('='.repeat(50));
    
    testAddToCart();
    testRemoveFromCart();
    testIncrementQuantity();
    testDecrementQuantity();
    testCalculateSubtotal();
    testCalculateTax();
    testCalculateTotal();
    testGetTotalItems();
    testFormatCurrency();
    testClearCart();
    testUpdateQuantity();
    
    console.log('\n' + '='.repeat(50));
    console.log('\n📊 RESUMEN DE TESTS:');
    console.log(`Total: ${totalTests}`);
    console.log(`✓ Aprobados: ${testsPassed}`);
    console.log(`✗ Fallidos: ${testsFailed}`);
    console.log(`📈 Cobertura: ${((testsPassed / totalTests) * 100).toFixed(2)}%`);
    
    if (testsFailed === 0) {
        console.log('\n🎉 ¡Todos los tests pasaron!');
    } else {
        console.log('\n❌ Algunos tests fallaron. Revisa los errores arriba.');
        process.exit(1);
    }
}

// Ejecutar tests
runAllTests();