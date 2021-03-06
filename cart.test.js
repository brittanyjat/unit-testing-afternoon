let cart = require('./cart');
let cars = require('./data/cars');

describe('Cart Properties', () => {
    test('Checking for empty cart', () => {
        expect(cart.cart.length).toEqual(0);
        expect(Array.isArray(cart.cart)).toEqual(true);
    });
    test('Checking total = 0', () => {
        expect(cart.total).toEqual(0);
    });
})

describe('Cart Methods', () => {
    afterEach(function () {
        cart.cart = [];
        cart.total = 0;
    });
    test('addToCart should increase cart array by 1', () => {
        cart.addToCart(cars[0])
        cart.addToCart(cars[1])
        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[1]);
    });
    test('addToCart should increase total', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[5]);
        cart.addToCart(cars[2]);
        expect(cart.total).toEqual(cars[0].price + cars[5].price + cars[2].price);
    });
    test('removeFromCart should decrease cart length by 1', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[2]);
        cart.removeFromCart(1, cars[1].price);
        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[2]);
    });
    test('removeFromCart should decrease total', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[8]);
        cart.addToCart(cars[2]);

        cart.removeFromCart(0, cars[0].price);
        cart.removeFromCart(1, cars[2].price);
        expect(cart.total).toEqual(cars[8].price);
    });
    test('Checkout should clear cart array', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[8]);
        cart.addToCart(cars[2]);
        cart.checkout();
        expect(cart.cart.length).toEqual(0);
        expect(cart.total).toEqual(0);
    });
})