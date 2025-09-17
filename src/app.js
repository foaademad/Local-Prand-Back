const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

// Database Connection
const mangoose = require('mongoose');
mangoose.connect( process.env.MONGO_URI )
.then( () => console.log('DB Connected') )
.catch( (err) => console.log('DB Connection Error: ', err) );
app.use(cors({
    origin: 'http://localhost:3000'
})); // السماح لأي دومين بالاتصال
app.use(express.json());




const router = require("./routes/userRoute");
app.use("/", router);





module.exports = app;