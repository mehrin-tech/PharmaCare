import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import pharmacyRoutes from './routes/pharmacyRoutes.js'
import adminPharmacyRoutes from './routes/adminPharmacyRoutes.js'
import medicineRoutes from './routes/medicineRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import prescriptionRoutes from './routes/prescriptionRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import notificationRoutes from './routes/notificationRoutes.js'
import salesReportRoutes from './routes/salesReportRoutes.js'
import adminCustomerRoutes from './routes/adminCustomerRoutes.js'
import adminOrderRoutes from './routes/adminOrderRoutes.js'
import adminRevenueRoutes from './routes/adminRevenueRoutes.js'
import adminAnalyticsRoutes from './routes/adminAnalyticsRoutes.js'
import complaintRoutes from './routes/complaintRoutes.js'
import adminReportRoutes from './routes/adminReportRoutes.js'
import adminSettingsRoutes from './routes/adminSettingsRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
dotenv.config()

const app=express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/pharmacy/sales',salesReportRoutes)
app.use('/api/pharmacy',pharmacyRoutes)
app.use('/api/admin',adminPharmacyRoutes)
app.use('/api/medicines',medicineRoutes)
app.use('/api/wishlist',wishlistRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/addresses',addressRoutes)
app.use('/api/prescriptions',prescriptionRoutes)
app.use('/api/checkout',checkoutRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/payments',paymentRoutes)
app.use('/api/reviews',reviewRoutes)
app.use('/api/notifications',notificationRoutes)
app.use('/api/admin/customers', adminCustomerRoutes)
app.use('/api/admin/orders', adminOrderRoutes)
app.use('/api/admin/revenue', adminRevenueRoutes)
app.use('/api/admin/analytics', adminAnalyticsRoutes)
app.use('/api/complaints', complaintRoutes)
app.use('/api/admin/reports',adminReportRoutes)
app.use(
    '/api/admin/settings',
    adminSettingsRoutes
)
app.use('/api/profile',profileRoutes)

app.get('/api/health',(req,res)=>{
    res.json({
        success:true,
        message:"Pharmacare API is running"
    })
})

const PORT=process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
