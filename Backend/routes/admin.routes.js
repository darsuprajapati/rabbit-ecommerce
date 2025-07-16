const express = require("express")
const {protect,admin} = require("../middleware/autMiddleware.js")
const { getAllusers, newUsers, editUsers, deleteUser } = require("../controller/admin.controller.js")

const router = express.Router()

// @route GET /api/admin/users
// @desc Get all users (Admin only)
// @access Private/Admin
router.get("/",protect,admin,getAllusers)

// @route POST /api/admin/users
// @desc Add a new user (admin only)
// @access Private/Admin
router.post("/",protect,admin,newUsers)

// @route PUT /api/admin/users/:id 
// @desc Update user info (admin only)  -Name, email and role
// @access Private/Admin
router.put("/:id",protect,admin,editUsers)

// @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private/Admin
router.delete("/:id",protect,admin,deleteUser)

module.exports = router