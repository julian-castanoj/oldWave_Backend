import { Router } from 'express';
import productsController from '../controllers/products.controller';

const router = Router();

router.get('/:id', productsController.getProduct);
router.get('/', productsController.matchProduct);

export default router;
