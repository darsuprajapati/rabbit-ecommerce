const Order = require("../models/Order.model.js")

const getAllorders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email")
        res.json(orders)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const orderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name")
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt

            const updatedOrder = await order.save()
            res.json(updatedOrder)
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const orderDelete = async (req, res) => {
try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({message:"Order remove successfully ✅"})
        } else {
            res.status(404).json({
                message: "Order not found ❌"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

module.exports = { getAllorders, orderStatus, orderDelete }