const express = require('express');
const app = express.Router();
const cors = require('cors');
const Product = require('../models/productModels');
const { swaggerUi, swaggerDocs } = require('./../swagger');





app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Root route
app.get('/', (req, res) => {
    res.send('Hello world how are you ?');
});


/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Operations related to products
 */



/**
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Retrieve all products
 *     description: Get a list of all available products in the inventory.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
app.get('/product', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


/**
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product in the database.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity: 
 *                  type: numner
 *             example:
 *               name: "Product Name"
 *               price: 10.99
 *               quantity: 2000
 *     responses:
 *       200:
 *         description: The created product
 */
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});




/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Get a list of all available products in the inventory.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: The requested product
 */
app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: `Cannot find product with ID ${id}` });
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Get a list of all available products in the inventory.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update
 *     responses:
 *       200:
 *         description: The updated product
 */
app.put('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: `Cannot find product with ID ${id} ` });
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});



/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Get a list of all available products in the inventory.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: The deleted product
 */
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ message: `Cannot find product with ID ${id}` });
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});






/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Get a list of all available products in the inventory.
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: The deleted product
 */
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ message: `Cannot find product with ID ${id}` });
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


module.exports = app