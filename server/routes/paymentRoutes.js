import express from 'express'

import { createPayment,paymentSuccess,paymentFailed } from '../controllers/paymentController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router=express.Router()

//create paymnt
router.post('/',protect,authorize('customer'),createPayment)
router.post('/:paymentId/success',protect,authorize('customer'),paymentSuccess)
router.patch('/:paymentId/failed',protect,authorize('customer'),paymentFailed)


export default router;