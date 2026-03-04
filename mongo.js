const { ClientEncryption } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const url = process.env.url;

const createProduct = async (req, res, next) => {
    const newProduct={
        name: req.body.name,
        price: req.body.price
    };
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('products').insertOne(newProduct);
        console.log(result);
    } catch (err) {
        //console.log(err);
        return res.json({ message: 'Could not store data.' });
    }
    client.close();
    res.json(newProduct);
}

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url);
    let products;

    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray();
        res.json(products);
    } catch (err) {
        //console.log(err);
        return res.json({ message: 'Could not retrieve products.' });
    }
    client.close();
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;