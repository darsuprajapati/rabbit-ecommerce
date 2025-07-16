const express = require("express")
const {protect} = require("../middleware/autMiddleware.js")
const {userRegister,userLogin,userProfile} = require("../controller/user.controller.js")

const router = express.Router()

// @route POST /api/users/register
// @desc Register a new user
// @access Public

router.post("/register",userRegister )

// @route Post /api/users/login
// @desc Authenticate user
// @access Public

router.post("/login", userLogin)
 
// @route GET /api/users/profile
// @desc Get logged-in user's profile (Protected Route)
// @access Private

router.get("/profile", protect ,userProfile)


module.exports = router