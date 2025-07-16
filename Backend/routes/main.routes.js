const express = require("express")
const userRoutes = require("./user.routes.js")
const productRoutes = require("./Product.routes.js")
const cartRoutes = require("./cart.routes.js")
const checkoutRoutes = require("./checkout.routes.js")
const orderRoutes = require("./order.routes.js")
const uploadRoutes = require("./upload.routes.js")
const subscriberRoutes = require("./subscriber.routes.js")
const adminUserRoutes = require("./admin.routes.js")
const productAdminRoutes = require("./productAdmin.routes.js")
const orderAdminRoutes = require("./adminOrder.routes.js")

const router = express.Router()

router.use("/users",userRoutes)
router.use("/products",productRoutes)
router.use("/cart",cartRoutes)
router.use("/checkout",checkoutRoutes)
router.use("/orders",orderRoutes)
router.use("/upload",uploadRoutes)
router.use("/subscribe",subscriberRoutes)

// admin router
router.use("/admin/users",adminUserRoutes)
router.use("/admin/products",productAdminRoutes)
router.use("/admin/orders",orderAdminRoutes)

module.exports = router