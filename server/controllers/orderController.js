import Cart from '../models/Cart.js'
import Address from '../models/Address.js'
import Medicine from '../models/Medicine.js'
import Prescription from '../models/Prescription.js'
import Order from '../models/Order.js'
import Pharmacy from '../models/Pharmacy.js'
import User from '../models/User.js'
import { createNotification } from '../services/notificationService.js'
import { sendEmail } from '../services/emailService.js'


export const createOrder = async (req, res) => {
    try {

        const userId = req.user.userId
        const {pharmacyId,deliveryMethod='standard',paymentMethod}=req.body
         // =========================
        // VALIDATE PAYMENT METHOD
        // =========================

        if (!paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Payment method is required'
            })
        }

        if (!['cod', 'razorpay'].includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid payment method'
            })
        }


        // =========================
        // GET CART
        // =========================

        const cart = await Cart.findOne({
            user: userId
        })

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'cart is empty'
            })
        }


        // =========================
        // GET DEFAULT ADDRESS
        // =========================

        const address = await Address.findOne({
            user: userId,
            isDefault: true
        })

        if (!address) {
            return res.status(400).json({
                success: false,
                message: 'please add a default address'
            })
        }

         // =========================
        // VALIDATE PHARMACY
        // =========================

        if (!pharmacyId) {
            return res.status(400).json({
                success: false,
                message: 'Please select a pharmacy'
            })
        }

        const pharmacy = await Pharmacy.findById(pharmacyId)

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }


        // =========================
        // CALCULATE ORDER
        // =========================

        let subtotal = 0

        const orderItems = []


        for (const item of cart.items) {

            const medicine = await Medicine.findById(item.medicine)

            if (!medicine) {
                return res.status(404).json({
                    success: false,
                    message: 'Medicine not found'
                })
            }


            // CHECK STOCK

            if (medicine.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Only ${medicine.stock} units of ${medicine.name} are available`
                })
            }


            // PRESCRIPTION CHECK

            if (medicine.prescriptionRequired) {

                const approvedPrescription =
                    await Prescription.findOne({
                        user: userId,
                        medicine: medicine._id,
        pharmacy: medicine.pharmacy,
                        status: 'approved'
                    })

                if (!approvedPrescription) {
                    return res.status(403).json({
                        success: false,
                        message: `Approved prescription required for ${medicine.name}`
                    })
                }
            }


            // CALCULATE ITEM TOTAL

            const itemTotal =
                medicine.price * item.quantity

            subtotal += itemTotal


            orderItems.push({
                medicine: medicine._id,
                name: medicine.name,
                image: medicine.image,
                quantity: item.quantity,
                price: medicine.price,
                total: itemTotal
            })
        }


        // =========================
        // DELIVERY FEE
        // =========================

        const deliveryFee =
            subtotal >= 500 ? 0 : 40


        // =========================
        // FINAL AMOUNT
        // =========================

        const totalAmount =
            subtotal + deliveryFee


        // =========================
        // CREATE ORDER
        // =========================
const orderNumber=`ORD${Date.now().toString().slice(-6)}`
        const order = await Order.create({
            orderNumber,
            user: userId,
            pharmacy: pharmacyId,
            items: orderItems,
            address: address._id,
            deliveryMethod,
            subtotal,
            deliveryFee,
            totalAmount,
            paymentMethod,
            paymentStatus: 'pending',
            orderStatus: 'pending'
        })


        // =====================================================
        // CUSTOMER NOTIFICATION
        // =====================================================

        await createNotification({

            userId: userId,

            title: 'Order Placed',

            message:
                `Your order ${order._id} has been placed successfully.`,

            type: 'order',

            orderId: order._id

        })


        // =====================================================
        // CUSTOMER EMAIL
        // =====================================================

        const customer =
            await User.findById(userId)


        if (customer) {

            await sendEmail({

                to: customer.email,

                subject: 'PharmaCare - Order Placed',

                message:
`Hello ${customer.name},

Your order ${order._id} has been placed successfully.

Order Total: ₹${order.totalAmount}

Thank you for using PharmaCare.`

            })
        }


        // =====================================================
        // GET UNIQUE PHARMACIES
        // =====================================================

        const pharmacyIds = new Set()


        for (const item of cart.items) {

            const medicine =
                await Medicine.findById(item.medicine)

            if (!medicine) continue

            if (medicine.pharmacy) {

                pharmacyIds.add(
                    medicine.pharmacy.toString()
                )
            }
        }


        // =====================================================
        // NOTIFY PHARMACIES
        // =====================================================

        for (const pharmacyId of pharmacyIds) {

            const pharmacy =
                await Pharmacy.findById(pharmacyId)

            if (!pharmacy) continue


            // PHARMACY NOTIFICATION

            await createNotification({

                userId: pharmacy.user,

                title: 'New Order Received',

                message:
                    `You have received a new order ${order._id}.`,

                type: 'order',

                orderId: order._id

            })


            // PHARMACY EMAIL

            if (pharmacy.user) {

                const pharmacyUser =
                    await User.findById(pharmacy.user)


                if (pharmacyUser) {

                    await sendEmail({

                        to: pharmacyUser.email,

                        subject:
                            'PharmaCare - New Order Received',

                        message:
`Hello,

You have received a new order ${order._id}.

Please login to your PharmaCare pharmacy dashboard to process the order.`

                    })
                }
            }
        }


        // =====================================================
        // REDUCE STOCK
        // =====================================================

        for (const item of cart.items) {

            await Medicine.findByIdAndUpdate(
                item.medicine,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            )
        }


        // =====================================================
        // CLEAR CART
        // =====================================================

        cart.items = []

        await cart.save()


        // =====================================================
        // RESPONSE
        // =====================================================

        return res.status(201).json({

            success: true,

            message: 'order created successfully',

            order

        })


    } catch (error) {

        console.log(
            'Create order error:',
            error
        )

        return res.status(500).json({

            success: false,

            message: 'Failed to create order',

            error: error.message

        })
    }
}


export const getMyOrders=async(req,res)=>{
    try{
        const userId=req.user.userId
        const orders=await Order.find({
            user:userId
        }) .populate("pharmacy", "pharmacyName ownerName phone image")
      .populate("items.medicine", "name image")
        .populate('address').sort({createdAt:-1})

         return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        })

    }catch(error){

           console.log('Get my orders error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to get orders',
            error: error.message
        })

    }
}

export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId=req.user.userId

    const order = await Order.findOne({
      _id: orderId,
      user: userId,
    })
      .populate({
        path: "pharmacy",
        select:
          "pharmacyName image ownerName phone pharmacyType address location",
      })
      .populate({
        path: "address",
      })
      .populate({
        path: "items.medicine",
        select: "name image category",
      });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order details error:", error);

    res.status(500).json({
      message: "Failed to fetch order details",
    });
  }
};

// export const getOrderDetails=async(req,res)=>{
//     try{
//         const userId=req.user.userId
//         const {orderId}=req.params

//         const order=await Order.findOne({
//             _id:orderId,
//             user:userId
//         }).populate("pharmacy", "pharmacyName ownerName phone")
//       .populate("items.medicine", "name image price")
//         .populate('address').populate('items.medicine')

//         if(!order){
//               return res.status(404).json({
//                 success: false,
//                 message: 'Order not found'
//             })
//         }
//          return res.status(200).json({
//             success: true,
//             order
//         })

//     }catch(error){
//          console.log('Get order details error:', error)

//         return res.status(500).json({
//             success: false,
//             message: 'Failed to get order details',
//             error: error.message
//         })

//     }
// }

export const updateOrderStatus=async(req,res)=>{
    try{

        const {orderId}=req.params
        const {status}=req.body

        const allowedStatus=[
              'pending',
    'accepted',
    'preparing',
    'packed',
    'out_for_delivery',
    'delivered',
    'cancelled'
        ]


        if(!status){
              return res.status(400).json({
                success: false,
                message: 'Order status is required'
            })
        }

        if(!allowedStatus.includes(status)){
             return res.status(400).json({
                success: false,
                message: 'Invalid order status'
            })
        }

        //find order
        const order=await Order.findById(orderId)

        if(!order){
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

       
        // if(req.user.role==='pharmacy'){
            const pharmacy=await Pharmacy.findOne({
                user:req.user.userId
            })
               if (!pharmacy) {
                return res.status(404).json({
                    success: false,
                    message: 'Pharmacy not found'
                })
        }
//check pharmacy approval
        if(pharmacy.approvalStatus!=='approved' || !pharmacy.isActive){
            
                return res.status(403).json({
                    success: false,
                    message: 'Pharmacy is not approved or active'
                })
        }
//  CHECK PHARMACY OWNS ORDER
        const pharmacyOwnsOrder=await Medicine.exists({
            _id:{
                $in:order.items.map(item=>item.medicine)
            },
            pharmacy:pharmacy._id
        })
        if(!pharmacyOwnsOrder){
             return res.status(403).json({
                    success: false,
                    message: 'You do not have permission to update this order'
                })
        }
          //  UPDATE STATUS
         order.orderStatus = status
          //  DELIVERY DATE & TIME

         if(status==='delivered'){
            order.deliveredAt=new Date()
         }

            await order.save()

            //get customer

            const customer=await User.findById(order.user)

            if(customer){
                //status msg

                const statusMessage={
                    accepted: 'Your order has been accepted by the pharmacy.',
                    preparing:'Your order is now being prepared.',
                    packed:'Your order has been packed and is ready for delivery.',
                    out_for_delivery: 'Your order is out for delivery.',
                    delivered:'Your order has been delivered successfully.',
                    cancelled: 'Your order has been cancelled.'
                }

                const message=statusMessage[status]|| `Your order status has been updated to ${status}.`

                await createNotification({
                    userId:customer._id,
                     title: `Order ${status}`,

                message:`Order ${order._id}: ${message}`,

                type: 'order',

                orderId: order._id
                })

                //email

                let emailMessage=`Hello ${customer.name},

Your PharmaCare order ${order._id} status has been updated.

Status: ${status.toUpperCase()}

${message}
`

            //delivery date and time in mail
            if(status==='delivered' && order.deliveredAt){
                const deliveredDate=new Date(order.deliveredAt)

                const date=deliveredDate.toLocaleDateString('en-IN')
                const time=deliveredDate.toLocaleTimeString('en-IN',{
                    hour:'2-digit',
                    minute:'2-digit'
                })

                emailMessage+= `

Delivery Date: ${date}
Delivery Time: ${time}
`
            }

            emailMessage+=`Thank you for using PharmaCare`

            await sendEmail({
                to:customer.email,
                subject:`PharmaCare - Order ${status}`,
                message:emailMessage
            })
            }

            return res.status(200).json({
                success: true,
                message: 'Order status updated successfully',
                order
            })
        // }

        



    }catch(error){

         console.log('Update order status error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to update order status',
            error: error.message
        })

    }
}

export const trackOrder=async(req,res)=>{
    try{
        const userId=req.user.userId
        const {orderId}=req.params

        const order =await Order.findOne({
            _id:orderId,
            user:userId
        }).populate("pharmacy", "pharmacyName");
          if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

      const statuses = [
    'pending',
    'accepted',
    'preparing',
    'packed',
    'out_for_delivery',
    'delivered'
]

        const currentStatus=order.orderStatus

        const currentIndex=statuses.indexOf(currentStatus)

        const steps=statuses.map((status,index)=>({
            status,
            completed:currentStatus!=='cancelled' &&
            index<=currentIndex,

            current:currentStatus===status
        
        }))
        return res.status(200).json({
            success: true,

            tracking: {
                orderId: order._id,
                currentStatus: order.orderStatus,
                paymentStatus: order.paymentStatus,
                steps
            }
        })

    }catch(error){
           console.log('Track order error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to track order',
            error: error.message
        })

    }
}
export const getPharmacyOrders=async(req,res)=>{
    try{

        const pharmacy=await Pharmacy.findOne({
            user:req.user.userId
        })

        if(!pharmacy){
            return res.status(404).json({
                success: false,
                message: 'Pharmacy profile not found'
            })
        }

        if(pharmacy.approvalStatus!=='approved' || !pharmacy.isActive){
             return res.status(403).json({
                success: false,
                message: 'Pharmacy is not approved or active'
            })
        }

        const medicines=await Medicine.find({
            pharmacy:pharmacy._id
        }).select('_id')


        const medicineIds=medicines.map(medicine=>medicine._id)

        const orders=await Order.find({
            'items.medicine':{$in:medicineIds}
        }).populate('user','name email phone')
        .populate('address')
        .populate('items.medicine')
        .sort({createdAt:-1})

         return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        })
    }catch(error){
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch pharmacy orders',
            error: error.message
        })

    }
}
export const cancelOrder = async (req, res) => {
  try {

    const userId = req.user.userId;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: userId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Already delivered/cancelled orders cannot be cancelled
    if (
      order.orderStatus === "delivered" ||
      order.orderStatus === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "This order cannot be cancelled"
      });
    }

    order.orderStatus = "cancelled";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order
    });

  } catch (error) {

    console.log("Cancel order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel order"
    });
  }
};