const { Favourit } = require("../model/favouritModel");

// Add to favourit
let addToFavourit = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.userId;
        let favourit = await Favourit.findOne({ userId });
        if (!favourit) {
            favourit = new Favourit({ userId, products: [productId] });
        } else {
            favourit.products.push(productId);
        }
        await favourit.save();
        
        // Populate products with full details
        const populatedFavourit = await Favourit.findById(favourit._id)
            .populate('products', 'name description price newPrice dicountRate size category image rate ')

            
        res.status(200).json({ message: "Product added to favourit", favourit: populatedFavourit });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get favourit
let getFavourit = async (req, res) => {
    try {
        const userId = req.userId;
        const favourit = await Favourit.findOne({ userId })
            .populate('products', 'name description price newPrice dicountRate size category image rate ')

        res.status(200).json(favourit);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Remove from favourit
let removeFromFavourit = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.userId;
        const favourit = await Favourit.findOne({ userId });
        if (!favourit) {
            return res.status(404).json({ message: "Favourit not found" });
        }
        favourit.products = favourit.products.filter(product => product.toString() !== productId);
        await favourit.save();
        
        // Populate products with full details after removal
        const populatedFavourit = await Favourit.findById(favourit._id)
            .populate('products', 'name description price newPrice dicountRate size category image rate ')
            // .populate('products.category', 'name');
            
        res.status(200).json({ message: "Product removed from favourit", favourit: populatedFavourit });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { addToFavourit, getFavourit, removeFromFavourit };