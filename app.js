const express = require("express");
const app = express();
require('dotenv/config');
const api = process.env.API_URL;
const morgan = require('morgan');

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

app.listen(3000, () => {
    console.log("API: " + api);
    console.log("[*] Server is running on http://localhost:3000");
});
