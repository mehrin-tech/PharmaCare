import express from 'express'

import {
    getRevenueReport
} from '../controllers/adminRevenueController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get(
    '/',
    protect,
    authorize('admin'),
    getRevenueReport
)

export default router