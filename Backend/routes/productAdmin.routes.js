const express = require("express")
const { protect, admin } = require("../middleware/autMiddleware.js");
const { getallProducts } = require("../controller/productAdmin.controller.js");
const { updateProduct, deleteProduct } = require("../controller/product.controller.js");

const router = express.Router();

// @route GET /api/admin/products
// @desc Get all products (Admin only)
// @access Private/Admin

router.get("/", protect, admin, getallProducts)

// @route PUT /api/admin/products/:id
// @desc Update a product (Admin only)
// @access Private/Admin
router.put("/:id", protect, admin, updateProduct)

// @route DELETE /api/admin/products/:id
// @desc Delete a product (Admin only)
// @access Private/Admin
router.delete("/:id", protect, admin, deleteProduct)

module.exports = router