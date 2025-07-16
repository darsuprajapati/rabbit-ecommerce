const Product = require("../models/Product.model.js")

const getallProducts = async (req,res) =>{
    try{
        const products = await Product.find({})
        res.json(products)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}
module.exports = {getallProducts}