
const { Cart } = require("../model/cartModel");
const { product } = require("../model/productModel");


// Add item to cart
let addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId; // Set by protectRouter

        // Validate product existence   
        const foundProduct = await product.findById(productId);
        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found" });
        }   
        // Find or create cart for the user
        let userCart = await Cart.findOne({ userId });
        if (!userCart) {
            userCart = new Cart({ userId, items: [] });
        }
        // Check if the product already exists in the cart
        const existingItemIndex = userCart.items.findIndex(item => item.productId.toString() === productId);    
        if (existingItemIndex > -1) {
            // Update quantity if product exists
            userCart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            userCart.items.push({
                productId,
                quantity,
                size: foundProduct.size || 'M', // Default size if not provided
                price: foundProduct.price,
                color: foundProduct.color || 'white' // Default color if not provided
            });
        }   
        await userCart.save();
        res.status(200).json({ message: "Item added to cart", cart: userCart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user's cart
let getCart = async (req, res) => {
    try {
        const userId = req.userId; // Set by protectRouter
        const userCart = await Cart.findOne({ userId }).populate('items.productId');
        if (!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ cart: userCart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Remove item from cart
let removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId; // Set by protectRouter
        const userCart = await Cart.findOne({ userId });
        if (!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        userCart.items = userCart.items.filter(item => item.productId.toString() !== productId);
        await userCart.save();
        res.status(200).json({ message: "Item removed from cart", cart: userCart });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addToCart, getCart, removeFromCart };
