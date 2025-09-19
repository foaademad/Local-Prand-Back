
const express = require("express");
const router = express.Router();
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");
const protectRouter = require("../middleware/protectRouting");

router.post("/add", protectRouter, addToCart);
router.get("/:userId", protectRouter, getCart);
router.delete("/remove/:userId/:productId", protectRouter, removeFromCart);

module.exports = router;

