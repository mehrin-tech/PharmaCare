import express from 'express'

import { uploadPrescription,getMyPrescription,getPendingPrescriptions,getAllPharmacyPrescriptions,approvePrescription,rejectPrescription

 } from '../controllers/prescriptionController.js'

 import { protect } from '../middleware/authMiddleware.js'
 import { authorize } from '../middleware/roleMiddleware.js'

 import upload from '../middleware/uploadMiddleware.js'
 const router=express.Router()

 router.post('/',protect,authorize('customer'),upload.single('prescription'),uploadPrescription)
 router.get('/my',protect,authorize('customer'),getMyPrescription)
router.get(
  "/pharmacy/all",
  protect,
  authorize("pharmacy"),
  getAllPharmacyPrescriptions
);
 router.get('/pending',protect,authorize('pharmacy'),getPendingPrescriptions)
router.patch('/:prescriptionId/approve',protect,authorize('pharmacy'),approvePrescription)
router.patch('/:prescriptionId/reject',protect,authorize('pharmacy'),rejectPrescription)

 export default router