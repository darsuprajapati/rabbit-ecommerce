const User = require("../models/User.model.js")
const jwt = require("jsonwebtoken")

const userRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: 'user alredy exits' })
        user = new User({ name, email, password })
        await user.save();

        // Create Jwt Payload
        const payload = { user: { id: user._id, role: user.role } }

        // sign and return token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '40h' }, (err, token) => {
            if (err) throw err
            // Send the user and token in response
            res.status(201).json({
                message: "User Register Successfully ✅",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token
            })
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        // find the user by email
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Crdentials" });
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Crdentials" })
        // Create Jwt Payload
        const payload = { user: { id: user._id, role: user.role } }

        // sign and return token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '40h' }, (err, token) => {
            if (err) throw err
            // Send the user and token in response
            res.json({
                message: "User Login Successfully ✅",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token
            })
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const userProfile = async (req, res) => {
    res.json(req.user);
}

module.exports = { userRegister, userLogin, userProfile }