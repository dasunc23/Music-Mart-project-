const express = require('express');
const { login, register, getCurrentUser } = require('../controllers/authC');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;
