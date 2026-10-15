import express from 'express'

import { addToWishlist,getMyWishlist,removeFromeWishlist } from '../controllers/wishlistController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router=express.Router()

router.post('/',protect,authorize('customer'),addToWishlist)
router.get('/my',protect,authorize('customer'),getMyWishlist)
router.delete('/:medicineId',protect,authorize('customer'),removeFromeWishlist)

export default router;