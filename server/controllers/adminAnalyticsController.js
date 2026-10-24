


import User from "../models/User.js";
import Pharmacy from "../models/Pharmacy.js";
import Order from "../models/Order.js";
import PlatformSettings from "../models/PlatformSettings.js";

export const getAdminAnalytics = async (req, res) => {
  try {
    // Current date
    const now = new Date();

    // ==============================
    // CUSTOMER ANALYTICS
    // ==============================

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const activeCustomers = await User.countDocuments({
      role: "customer",
      isActive: true,
    });

    // Customer Growth Period
    const period = ["Daily", "Weekly", "Monthly"].includes(
      req.query.period
    )
      ? req.query.period
      : "Monthly";

    let startDate;

    if (period === "Daily") {
      // Last 7 days including today
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 6
      );
    } else if (period === "Weekly") {
      // Last 28 days including today
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 27
      );
    } else {
      // Current month and previous 5 months
      startDate = new Date(
        now.getFullYear(),
        now.getMonth() - 5,
        1
      );
    }

    // Group new customer registrations by period
    const customerGrowthData = await User.aggregate([
      {
        $match: {
          role: "customer",
          createdAt: {
            $gte: startDate,
            $lte: now,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format:
                period === "Daily"
                  ? "%Y-%m-%d"
                  : period === "Weekly"
                  ? "%G-W%V"
                  : "%Y-%m",
              date: "$createdAt",
            },
          },
          customers: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const customerGrowth = customerGrowthData.map((item) => {
      let label = item._id;

      if (period === "Daily") {
        const date = new Date(`${item._id}T00:00:00`);

        label = date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        });
      } else if (period === "Monthly") {
        const [year, month] = item._id.split("-");

        label = new Date(
          Number(year),
          Number(month) - 1,
          1
        ).toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        });
      }

      return {
        label,
        customers: item.customers,
      };
    });

    // ==============================
    // PHARMACY ANALYTICS
    // ==============================

    const totalPharmacies = await Pharmacy.countDocuments();

    const approvedPharmacies = await Pharmacy.countDocuments({
      approvalStatus: "approved",
    });

    const pendingPharmacies = await Pharmacy.countDocuments({
      approvalStatus: "pending",
    });

    const rejectedPharmacies = await Pharmacy.countDocuments({
      approvalStatus: "rejected",
    });

    // ==============================
    // ORDER ANALYTICS
    // ==============================

    const totalOrders = await Order.countDocuments();

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "delivered",
    });

    const pendingOrders = await Order.countDocuments({
      orderStatus: "pending",
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: "cancelled",
    });

    // ==============================
    // REVENUE ANALYTICS
    // Delivered orders only
    // ==============================

    const deliveredOrdersData = await Order.find({
      orderStatus: "delivered",
    });

    let totalRevenue = 0;
    let todayRevenue = 0;
    let monthlyRevenue = 0;

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

    for (const order of deliveredOrdersData) {
      const subtotal = Number(order.subtotal || 0);

      totalRevenue += subtotal;

      if (order.createdAt >= startOfToday) {
        todayRevenue += subtotal;
      }

      if (order.createdAt >= startOfMonth) {
        monthlyRevenue += subtotal;
      }
    }

    // ==============================
    // PLATFORM COMMISSION
    // ==============================

    const settings = await PlatformSettings.findOne();

    const commissionRate = settings?.commissionRate ?? 10;

    const platformCommission =
      (totalRevenue * commissionRate) / 100;

    // ==============================
    // FINAL RESPONSE
    // ==============================

    return res.status(200).json({
      success: true,

      analytics: {
        customers: {
          total: totalCustomers,
          active: activeCustomers,
        },

        customerGrowth,
        customerGrowthPeriod: period,

        pharmacies: {
          total: totalPharmacies,
          approved: approvedPharmacies,
          pending: pendingPharmacies,
          rejected: rejectedPharmacies,
        },

        orders: {
          total: totalOrders,
          delivered: deliveredOrders,
          pending: pendingOrders,
          cancelled: cancelledOrders,
        },

        revenue: {
          totalRevenue: Number(totalRevenue.toFixed(2)),
          todayRevenue: Number(todayRevenue.toFixed(2)),
          monthlyRevenue: Number(monthlyRevenue.toFixed(2)),
          platformCommission: Number(
            platformCommission.toFixed(2)
          ),
          commissionRate: `${commissionRate}%`,
        },
      },
    });
  } catch (error) {
    console.error("Admin analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate analytics",
      error: error.message,
    });
  }
};
