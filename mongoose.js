const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/product');
mongoose.connect(process.env.url).then(() => {
    console.log('Connected to MongoDB');
}).catch(()=> {
    console.log('Connection failed!');
});

const createProduct = async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });
    const result = await newProduct.save();
    res.json(result);
}
const getProducts = async (req, res) => {
    const products = await Product.find().exec();
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;