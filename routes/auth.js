const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const router = express.Router();
const cors = require('cors');
const { swaggerUi, swaggerDocs } = require('./../swagger');

router.use(cors())
router.use(express.json());
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Swagger route
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Operations related to Authentication
 */



// Register

/**
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new User
 *     description: Create a new User in the database.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password: 
 *                  type: string
 *             example:
 *               name: "Joe Doe"
 *               email: "jamisonderilsan@gmail.com"
 *               password: ""
 *     responses:
 *       200:
 *         description: User registered successfully !!!
 */
router.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    
    try {
        await newUser.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login

/**
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Create a new User
 *     description: Create a new User in the database.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password: 
 *                  type: string
 *             example:
 *               email: "jamisonderilsan@gmail.com"
 *               password: ""
 *     responses:
 *       200:
 *         description: Login Successfully !!!!
 */

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email or password is wrong.');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Email or password is wrong.');

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    
    await user.save();

    res.json({ accessToken, refreshToken });
});

// Refresh Token
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).send('Refresh token required.');

    try {
        const verified = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).send('Invalid refresh token.');
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        
        user.accessToken = accessToken; // Update access token in the database
        await user.save();

        res.json({ accessToken });
    } catch (error) {
        res.status(400).send('Invalid refresh token.');
    }
});


module.exports = router;
