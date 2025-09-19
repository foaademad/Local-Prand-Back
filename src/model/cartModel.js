const mangoose = require('mongoose');
const cartSchema = new mangoose.Schema({
    userId: {   
        type: mangoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [
        {
            productId: {
                type: mangoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            size: {
                type: String,
                required: true,
                trim: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            } ,
            color: {
                type: String,
                required: true,
                trim: true
            }  

        }
    ]
});

const Cart = mangoose.model('Cart', cartSchema);
module.exports = { Cart };
