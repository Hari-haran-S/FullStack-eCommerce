import express from 'express';
const router = express.Router();
import { addOrderItem, getOrderID, updateOrdertoPaid, getMyOrders } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItem)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderID)
router.route('/:id/pay').put(protect, updateOrdertoPaid)

export default router