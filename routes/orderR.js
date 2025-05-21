const express = require('express');
const { createOrder, getOrders, getOrderById } = require('../controllers/order');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderById);

module.exports = router;
