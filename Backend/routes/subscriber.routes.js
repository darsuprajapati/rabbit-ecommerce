const express = require("express")
const { newsletterSubscribe } = require("../controller/subscriber.controller")


const router = express.Router()

// @router POST /api/subscribe
// @desc Handle newsletter subscription
// access Public

router.post("/",newsletterSubscribe)


module.exports = router