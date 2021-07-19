const express = require("express");
const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const morgan = require('morgan');
const mongoose = require('mongoose');

//Middleware
app.use(express.json());
app.use(morgan('tiny'));



app.get(`${api}/products`, (req, res) => {
    const products = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url'
    }
    res.send(products);
})

app.post(`${api}/products`, (req, res) => {
    const newProducts = req.body;
    console.log("New Product: " + JSON.stringify(newProducts)); 
    res.send(newProducts);
})

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
