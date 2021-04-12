import express from 'express';
const router = express.Router();
import { addOrderItem, getOrderID, updateOrdertoPaid, 
    getMyOrders, getOrders,updateOrdertoDelivered } from '../controllers/orderController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItem).get(protect,admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderID)
router.route('/:id/pay').put(protect, updateOrdertoPaid)
router.route('/:id/deliver').put(protect,admin, updateOrdertoDelivered)

export default router