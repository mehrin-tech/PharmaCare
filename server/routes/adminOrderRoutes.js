import express from 'express'

import {
    getAllOrders,
    getAdminOrderDetails,getOrderStatistics
} from '../controllers/adminOrderController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get(
    '/',
    protect,
    authorize('admin'),
    getAllOrders
)
router.get(
    '/statistics',
    protect,
    authorize('admin'),
    getOrderStatistics
)
router.get(
    '/:orderId',
    protect,
    authorize('admin'),
    getAdminOrderDetails
)

export default router