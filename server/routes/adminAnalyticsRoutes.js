import express from 'express'

import {
    getAdminAnalytics
} from '../controllers/adminAnalyticsController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get(
    '/',
    protect,
    authorize('admin'),
    getAdminAnalytics
)

export default router