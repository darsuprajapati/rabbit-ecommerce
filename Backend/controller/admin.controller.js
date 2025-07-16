const User = require("../models/User.model.js")

const getAllusers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const newUsers = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: 'user alredy exits' })
        user = new User({ name, email, password, role: role || "customer" })
        await user.save();

        res.status(201).json({
            message: "User created Successfully ✅",
            user
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const editUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            user.role = req.body.role || user.role
        }
        const updatedUser = await user.save()
        res.status(200).json({ message: "User updated successfully ✅", user: updatedUser })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const deleteUser = async (req,res) =>{
try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({message:"User deleted successfully ✅"})
        } else {
            res.status(404).json({
                message: "User not found ❌"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

module.exports = { getAllusers, newUsers, editUsers,deleteUser }