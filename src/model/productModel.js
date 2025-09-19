const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    newPrice: {
        type: Number,
        min: 0
    },
    dicountRate: {
        type: Number,
        min: 0,
        max: 100
    },
    size:{
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    image : [{
        type: String,
        required: true
    }],
    rate: {
        type: Number,
        min: 0,
        max: 5
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            rate: { type: Number, min: 0, max: 5, required: true },
            comment: { type: String },
            date: { type: Date, default: Date.now }
        }
    ]
    


});

const product = mongoose.model("product", productSchema);

module.exports = { product };
