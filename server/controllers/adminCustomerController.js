import User from '../models/User.js'
import Order from '../models/Order.js'
import Pharmacy from '../models/Pharmacy.js'
import Medicine from '../models/Medicine.js'
// export const getCustomers = async (req, res) => {
//   try {
//     const customers = await User.find({ role: 'customer' })
//       .select('-password')
//       .sort({ createdAt: -1 })

//     res.status(200).json({
//       success: true,
//       count: customers.length,
//       customers
//     })
//   } catch (error) {
//     console.error('Get customers error:', error)

//     res.status(500).json({
//       success: false,
//       message: 'Failed to get customers',
//       error: error.message
//     })
//   }
// }


export const getCustomers = async (req, res) => {
  try {
    // 1. Get page and limit from query parameters
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 10)
    );

    // 2. Calculate skip
    const skip = (page - 1) * limit;

    // 3. Filter
    const filter = { role: 'customer' };

    // 4. Fetch customers and total count simultaneously
    const [customers, totalCustomers] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      User.countDocuments(filter)
    ]);

    // 5. Calculate total pages
    const totalPages = Math.ceil(totalCustomers / limit);

    // 6. Send response
    res.status(200).json({
      success: true,
      count: customers.length,
      customers,
      pagination: {
        currentPage: page,
        totalPages,
        totalCustomers,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get customers error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to get customers',
      error: error.message
    });
  }
};


export const getCustomerDetails = async (req, res) => {
  try {
    const { customerId } = req.params

    const customer = await User.findOne({
      _id: customerId,
      role: 'customer'
    }).select('-password')

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      })
    }

    const orders = await Order.find({
      user: customerId
    }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      customer,
      orders
    })
  } catch (error) {
    console.error('Customer details error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to get customer details',
      error: error.message
    })
  }
}

export const updateCustomerStatus = async (req, res) => {
  try {
    const { customerId } = req.params
    const { isActive } = req.body

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive must be true or false'
      })
    }

    const customer = await User.findOne({
      _id: customerId,
      role: 'customer'
    })

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      })
    }

    customer.isActive = isActive

    await customer.save()

    res.status(200).json({
      success: true,
      message: isActive
        ? 'Customer activated successfully'
        : 'Customer deactivated successfully',
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        isActive: customer.isActive
      }
    })
  } catch (error) {
    console.error('Customer status error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update customer status',
      error: error.message
    })
  }
}