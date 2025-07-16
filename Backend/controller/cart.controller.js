const Cart = require("../models/Cart.model.js")
const Product = require("../models/Product.model.js")

// Helper function to get a cart by user Id or guest ID

const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ userId })
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null
}

const addCart = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found ❌" })

        // Determine if the user is logged in or guest
        let cart = await getCart(userId, guestId)

        // If the cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId && p.size === size && p.color === color
            );
            if (productIndex > -1) {
                // If the product alredy exists, update the quantity
                cart.products[productIndex].quantity += quantity
            } else {
                // add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                })
            }
            // Recalculate the total price
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
            await cart.save();
            return res.status(200).json(cart)
        }
        else {
            // Create a new cart for the guest or user
            const newCart = await Cart.create({
                userId: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    }
                ],
                totalPrice: product.price * quantity
            });
            return res.status(201).json(newCart)
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const updteQuantity = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found ❌" });

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && p.size === size && p.color === color
        );
        if (productIndex > -1) {
            // update the quantity
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity
            } else {
                cart.products.splice(productIndex, 1) // Remove product if quantity is 0
            }

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
            await cart.save();
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({
                message: "Product not found in cart"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const cartRemove = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found ❌" });

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && p.size === size && p.color === color
        );
        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
            await cart.save();
            return res.status(200).json(cart)
        }
        else {
            return res.status(404).json({
                message: "Product not found in cart ❌"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const addCartshow = async (req, res) => {
    const { guestId, userId } = req.query;
    try {
        let cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({
                message: "Cart not found ❌"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const cartMerge = async (req, res) => {
    const { guestId } = req.query;
    try {
        // Find the guest cart and user cart
        const guestCart = await Cart.findOne({ guestId });
        const userCart = await Cart.findOne({ userId: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(404).json({ message: "Guest cart is empty" });
            }

            if (userCart) {
                // Merge guest cart into user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) => item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color
                    );

                    if (productIndex > -1) {
                        // If the exists in the user cart, update the quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        // Otherwise, add the guest item to the cart
                        userCart.products.push(guestItem)
                    }
                })
                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
                await userCart.save();

                // Remove the guest cart after merging
                try{
                    await Cart.findOneAndDelete({guestId})
                }catch(error){
                    console.log("Error deleting guest cart:",error);
                }
                return res.status(200).json(userCart)
            } else{
                // If the user has no existing cart, assign the guest cart to the user
                guestCart.userId = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();
                res.status(200).json(guestCart)
            }
        } else{
            if (userCart) {
                // guest cart has already been merged, return user cart
                return res.status(200).json(userCart)
            }
            res.status(404).json({
                message:'Guest cart not found ❌'
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

module.exports = { addCart, updteQuantity, cartRemove, addCartshow, cartMerge }
