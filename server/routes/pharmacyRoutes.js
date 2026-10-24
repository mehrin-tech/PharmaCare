import express from 'express'
import { registerPharmacy,uploadLicense, getNearbyPharmacies,updatePharmacyLocation,getPharmacyDetails ,updatePharmacy, getPharmacyRegistrationStatus,} from '../controllers/pharmacyController.js'
import upload from '../middleware/uploadMiddleware.js'
import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router=express.Router()

router.post('/register',upload.single('image'),registerPharmacy)
router.get('/nearby',protect,authorize('customer') ,getNearbyPharmacies)
router.get('/:pharmacyId',protect,authorize('customer'),getPharmacyDetails)
// Pharmacy → Update Location
router.put(
    '/location',
    protect,
    authorize('pharmacy'),
    updatePharmacyLocation
)
router.post('/:pharmacyId/license',upload.single('license'),uploadLicense)
router.patch(
  "/:pharmacyId",
  upload.single("image"),
  updatePharmacy
);

router.get(
  "/registration-status/:pharmacyId",
  getPharmacyRegistrationStatus
);
export default router;
