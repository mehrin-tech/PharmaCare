// import Medicine from '../models/Medicine.js'
// import Order from '../models/Order.js'
// import Pharmacy from '../models/Pharmacy.js'


// export const getSalesReport = async (req, res) => {

//     try {

//         // ==========================================
//         // 1. FIND PHARMACY
//         // ==========================================

//         const pharmacy = await Pharmacy.findOne({
//             user: req.user.userId
//         })

//         if (!pharmacy) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Pharmacy not found'
//             })
//         }


//         // ==========================================
//         // 2. FIND MEDICINES BELONGING TO PHARMACY
//         // ==========================================

//         const medicines = await Medicine.find({
//             pharmacy: pharmacy._id
//         }).select('_id name price')


//         const medicineIds = medicines.map(
//             medicine => medicine._id.toString()
//         )


//         // ==========================================
//         // 3. GET ORDERS
//         // ==========================================

//         const orders = await Order.find({
//             orderStatus: 'delivered'
//         }).populate('user','name')
//         .sort({
//             createdAt: -1
//         })


//         // ==========================================
//         // 4. CALCULATE SALES
//         // ==========================================

//         let totalSales = 0
//         let totalMedicinesSold = 0

//         const orderIds = new Set()


//         for (const order of orders) {

//             let pharmacyOrderAmount = 0


//             for (const item of order.items) {

//                 const medicineId =
//                     item.medicine.toString()


//                 // Check whether medicine belongs
//                 // to current pharmacy

//                 if (medicineIds.includes(medicineId)) {

//                     const itemTotal =
//                         item.price * item.quantity

//                     pharmacyOrderAmount += itemTotal

//                     totalSales += itemTotal

//                     totalMedicinesSold += item.quantity
//                 }
//             }


//             // If this order contains at least
//             // one medicine from this pharmacy

//             if (pharmacyOrderAmount > 0) {
//                 orderIds.add(order._id.toString())
//             }
//         }


//         // ==========================================
//         // 5. TODAY'S SALES
//         // ==========================================

//         const now = new Date()

//         const startOfToday = new Date(
//             now.getFullYear(),
//             now.getMonth(),
//             now.getDate()
//         )

//         let todaySales = 0


//         for (const order of orders) {

//             if (order.createdAt < startOfToday) {
//                 continue
//             }


//             for (const item of order.items) {

//                 const medicineId =
//                     item.medicine.toString()


//                 if (medicineIds.includes(medicineId)) {

//                     todaySales +=
//                         item.price * item.quantity
//                 }
//             }
//         }


//         // ==========================================
//         // 6. MONTHLY SALES
//         // ==========================================

//         const startOfMonth = new Date(
//             now.getFullYear(),
//             now.getMonth(),
//             1
//         )

//         let monthlySales = 0


//         for (const order of orders) {

//             if (order.createdAt < startOfMonth) {
//                 continue
//             }


//             for (const item of order.items) {

//                 const medicineId =
//                     item.medicine.toString()


//                 if (medicineIds.includes(medicineId)) {

//                     monthlySales +=
//                         item.price * item.quantity
//                 }
//             }
//         }


//         // ==========================================
//         // 7. RESPONSE
//         // ==========================================

//         return res.status(200).json({

//             success: true,

//             pharmacy: {
//                 id: pharmacy._id,
//                 pharmacyName: pharmacy.pharmacyName
//             },

//             report: {

//                 totalOrders: orderIds.size,

//                 totalSales,

//                 totalMedicinesSold,

//                 todaySales,

//                 monthlySales

//             }

//         })


//     } catch (error) {

//         console.error(
//             'Sales report error:',
//             error
//         )

//         return res.status(500).json({

//             success: false,

//             message: 'Failed to generate sales report',

//             error: error.message

//         })
//     }
// }
import Medicine from '../models/Medicine.js';
import Order from '../models/Order.js';
import Pharmacy from '../models/Pharmacy.js';

