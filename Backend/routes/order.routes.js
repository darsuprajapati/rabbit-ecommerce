const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/autMiddleware.js")
const {myOrders,orderDetails} = require("../controller/order.controller.js")

// @routes GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private 
router.get("/my-orders",protect,myOrders)

// @routes GET /api/orders/:id
// @desc Get order details by ID
// @access Private 
router.get("/:id",protect,orderDetails)

module.exports = router