import express from 'express'

import {
  getCustomers,
  getCustomerDetails,
  updateCustomerStatus
} from '../controllers/adminCustomerController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.get(
  '/',
  protect,
  authorize('admin'),
  getCustomers
)

router.get(
  '/:customerId',
  protect,
  authorize('admin'),
  getCustomerDetails
)

router.patch(
  '/:customerId/status',
  protect,
  authorize('admin'),
  updateCustomerStatus
)

export default router