import express from 'express'
import { getMyNotifications,markNotificationAsRead,markAllNotificationsAsRead } from '../controllers/notificationController.js'

import { protect } from '../middleware/authMiddleware.js'
import { useInRouterContext } from 'react-router-dom'
const router=express.Router()

router.get('/my',protect,getMyNotifications)
router.patch('/:notificationId/read',protect,markNotificationAsRead)
router.patch('/read-all',protect,markAllNotificationsAsRead)

export default router