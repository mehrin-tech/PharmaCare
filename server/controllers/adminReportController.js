import User from '../models/User.js'
import Order from '../models/Order.js'
import Pharmacy from '../models/Pharmacy.js'
import Medicine from '../models/Medicine.js'
export const getCustomerReport = async (req, res) => {

    try {

        const customers = await User.find({
            role: 'customer'
        }).select('-password')

        const report = []

        for (const customer of customers) {

            const orders = await Order.find({
                user: customer._id
            })

            let totalSpent = 0

            for (const order of orders) {

                if (order.paymentStatus === 'paid') {
                    totalSpent += order.totalAmount
                }
            }

            report.push({
                customerId: customer._id,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                isActive: customer.isActive,
                totalOrders: orders.length,
                totalSpent,
                joinedAt: customer.createdAt
            })
        }

        return res.status(200).json({
            success: true,
            count: report.length,
            report
        })

    } catch (error) {

        console.error(
            'Customer report error:',
            error
        )

        return res.status(500).json({
            success: false,
            message: 'Failed to generate customer report',
            error: error.message
        })
    }
}
export const getPharmacyReport = async (req, res) => {

    try {

        const pharmacies = await Pharmacy.find()
            .populate('user', 'name email phone isActive')

              const orders = await Order.find({
                orderStatus: 'delivered'
            })
        const report = []

        for (const pharmacy of pharmacies) {

            // Medicines belonging to this pharmacy
            const medicines = await Medicine.find({
                pharmacy: pharmacy._id
            }).select('_id')

            const medicineIds=new Set(
                medicines.map(medicine=>medicine._id.toString())
            )
            // const medicineIds = medicines.map(
            //     medicine => medicine._id.toString()
            // )

            // All delivered orders
          

            let totalSales = 0
            let totalMedicinesSold = 0
            const orderIds = new Set()

            for (const order of orders) {

                let pharmacyOrderAmount = 0

                for (const item of order.items) {

                    const medicineId =
                        item.medicine.toString()

                    if (medicineIds.has(medicineId)) {

                        const itemTotal =
                            item.price * item.quantity

                        pharmacyOrderAmount += itemTotal
                        totalSales += itemTotal
                        totalMedicinesSold += item.quantity
                    }
                }

                if (pharmacyOrderAmount > 0) {
                    orderIds.add(order._id.toString())
                }
            }

            report.push({

                pharmacyId: pharmacy._id,

                pharmacyName: pharmacy.pharmacyName,

                ownerName: pharmacy.ownerName,

                email: pharmacy.email,

                phone: pharmacy.phone,

                pharmacyType: pharmacy.pharmacyType,

                licenseNumber: pharmacy.licenseNumber,

                approvalStatus: pharmacy.approvalStatus,

                isActive: pharmacy.isActive,

                totalMedicines: medicines.length,

                totalOrders: orderIds.size,

                totalMedicinesSold,

                totalSales

            })
        }

        return res.status(200).json({

            success: true,

            count: report.length,

            report

        })

    } catch (error) {

        console.error(
            'Pharmacy report error:',
            error
        )

        return res.status(500).json({

            success: false,

            message: 'Failed to generate pharmacy report',

            error: error.message

        })
    }
}
export const getOrderReport = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate('user', 'name email phone')
            .populate('address')
            .populate('items.medicine', 'name price pharmacy')
            .sort({ createdAt: -1 })

        const report = orders.map(order => ({

            orderId: order._id,

            customer: order.user,

            items: order.items,

            subtotal: order.subtotal,

            deliveryFee: order.deliveryFee,

            totalAmount: order.totalAmount,

            paymentStatus: order.paymentStatus,

            orderStatus: order.orderStatus,

            orderDate: order.createdAt

        }))

        return res.status(200).json({

            success: true,

            count: report.length,

            report

        })

    } catch (error) {

        console.error(
            'Order report error:',
            error
        )

        return res.status(500).json({

            success: false,

            message: 'Failed to generate order report',

            error: error.message

        })
    }
}