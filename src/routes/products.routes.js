import { Router } from 'express';
import productsController from '../controllers/products.controller';

const router = Router();

router.get('/', productsController.getProducts);
router.get('/getRecentProduct', productsController.getRecentProducts)

export default router;
