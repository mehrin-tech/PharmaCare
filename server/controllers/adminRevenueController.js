
import Order from "../models/Order.js";
import Medicine from "../models/Medicine.js";
import Pharmacy from "../models/Pharmacy.js";
import PlatformSettings from "../models/PlatformSettings.js";
import Payment from "../models/Payment.js";

export const getRevenueReport = async (req, res) => {
  try {
    // Platform settings
    const settings = await PlatformSettings.findOne();
    const COMMISSION_RATE = settings?.commissionRate ?? 10;

    // Revenue trend period
    const period = ["Daily", "Weekly", "Monthly"].includes(
      req.query.period
    )
      ? req.query.period
      : "Monthly";

    // Delivered orders only for revenue calculations
    const orders = await Order.find({
      orderStatus: "delivered",
    }).sort({ createdAt: 1 });

    let totalSales = 0;
    let totalDeliveryFees = 0;
    let platformCommission = 0;
    let pharmacyEarnings = 0;

    const pharmacyMap = new Map();
    const revenueTrendMap = new Map();

    // Calculate sales, commission, pharmacy earnings and trend
    for (const order of orders) {
      totalDeliveryFees += Number(order.deliveryFee || 0);

      const orderDate = new Date(order.createdAt);

      let trendKey;
      let trendLabel;

      if (period === "Daily") {
        trendKey = orderDate.toISOString().slice(0, 10);
        trendLabel = orderDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        });
      } else if (period === "Weekly") {
        const date = new Date(orderDate);
        const day = (date.getDay() + 6) % 7;

        date.setDate(date.getDate() - day);
        date.setHours(0, 0, 0, 0);

        trendKey = date.toISOString().slice(0, 10);
        trendLabel = `Week of ${date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })}`;
      } else {
        trendKey = `${orderDate.getFullYear()}-${String(
          orderDate.getMonth() + 1
        ).padStart(2, "0")}`;

        trendLabel = orderDate.toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        });
      }

      if (!revenueTrendMap.has(trendKey)) {
        revenueTrendMap.set(trendKey, {
          key: trendKey,
          label: trendLabel,
          revenue: 0,
        });
      }

      for (const item of order.items || []) {
        const medicine = await Medicine.findById(item.medicine);

        if (!medicine?.pharmacy) continue;

        const pharmacyId = medicine.pharmacy.toString();

        const itemSales =
          Number(item.price || 0) * Number(item.quantity || 0);

        totalSales += itemSales;
        revenueTrendMap.get(trendKey).revenue += itemSales;

        const commission =
          (itemSales * COMMISSION_RATE) / 100;

        const earnings = itemSales - commission;

        platformCommission += commission;
        pharmacyEarnings += earnings;

        if (!pharmacyMap.has(pharmacyId)) {
          pharmacyMap.set(pharmacyId, {
            pharmacyId,
            sales: 0,
            commission: 0,
            earnings: 0,
          });
        }

        const pharmacyData = pharmacyMap.get(pharmacyId);

        pharmacyData.sales += itemSales;
        pharmacyData.commission += commission;
        pharmacyData.earnings += earnings;
      }
    }

    // Pharmacy revenue summary
    const pharmacies = [];

    for (const data of pharmacyMap.values()) {
      const pharmacy = await Pharmacy.findById(data.pharmacyId);

      if (pharmacy) {
        pharmacies.push({
          pharmacyId: pharmacy._id,
          pharmacyName: pharmacy.pharmacyName,
          sales: Number(data.sales.toFixed(2)),
          commission: Number(data.commission.toFixed(2)),
          earnings: Number(data.earnings.toFixed(2)),
        });
      }
    }

    // Revenue trend chart data
    const revenueTrend = Array.from(revenueTrendMap.values())
      .sort((a, b) => a.key.localeCompare(b.key))
      .map(({ label, revenue }) => ({
        label,
        revenue: Number(revenue.toFixed(2)),
      }));

    // Payment counts by method and status
    // Counts all payment records, not only delivered orders
    const paymentCounts = await Payment.aggregate([
      {
        $group: {
          _id: {
            method: "$paymentMethod",
            status: "$status",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const paymentMethodCounts = {
      upi: {
        paid: 0,
        pending: 0,
        failed: 0,
      },
      cod: {
        paid: 0,
        pending: 0,
        failed: 0,
      },
    };

    for (const item of paymentCounts) {
      const rawMethod = item._id.method;
      const status = item._id.status;

      // Support existing UPI records and Razorpay records
      const method =
        rawMethod === "upi" || rawMethod === "razorpay"
          ? "upi"
          : rawMethod;

      if (
        paymentMethodCounts[method] &&
        Object.hasOwn(paymentMethodCounts[method], status)
      ) {
        paymentMethodCounts[method][status] = item.count;
      }
    }

    // Response
    return res.status(200).json({
      success: true,
      report: {
        totalDeliveredOrders: orders.length,
        totalSales: Number(totalSales.toFixed(2)),
        totalDeliveryFees: Number(totalDeliveryFees.toFixed(2)),
        platformCommission: Number(platformCommission.toFixed(2)),
        pharmacyEarnings: Number(pharmacyEarnings.toFixed(2)),
        commissionRate: `${COMMISSION_RATE}%`,
        pharmacies,
        revenueTrend,
        paymentMethodCounts,
        period,
      },
    });
  } catch (error) {
    console.error("Revenue report error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate revenue report",
      error: error.message,
    });
  }
};
