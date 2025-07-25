// Authentication

/*
Use this in the routes scripts: 

For e.g.: if posting with POST /meal-posts:
    const auth = require('../middleware/authMiddleware');
    router.post('/', auth, fridgeController.addItem);

(This can be added later)
*/

const jwt = require('jsonwebtoken')
const User = require('../models/user');
require('dotenv').config();

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // check request header has token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorised: No token provided' })
    }

    const token = authHeader.split(' '[1]);

    // verify bearer token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;