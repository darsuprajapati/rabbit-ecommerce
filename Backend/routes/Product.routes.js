const express = require("express")
const { protect, admin } = require("../middleware/autMiddleware.js")
const { createProduct, updateProduct,deleteProduct,getAllProducts,getProduct,getsimilarProducts,bestSellerProducts,newArrivalsProducts } = require("../controller/product.controller.js")
const router = express.Router()

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.post("/", protect, admin, createProduct)

// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id", protect, admin, updateProduct)

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
router.delete("/:id",protect, admin,deleteProduct)

// @route GET /api/products
// @desc get all products with optional query filters
// @access Public
router.get("/",getAllProducts)

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller",bestSellerProducts)

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation date
// @access Public
router.get("/new-arrivals",newArrivalsProducts)

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id",getsimilarProducts)

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id",getProduct)

module.exports = router