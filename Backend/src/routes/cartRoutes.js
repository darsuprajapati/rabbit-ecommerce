const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Get cart for user or guest
router.get('/', async (req, res) => {
    try {
        const { userId, guestId } = req.query;
        let cart;

        if (userId) {
            cart = await Cart.findOne({ userId });
        } else if (guestId) {
            cart = await Cart.findOne({ guestId });
        }

        if (!cart) {
            cart = new Cart({ 
                userId: userId || null, 
                guestId: guestId || null,
                products: [] 
            });
            await cart.save();
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add item to cart
router.post('/', async (req, res) => {
    try {
        const { productId, quantity, size, color, guestId, userId } = req.body;
        let cart;

        if (userId) {
            cart = await Cart.findOne({ userId });
        } else if (guestId) {
            cart = await Cart.findOne({ guestId });
        }

        if (!cart) {
            cart = new Cart({ 
                userId: userId || null, 
                guestId: guestId || null,
                products: [] 
            });
        }

        // Check if product already exists in cart
        const existingProductIndex = cart.products.findIndex(
            p => p.productId.toString() === productId && 
                 p.size === size && 
                 p.color === color
        );

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity, size, color });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update cart item quantity
router.put('/', async (req, res) => {
    try {
        const { productId, quantity, guestId, userId, size, color } = req.body;
        let cart;

        if (userId) {
            cart = await Cart.findOne({ userId });
        } else if (guestId) {
            cart = await Cart.findOne({ guestId });
        }

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(
            p => p.productId.toString() === productId && 
                 p.size === size && 
                 p.color === color
        );

        if (productIndex > -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove item from cart
router.delete('/', async (req, res) => {
    try {
        const { productId, guestId, userId, size, color } = req.body;
        let cart;

        if (userId) {
            cart = await Cart.findOne({ userId });
        } else if (guestId) {
            cart = await Cart.findOne({ guestId });
        }

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(
            p => !(p.productId.toString() === productId && 
                  p.size === size && 
                  p.color === color)
        );

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Merge guest cart with user cart
router.post('/merge', async (req, res) => {
    try {
        const { guestId, user } = req.body;
        
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ userId: user._id });

        if (!guestCart) {
            return res.json(userCart || { products: [] });
        }

        if (!userCart) {
            guestCart.userId = user._id;
            guestCart.guestId = null;
            await guestCart.save();
            return res.json(guestCart);
        }

        // Merge products from guest cart to user cart
        guestCart.products.forEach(guestProduct => {
            const existingProductIndex = userCart.products.findIndex(
                p => p.productId.toString() === guestProduct.productId.toString() &&
                     p.size === guestProduct.size &&
                     p.color === guestProduct.color
            );

            if (existingProductIndex > -1) {
                userCart.products[existingProductIndex].quantity += guestProduct.quantity;
            } else {
                userCart.products.push(guestProduct);
            }
        });

        await userCart.save();
        await Cart.deleteOne({ guestId }); // Remove guest cart after merging

        res.json(userCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 