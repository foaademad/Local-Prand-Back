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




const userrouter = require("./routes/userRoute");
const categoryrouter = require("./routes/catogryRoute");
const productrouter = require("./routes/productRoute");

app.use("/products", productrouter);
app.use("/", userrouter);
app.use("/categories", categoryrouter);





module.exports = app;