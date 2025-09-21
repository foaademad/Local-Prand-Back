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

// Swagger
const swagger = require('./swagger/swagger');
swagger(app);



const userrouter = require("./routes/userRoute");
const categoryrouter = require("./routes/catogryRoute");
const productrouter = require("./routes/productRoute");
const cartrouter = require("./routes/cartRoute");

app.use("/products", productrouter);
app.use("/users", userrouter);
app.use("/categories", categoryrouter);
app.use("/cart", cartrouter);





module.exports = app;