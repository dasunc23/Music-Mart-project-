// productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProducts, getProductById, searchProducts,
  addProduct, updateProduct, deleteProduct
} = require('../controllers/product');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

router.post('/', authMiddleware, adminMiddleware, addProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;

