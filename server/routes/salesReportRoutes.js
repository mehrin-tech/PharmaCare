import express from 'express'

import { getSalesReport }
from '../controllers/salesReportController.js'

import { protect }
from '../middleware/authMiddleware.js'

import { authorize }
from '../middleware/roleMiddleware.js'


const router = express.Router()


router.get(
    '/',
    protect,
    authorize('pharmacy'),
    getSalesReport
)


export default router