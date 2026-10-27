import Order from '../models/Order.js'

// Get all orders with pagination
export const getAllOrders = async (req, res) => {
  try {
    // 1. Get page and limit
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 10)
    );

    // 2. Calculate skip
    const skip = (page - 1) * limit;

    // 3. Fetch orders and total count
    const [orders, totalOrders] = await Promise.all([
      Order.find()
        .populate("user", "name email phone")
        .populate("address")
        .populate("items.medicine", "name price pharmacy")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Order.countDocuments(),
    ]);

    // 4. Calculate total pages
    const totalPages = Math.ceil(totalOrders / limit);

    // 5. Send response
    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log("get all orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};



export const getAdminOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params

        const order = await Order.findById(orderId)
            .populate('user', 'name email phone')
            .populate('address')
            .populate('items.medicine', 'name price pharmacy')

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'order not found'
            })
        }

        return res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        console.log('get admin order details error:', error)

        return res.status(500).json({
            success: false,
            message: 'failed to fetch order details',
            error: error.message
        })
    }
}

export const getOrderStatistics = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments()

        const pendingOrders = await Order.countDocuments({
            orderStatus: 'pending'
        })

      const acceptedOrders = await Order.countDocuments({
    orderStatus: 'accepted'
})

const preparingOrders = await Order.countDocuments({
    orderStatus: 'preparing'
})

const packedOrders = await Order.countDocuments({
    orderStatus: 'packed'
})

        const outForDeliveryOrders = await Order.countDocuments({
            orderStatus: 'out_for_delivery'
        })

        const deliveredOrders = await Order.countDocuments({
            orderStatus: 'delivered'
        })

        const cancelledOrders = await Order.countDocuments({
            orderStatus: 'cancelled'
        })

        const paidOrders = await Order.countDocuments({
            paymentStatus: 'paid'
        })

        const pendingPayments = await Order.countDocuments({
            paymentStatus: 'pending'
        })

        return res.status(200).json({
            success: true,
            statistics: {
                totalOrders,
                pendingOrders,
                acceptedOrders,
                preparingOrders,
                packedOrders,
                outForDeliveryOrders,
                deliveredOrders,
                cancelledOrders,
                paidOrders,
                pendingPayments
            }
        })

    } catch (error) {
        console.log('order statistics error:', error)

        return res.status(500).json({
            success: false,
            message: 'failed to get order statistics',
            error: error.message
        })
    }
}