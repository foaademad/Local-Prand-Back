const Category = require("../model/catogryModel");
const { product } = require("../model/productModel");
// Create a new category
let createCategory = async (req, res) => {
    try {
        
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
        let categoriesWithProducts = await Promise.all(categories.map(async (cat) => {
            let products = await product.find({ category: cat._id });
            return { _id: cat._id, name: cat.name, products };
        }));
        res.json(categoriesWithProducts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};

let deleteCategory = async (req, res) => {
    try{
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found." });
        }
        res.json({ message: "Category deleted successfully." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }


};



module.exports = { createCategory, getAllCategories ,deleteCategory };
