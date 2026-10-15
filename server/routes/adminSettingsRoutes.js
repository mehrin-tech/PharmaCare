import express from 'express'

import {
    getPlatformSettings,
    updatePlatformSettings
} from '../controllers/adminSettingController.js'

import {
    protect
} from '../middleware/authMiddleware.js'

import { authorize } from '../middleware/roleMiddleware.js'
const router = express.Router()


// Get settings
router.get(
    '/',
    protect,
    authorize('admin'),
    getPlatformSettings
)


// Update settings
router.patch(
    '/',
    protect,
    authorize('admin'),
    updatePlatformSettings
)


export default router