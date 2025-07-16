const express = require("express")
const { protect, admin } = require("../middleware/autMiddleware.js");
const { getAllorders, orderStatus, orderDelete } = require("../controller/orderAdmin.controller.js");

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders (Admin only)
// @access Private/Admin
router.get("/", protect, admin, getAllorders)

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put("/:id", protect, admin, orderStatus)

// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access Private/Admin

router.delete("/:id",protect, admin,orderDelete)

module.exports = router