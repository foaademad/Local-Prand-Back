
let jwt = require('jsonwebtoken');
require('dotenv').config();


let protectRouter = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: "No token provided" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Failed to authenticate token" });
        req.userId = decoded.id;
        next();
    });
};
module.exports = protectRouter;