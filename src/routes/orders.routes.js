import { Router } from 'express';
import ordersController from '../controllers/orders.controller'

const router = Router();

router.post('/', ordersController.createOrder);
router.get('/:idUser', ordersController.getOrderById)
router.get('/send/email', ordersController.sendEmail)


export default router;