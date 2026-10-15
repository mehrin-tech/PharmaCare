import express from 'express'

import {
    getCustomerReport,getPharmacyReport,getOrderReport
} from '../controllers/adminReportController.js'

import {
    protect,
    
} from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'
const router = express.Router()

router.get(
    '/customers',
    protect,
    authorize('admin'),
    getCustomerReport
)
router.get(
    '/pharmacies',
    protect,
    authorize('admin'),
    getPharmacyReport
)
router.get(
    '/orders',
    protect,
    authorize('admin'),
    getOrderReport
)
export default router