import express from 'express'

import {
    createComplaint,
    getMyComplaints,
    getAllComplaints,
    getComplaintDetails,
    updateComplaint
} from '../controllers/complaintController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router = express.Router()

// Customer
router.post(
    '/',
    protect,
    authorize('customer'),
    createComplaint
)

router.get(
    '/my',
    protect,
    authorize('customer'),
    getMyComplaints
)

// Admin
router.get(
    '/',
    protect,
    authorize('admin'),
    getAllComplaints
)

router.get(
    '/:complaintId',
    protect,
    authorize('admin'),
    getComplaintDetails
)

router.patch(
    '/:complaintId',
    protect,
    authorize('admin'),
    updateComplaint
)

export default router