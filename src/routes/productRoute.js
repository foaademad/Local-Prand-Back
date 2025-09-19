
const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, addReview, getProductReviews } = require("../controllers/productController");


router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

// Add a review to a product
router.post("/:id/reviews", addReview);
// Get all reviews for a product
router.get("/:id/reviews", getProductReviews);

module.exports = router;
