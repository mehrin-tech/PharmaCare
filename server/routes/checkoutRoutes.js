import express from 'express'

import { getCheckout } from '../controllers/checkoutController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router=express.Router()

router.get('/',protect,authorize('customer'),getCheckout)

export default router