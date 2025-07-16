const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Product = require("./models/Product.model.js")
const User = require("./models/User.model.js")
const Cart = require("./models/Cart.model.js")
const products = require("./data/products.js")

dotenv.config();

// Connect to mongoDB

mongoose.connect(process.env.MONGO_URI);

// function to seed data

const seedData = async () =>{
    try{
        // clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // create a default admin user
        const createdUser = await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:"123456",
            role:"admin"
        })

        // Assign th default user ID to each product
        const userID = createdUser._id

        const sampleProducts = products.map((products)=>{
            return {...products,user:userID}
        })

        // Inset the product into the database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded sucessfully ✅ ");
        process.exit();
    }
    catch (error){
        console.log("Error seeding the data",error);
         process.exit(1);
    }
}

seedData()