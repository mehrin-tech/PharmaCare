import express from 'express'
import { registerUser ,loginUser,getMe,resetPharmacyPassword,updateProfile,forgotPassword,resetPassword} from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getMe)
router.get('/admin-test',protect,authorize('admin'),(req,res)=>{
    res.json({
        success:true,
        message:"welcome Admin",
        user:req.user
    })
})

router.get('/pharmacy-test',protect,authorize('pharmacy'),(req,res)=>{
    res.json({
        success:true,
        message:'Welcom Pharmacy',
        user:req.user
    })
})

router.get('/customer-test',protect,authorize('customer'),(req,res)=>{
    res.json({
        success:true,
        message:"Welcome Customer",
        user:req.user
    })
})
router.put('/profile',protect,authorize('customer','pharmacy'),updateProfile)
router.patch(
    '/reset-pharmacy-password',
    resetPharmacyPassword
)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)
export default router;