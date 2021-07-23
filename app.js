const express = require("express");
const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const productsRouters = require('./routers/products')
const categoriesRoutes = require('./routers/categories')
const usersRoutes = require('./routers/users')
const ordersRoutes = require('./routers/orders')

app.use(cors())
app.options('*', cors())

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouters);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

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
