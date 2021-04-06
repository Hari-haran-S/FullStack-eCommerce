import express from 'express';
const router = express.Router();
import { addOrderItem, getOrderID, updateOrdertoPaid  } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItem)
router.route('/:id').get(protect, getOrderID)
router.route('/:id/pay').put(protect, updateOrdertoPaid)

export default router