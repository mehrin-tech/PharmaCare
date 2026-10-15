import express from 'express'

import { addMedicine ,getMyMedicines,updateMedicine,deleteMedicine,searchMedicines,compareMedicinePrices,getMedicineDetails,getMedicinesByPharmacy} from '../controllers/medicineController.js'
import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

import {
  getAllActiveMedicines,
  // other functions...
} from "../controllers/medicineController.js";
import upload from "../middleware/uploadMiddleware.js";
const router=express.Router()

router.post('/',protect,authorize('pharmacy'), upload.single("image"),addMedicine)
router.get('/my',protect,authorize('pharmacy'),getMyMedicines)
router.get("/active", getAllActiveMedicines);
router.get('/search',searchMedicines)
router.get('/compare',compareMedicinePrices)
router.get('/:medicineId',getMedicineDetails)
router.get("/pharmacy/:pharmacyId", getMedicinesByPharmacy);
router.patch('/:medicineId',protect,authorize('pharmacy'),updateMedicine)
router.delete('/:medicineId',protect,authorize('pharmacy'),deleteMedicine)

export default router