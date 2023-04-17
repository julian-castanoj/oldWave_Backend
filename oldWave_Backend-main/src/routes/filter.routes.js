import { Router } from 'express';
import filterController from '../controllers/filter.controller';

const router = Router();

router.get('/', filterController.getAllFilters);
//router.get('/:category', filterController.getProductsByCategory);

export default router;