export const getSalesReport = async (req, res) => {
  try {
    // 1. Find pharmacy
    const pharmacy = await Pharmacy.findOne({
      user: req.user.userId,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: 'Pharmacy not found',
      });
    }

    // 2. Find pharmacy medicines
    const medicines = await Medicine.find({
      pharmacy: pharmacy._id,
    }).select('_id name price category');

    const medicineIds = medicines.map(
      (medicine) => medicine._id.toString()
    );
    const medicineIdSet = new Set(medicineIds);

    // 3. Fetch all delivered orders for existing totals
    const orders = await Order.find({
      orderStatus: 'delivered',
    }).sort({ createdAt: -1 });

    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // 4. Calculate existing sales totals
    let totalSales = 0;
    let totalMedicinesSold = 0;
    let todaySales = 0;
    let monthlySales = 0;

    const orderIds = new Set();

    for (const order of orders) {
      let pharmacyOrderAmount = 0;

      for (const item of order.items) {
        const medicineId = item.medicine.toString();

        if (!medicineIdSet.has(medicineId)) continue;

        const itemTotal = Number(item.price || 0) *
          Number(item.quantity || 0);

        pharmacyOrderAmount += itemTotal;
        totalSales += itemTotal;
        totalMedicinesSold += Number(item.quantity || 0);

        if (order.createdAt >= startOfToday) {
          todaySales += itemTotal;
        }

        if (order.createdAt >= startOfMonth) {
          monthlySales += itemTotal;
        }
      }

      if (pharmacyOrderAmount > 0) {
        orderIds.add(order._id.toString());
      }
    }

    // 5. Prepare date-wise sales for the last 6 months
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth() - 5,
      1
    );

    const dateKey = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
    };

    const salesMap = new Map();

    // Initialize dates with zero so dates without sales still appear
    for (
      let date = new Date(startDate);
      date <= startOfToday;
      date.setDate(date.getDate() + 1)
    ) {
      salesMap.set(dateKey(date), 0);
    }

    // Fetch delivered orders within the chart date range
    const trendOrders = await Order.find({
      orderStatus: 'delivered',
      createdAt: {
        $gte: startDate,
        $lt: new Date(startOfToday.getTime() + 86400000),
      },
    });

    for (const order of trendOrders) {
      const key = dateKey(new Date(order.createdAt));

      for (const item of order.items) {
        const medicineId = item.medicine.toString();

        if (!medicineIdSet.has(medicineId)) continue;

        const itemTotal = Number(item.price || 0) *
          Number(item.quantity || 0);

        salesMap.set(
          key,
          (salesMap.get(key) || 0) + itemTotal
        );
      }
    }

    const salesTrend = Array.from(
      salesMap,
      ([date, sales]) => ({ date, sales })
    );
    
    // 6. Calculate Top Selling Medicines

const medicineSalesMap = new Map();

for (const order of orders) {
  for (const item of order.items) {
    const medicineId = item.medicine.toString();

    if (!medicineIdSet.has(medicineId)) continue;

    const medicine = medicines.find(
      (med) => med._id.toString() === medicineId
    );

    if (!medicine) continue;

    const current = medicineSalesMap.get(medicineId) || {
      medicineId,
      medicineName: medicine.name,
      category: medicine.category || 'Other',
      unitsSold: 0,
      revenue: 0,
    };

    current.unitsSold += Number(item.quantity || 0);

    current.revenue +=
      Number(item.price || 0) * Number(item.quantity || 0);

    medicineSalesMap.set(medicineId, current);
  }
}

const topSellingMedicines = Array.from(
  medicineSalesMap.values()
)
  .sort((a, b) => b.unitsSold - a.unitsSold)
  .slice(0, 5);

    // 6. Response
    return res.status(200).json({
      success: true,

      pharmacy: {
        id: pharmacy._id,
        pharmacyName: pharmacy.pharmacyName,
      },

      report: {
        totalOrders: orderIds.size,
        totalSales,
        totalMedicinesSold,
        todaySales,
        monthlySales,
        salesTrend,
        topSellingMedicines
      },
    });
  } catch (error) {
    console.error('Sales report error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to generate sales report',
      error: error.message,
    });
  }
};