import express from 'express'

import { addAddress,getMyAddress,getAddressDetails,updateAddress,setDefaultAddress,deleteAddress } from '../controllers/addressController.js'

import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router=express.Router()

router.post('/',protect,authorize('customer'),addAddress)
router.get('/my',protect,authorize('customer'),getMyAddress)
router.get('/:addressId',protect,authorize('customer'),getAddressDetails)
router.patch('/:addressId',protect,authorize('customer'),updateAddress)
router.patch('/:addressId/default',protect,authorize('customer'),setDefaultAddress)
router.delete('/:addressId',protect,authorize('customer'),deleteAddress)

export default router