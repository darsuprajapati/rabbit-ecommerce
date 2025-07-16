const express = require("express")
const { protect } = require("../middleware/autMiddleware.js")
const {addCart, updteQuantity,cartRemove,addCartshow, cartMerge} = require("../controller/cart.controller.js")

const router = express.Router()

// @route POST /api/cart
// @desc Add a product to the cart for a guset or logged in user
// @access Public
router.post("/",addCart)

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
// @access Public
router.put("/",updteQuantity)

// @route DELETE /api/cart
// @desc Remove a product from the cart
// @access Public
router.delete("/",cartRemove)

// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public
router.get("/",addCartshow)

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge",protect,cartMerge)


module.exports = router