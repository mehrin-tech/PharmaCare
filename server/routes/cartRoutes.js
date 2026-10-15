import express from 'express'

import { addToCart,getMyCart,updateCart,removeFromCart,clearCart } from '../controllers/cartController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router=express.Router()

router.post('/',protect,authorize('customer'),addToCart)
router.get('/my',protect,authorize('customer'),getMyCart)
router.patch('/:medicineId',protect,authorize('customer'),updateCart)
router.delete('/:medicineId',protect,authorize('customer'),removeFromCart)
router.delete('/clear/all',protect,authorize('customer'),clearCart)

export default router