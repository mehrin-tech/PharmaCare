import express from 'express'
import {createOrder, getMyOrders,getOrderDetails,updateOrderStatus,trackOrder,getPharmacyOrders,cancelOrder,confirmCashReceived} from '../controllers/orderController.js'


import {protect} from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'
//import { createPartFromCodeExecutionResult } from '@google/genai'

const router=express.Router()

router.post('/',protect,authorize('customer'),createOrder)
router.get('/my',protect,authorize('customer'),getMyOrders)
router.get('/pharmacy',protect,authorize('pharmacy'),getPharmacyOrders)

router.get('/:orderId',protect,authorize('customer'),getOrderDetails)
router.get('/:orderId/track',protect,authorize('customer'),trackOrder)
router.patch('/:orderId/status',protect,authorize('pharmacy','admin'),updateOrderStatus)
router.patch(
  "/:orderId/cancel",
  protect,
  cancelOrder
);
router.patch(
  "/:orderId/confirm-cash",
  protect,
  authorize("pharmacy"),
  confirmCashReceived
);
export default router