const mangoose = require('mongoose');
const bycrypt = require('bcryptjs');

// User Schema
const userSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {    
        type: String,
        required: true,
        trim: true, 
        unique: true,
        lowercase: true
    },  
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    role: { 
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    address: {
        type: String,
        required: true,
        trim: true
    }
});



// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bycrypt.hash(this.password, 10);
    next();
});

const User = mangoose.model('User', userSchema);
module.exports = { User };

