import Medicine from '../models/Medicine.js'
import Order from '../models/Order.js'
import Pharmacy from '../models/Pharmacy.js'


export const getSalesReport = async (req, res) => {

    try {

        // ==========================================
        // 1. FIND PHARMACY
        // ==========================================

        const pharmacy = await Pharmacy.findOne({
            user: req.user.userId
        })

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }


        // ==========================================
        // 2. FIND MEDICINES BELONGING TO PHARMACY
        // ==========================================

        const medicines = await Medicine.find({
            pharmacy: pharmacy._id
        }).select('_id name price')


        const medicineIds = medicines.map(
            medicine => medicine._id.toString()
        )


        // ==========================================
        // 3. GET ORDERS
        // ==========================================

        const orders = await Order.find({
            orderStatus: 'delivered'
        }).sort({
            createdAt: -1
        })


        // ==========================================
        // 4. CALCULATE SALES
        // ==========================================

        let totalSales = 0
        let totalMedicinesSold = 0

        const orderIds = new Set()


        for (const order of orders) {

            let pharmacyOrderAmount = 0


            for (const item of order.items) {

                const medicineId =
                    item.medicine.toString()


                // Check whether medicine belongs
                // to current pharmacy

                if (medicineIds.includes(medicineId)) {

                    const itemTotal =
                        item.price * item.quantity

                    pharmacyOrderAmount += itemTotal

                    totalSales += itemTotal

                    totalMedicinesSold += item.quantity
                }
            }


            // If this order contains at least
            // one medicine from this pharmacy

            if (pharmacyOrderAmount > 0) {
                orderIds.add(order._id.toString())
            }
        }


        // ==========================================
        // 5. TODAY'S SALES
        // ==========================================

        const now = new Date()

        const startOfToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        )

        let todaySales = 0


        for (const order of orders) {

            if (order.createdAt < startOfToday) {
                continue
            }


            for (const item of order.items) {

                const medicineId =
                    item.medicine.toString()


                if (medicineIds.includes(medicineId)) {

                    todaySales +=
                        item.price * item.quantity
                }
            }
        }


        // ==========================================
        // 6. MONTHLY SALES
        // ==========================================

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        let monthlySales = 0


        for (const order of orders) {

            if (order.createdAt < startOfMonth) {
                continue
            }


            for (const item of order.items) {

                const medicineId =
                    item.medicine.toString()


                if (medicineIds.includes(medicineId)) {

                    monthlySales +=
                        item.price * item.quantity
                }
            }
        }


        // ==========================================
        // 7. RESPONSE
        // ==========================================

        return res.status(200).json({

            success: true,

            pharmacy: {
                id: pharmacy._id,
                pharmacyName: pharmacy.pharmacyName
            },

            report: {

                totalOrders: orderIds.size,

                totalSales,

                totalMedicinesSold,

                todaySales,

                monthlySales

            }

        })


    } catch (error) {

        console.error(
            'Sales report error:',
            error
        )

        return res.status(500).json({

            success: false,

            message: 'Failed to generate sales report',

            error: error.message

        })
    }
}