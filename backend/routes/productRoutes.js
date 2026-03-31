import express from 'express';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '../controller/productController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;