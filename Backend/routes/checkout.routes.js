const express = require("express")
const { protect } = require("../middleware/autMiddleware.js")
const {newCheckout,updateCheckout,finalize} = require("../controller/checkout.controller.js")

const router = express.Router()

// @routes POST /api/checkout
// @desc Create a new Checkot session
// @acess Private
router.post("/",protect,newCheckout)

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @acess Private
router.put("/:id/pay",protect,updateCheckout)

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @acess Private

router.post("/:id/finalize",protect,finalize)


module.exports = router
