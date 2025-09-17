const Category = require("../model/catogryModel");

// Create a new category
let createCategory = async (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).json({ message: "Request body is missing or invalid." });
        }
        const { name } = req.body;
        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({ message: "Category name is required." });
        }
        let existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }
        let category = await Category.create({ name });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all categories
let getAllCategories = async (req, res) => {
    try {
        let categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};



module.exports = { createCategory, getAllCategories };
