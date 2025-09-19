

const Category = require('../model/catogryModel');
const { product } = require('../model/productModel');

// Create a new product
let createProduct = async (req, res) => {
    try {
        let { category, ...rest } = req.body;
        const findCategory = await Category.findOne({ name: category });
        if (!findCategory) {
            return res.status(400).json({ message: "Invalid category name" });
        }
        let newProduct = new product({ ...rest, category: findCategory._id });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

let getAllProducts = async (req, res) => {
    try {
    let products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
let deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
    await product.findByIdAndDelete(id);
        res.status(204).json("Product deleted successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
let updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };
        if (updateData.category && typeof updateData.category === 'string') {
            const findCategory = await Category.findOne({ name: updateData.category });
            if (!findCategory) {
                return res.status(400).json({ message: "Invalid category name" });
            }
            updateData.category = findCategory._id;
        }
        let updatedProduct = await product.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
let getProductById = async (req, res) => {
    try {
        const { id } = req.params;
    let foundProduct = await product.findById(id);
        if (!foundProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(foundProduct);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Add a review to a product
let addReview = async (req, res) => {
    try {
        const { id } = req.params; // product id
        const { user, rate, comment } = req.body;
        if (!user || typeof rate !== 'number') {
            return res.status(400).json({ message: "user and rate are required" });
        }
        if (rate < 0 || rate > 5) {
            return res.status(400).json({ message: "rate must be between 0 and 5" });
        }
        const prod = await product.findById(id);
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }
        prod.reviews.push({ user, rate, comment });
        await prod.save();
        res.status(201).json({ message: "Review added successfully", reviews: prod.reviews });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all reviews for a product
let getProductReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await product.findById(id).populate('reviews.user', 'name email');
        if (!prod) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(prod.reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};




module.exports = { createProduct, getAllProducts, deleteProduct, updateProduct, getProductById, addReview, getProductReviews };
