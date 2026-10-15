import User from '../models/User.js'
import Pharmacy from '../models/Pharmacy.js'
import Order from '../models/Order.js'
import PlatformSettings from '../models/PlatformSettings.js'

export const getAdminAnalytics = async (req, res) => {
    try {
        // Customers
        const totalCustomers = await User.countDocuments({
            role: 'customer'
        })

        const activeCustomers = await User.countDocuments({
            role: 'customer',
            isActive: true
        })

        // Pharmacies
        const totalPharmacies = await Pharmacy.countDocuments()

        const approvedPharmacies = await Pharmacy.countDocuments({
            approvalStatus: 'approved'
        })

        const pendingPharmacies = await Pharmacy.countDocuments({
            approvalStatus: 'pending'
        })

        const rejectedPharmacies = await Pharmacy.countDocuments({
            approvalStatus: 'rejected'
        })

        // Orders
        const totalOrders = await Order.countDocuments()

        const deliveredOrders = await Order.countDocuments({
            orderStatus: 'delivered'
        })

        const pendingOrders = await Order.countDocuments({
            orderStatus: 'pending'
        })

        const cancelledOrders = await Order.countDocuments({
            orderStatus: 'cancelled'
        })

        // Revenue
        const deliveredOrdersData = await Order.find({
            orderStatus: 'delivered'
        })

        let totalRevenue = 0
        let todayRevenue = 0
        let monthlyRevenue = 0

        const now = new Date()

        const startOfToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        )

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        for (const order of deliveredOrdersData) {
            totalRevenue += order.subtotal || 0

            if (order.createdAt >= startOfToday) {
                todayRevenue += order.subtotal || 0
            }

            if (order.createdAt >= startOfMonth) {
                monthlyRevenue += order.subtotal || 0
            }
        }

        // // Commission
        // const commissionRate = 10

        // const platformCommission =
        //     totalRevenue * commissionRate / 100

        // Commission
const settings = await PlatformSettings.findOne()

const commissionRate =
    settings?.commissionRate ?? 10

const platformCommission =
    totalRevenue * commissionRate / 100

        return res.status(200).json({
            success: true,

            analytics: {
                customers: {
                    total: totalCustomers,
                    active: activeCustomers
                },

                pharmacies: {
                    total: totalPharmacies,
                    approved: approvedPharmacies,
                    pending: pendingPharmacies,
                    rejected: rejectedPharmacies
                },

                orders: {
                    total: totalOrders,
                    delivered: deliveredOrders,
                    pending: pendingOrders,
                    cancelled: cancelledOrders
                },

                revenue: {
                    totalRevenue,
                    todayRevenue,
                    monthlyRevenue,
                    platformCommission,
                    commissionRate: `${commissionRate}%`
                }
            }
        })

    } catch (error) {
        console.log('Admin analytics error:', error)

        return res.status(500).json({
            success: false,
            message: 'failed to generate analytics',
            error: error.message
        })
    }
}