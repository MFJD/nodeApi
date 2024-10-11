const express = require('express');
const Item = require('./../models/item');
const auth = require('../middleware/auth');
const router = express.Router();
const { swaggerUi, swaggerDocs } = require('./../swagger');


// Swagger route
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * tags:
 *   - name: Items
 *     description: Operations related to Authentication
 */




/**
/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retrieve all Items
 *     security:
 *      - BearerAuth: []
 *     description: Get a list of all available Items in the database.
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: A list of Items
 */
router.get('/items', auth, async (req, res) => {
    try {
        const items = await Item.find({userId: req.user.id });
        res.json(items);
    } catch (error) {
        res.status(400).send(error.message);
    }
});





/**
/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new Item
 *     security:
 *      - BearerAuth: []
 *     description: Create a new Item in the database.
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 id: string
 *               name:
 *                 type: string
 *             example:
 *               userId: "123456"
 *               name: "Item A"
 *     responses:
 *       200:
 *         description: Item registered successfully !!!
 */

router.post('/items', auth, async (req, res) => {
    const { name } = req.body;

    const newItem = new Item({ userId: req.user.id, name });
    
    try {
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).send(error.message);
    }
});




module.exports=router
