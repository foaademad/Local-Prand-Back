 require("express");
const { User } = require("../model/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// User registration
let register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phoneNumber, country } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        let user = await User.create({
            name,
            email,
            password,
            phoneNumber,
            country
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        // 5- رجع النتيجة
        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User login
let login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login };