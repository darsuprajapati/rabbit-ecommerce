const Order = require("../models/Order.model.js")

const myOrders = async (req,res) =>{
    try{
        // Find orders for the authenticated user
        const orders = await Order.find({user:req.user._id}).sort({
            createdAt:-1,
        })
        // sort by most recent orders
        res.json(orders)
    }
     catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const orderDetails = async (req,res) =>{
    try{
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )
        if(!order){
            return res.status(404).json({message:'Order not found'});
        }
        // Return the full order details
        res.json(order)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

module.exports = {myOrders,orderDetails}