const mangoose = require('mongoose');
const favouritSchema = new mangoose.Schema({
    userId: {
        type: mangoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    products: [{
        type: mangoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }]
})

const Favourit = mangoose.model('Favourit', favouritSchema);
module.exports = { Favourit };