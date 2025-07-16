const Product = require("../models/Product.model.js")

const createProduct = async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body
        const product = new Product({ name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, user: req.user._id })
        const createdProduct = await product.save()
        res.status(201).json({
            message: "product created successfully ✅",
            createdProduct
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body
        // Find product by ID
        const product = await Product.findById(req.params.id);
        if (product) {
            // Update product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            // Save the updated product
            const updateProduct = await product.save()
            res.status(202).json({
                message: "Product updated successfully ✅",
                updateProduct
            })
        } else {
            res.status(404).json({
                message: "Product not found ❌"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const deleteProduct = async (req, res) => {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id);
        if (product) {
            // Remove the product from DB
            await product.deleteOne();
            res.json({
                message: "Product removed successfully ✅"
            })
        } else {
            res.status(404).json({
                message: "Product not found ❌"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const getAllProducts = async (req, res) => {
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query
        let query = {}

        // Filter logic
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }

        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }
        if (material) {
            query.material = { $in: material.split(",") };
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.sizes = { $in: size.split(",") };
        }
        if (color) {
            query.colors = { $in: [color] }
        }
        if (gender) {
            query.gender = gender;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
        }

        // Sort Logic
        let sort = {}
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 }
                    break;

                case "priceDesc":
                    sort = { price: -1 }
                    break;

                case "popularity":
                    sort = { rating: -1 }
                    break;

                default:
                    break;
            }
        }

        // Fetch products and apply sorting and limit
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
        res.json(products)

    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const bestSellerProducts = async (req, res) => {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 })
        if (bestSeller) {
            res.json(bestSeller)
        }
        else {
            res.status(404).json({
                message: "No best seller found ❌"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product)
        }
        else {
            res.status(404).json({
                message: "Product not found ❌"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const getsimilarProducts = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                message: "Product not found ❌"
            })
        }

        const similarProducts = await Product.find({
            _id: { $ne: id }, // Exclude the current product ID
            gender: product.gender,
            category: product.category
        }).limit(4);

        res.json({ similarProducts })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

const newArrivalsProducts = async (req, res) => {
    try {
        // Fetch latest 8 product
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
}

module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct, getsimilarProducts, bestSellerProducts, newArrivalsProducts }