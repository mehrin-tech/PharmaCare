import express from 'express'
import { addReview,getPharmacyReviews } from '../controllers/reviewController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router=express.Router()

router.post('/',protect,authorize('customer'),addReview)

router.get('/pharmacy/:pharmacyId',getPharmacyReviews)

export default router