import express from 'express'
import { getPendingPharmacies,
    getPharmacyDetails,
    approvePharmacy,
    rejectPharmacy,
getAllPharmacies,
updatePharmacyStatus } from '../controllers/adminPharmacyController.js'
import { protect } from '../middleware/authMiddleware.js'
import {authorize} from '../middleware/roleMiddleware.js'
const router=express.Router()

router.get('/pharmacies/pending',protect,authorize('admin'),getPendingPharmacies)
router.get('/pharmacies/:pharmacyId',protect,authorize('admin'),getPharmacyDetails)
router.patch('/pharmacies/:pharmacyId/approve',protect,authorize('admin'),approvePharmacy)
router.patch('/pharmacies/:pharmacyId/reject',protect,authorize('admin'),rejectPharmacy)
router.get(
    '/pharmacies',
    protect,
    authorize('admin'),
    getAllPharmacies
)

router.patch(
    '/pharmacies/:pharmacyId/status',
    protect,
    authorize('admin'),
    updatePharmacyStatus
)

export default router