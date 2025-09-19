
const { Cart } = require("../model/cartModel");
const { product } = require("../model/productModel");


// Add item to cart
let addToCart = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.userId; // Set by protectRouter

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items array is required and must not be empty" });
        }

        // Find or create cart for the user
        let userCart = await Cart.findOne({ userId });
        if (!userCart) {
            userCart = new Cart({ userId, items: [] });
        }

        // Process each item in the items array
        for (const item of items) {
            const { productId, quantity, size, price, color } = item;

            if (!productId || !quantity) {
                return res.status(400).json({ message: "productId and quantity are required for each item" });
            }

            // Validate product existence   
            const foundProduct = await product.findById(productId);
            if (!foundProduct) {
                return res.status(404).json({ message: `Product not found for productId: ${productId}` });
            }   

            // Check if the product already exists in the cart
            const existingItemIndex = userCart.items.findIndex(cartItem => cartItem.productId.toString() === productId);    
            if (existingItemIndex > -1) {
                // Update quantity if product exists
                userCart.items[existingItemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                userCart.items.push({
                    productId,
                    quantity,
                    size: size || foundProduct.size || 'M', // Use provided size or product default
                    price: price || foundProduct.price, // Use provided price or product price
                    color: color || foundProduct.color || 'white' // Use provided color or product default
                });
            }
        }
           
        await userCart.save();
        res.status(200).json({ message: "Items added to cart", cart: userCart });
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
        const { productId } = req.params; // Get productId from URL parameters
        const userId = req.userId; // Set by protectRouter
        const userCart = await Cart.findOne({ userId });
        if (!userCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        userCart.items = userCart.items.filter(item => item.productId.toString() !== productId);
        await userCart.save();
        res.status(200).json({ message: "Item removed from cart"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addToCart, getCart, removeFromCart };
