const express = require("express");
const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const morgan = require('morgan');
const mongoose = require('mongoose');


const productsRouter = require('./routers/products')


//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter)


// mongoose.connect() : return a promise which will return two methods (onSuccess, onFail)
mongoose.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true}).then(() =>{
    console.log("[*] MongoDB connected Successfully");
}).catch((err)=> {
    console.log(`[!] Faild to connect to MongoDB: ${err}`);
});


app.listen(3000, () => {
    console.log("API: " + api);
    console.log("[*] Server is running on http://localhost:3000");
});
