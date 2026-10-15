import dotenv from 'dotenv'
dotenv.config()
import crypto from 'crypto'
import Razorpay from 'razorpay'
import Payment from '../models/Payment.js'
import Order from '../models/Order.js'
import User from '../models/User.js'



const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
export const createPayment = async (req, res) => {
    try {
        const userId = req.user.userId

        const { orderId, paymentMethod } = req.body

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required'
            })
        }

        if (!paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Payment method is required'
            })
        }

        const order = await Order.findOne({
            _id: orderId,
            user: userId
        })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        if (order.paymentStatus === 'paid') {
            return res.status(400).json({
                success: false,
                message: 'Order is already paid'
            })
        }

        const existingPayment = await Payment.findOne({
            order: orderId,
            user: userId,
            status: 'pending'
        })

        if (existingPayment) {
            return res.status(400).json({
                success: false,
                message: 'Payment already initiated for this order',
                payment: existingPayment
            })
        }



        //razor amount is inpaise
        const amountInPaise = Math.round(order.totalAmount * 100)


        //create razor order
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: `order_${order._id}`
        })
        //create pymnt
        const payment = await Payment.create({
            user: userId,
            order: orderId,
            amount: order.totalAmount,
            paymentMethod,
            razorpayOrderId: razorpayOrder.id,
            status: 'pending'
        })

        return res.status(201).json({

            success: true,

            message: 'Payment initiated successfully',

            payment: {
                _id: payment._id,
                amount: payment.amount,
                paymentMethod: payment.paymentMethod,
                status: payment.status
            },
            razorpay: {

                keyId: process.env.RAZORPAY_KEY_ID,

                orderId: razorpayOrder.id,

                amount: razorpayOrder.amount,

                currency: razorpayOrder.currency

            }

        })

    } catch (error) {
        console.log('Create payment error:', error)

        return res.status(500).json({

            success: false,

            message: 'Failed to create payment',

            error: error.message

        })

    }
}
//paymnt success
export const paymentSuccess = async (req, res) => {
    try {

        const userId = req.user.userId
        const { paymentId } = req.params
        const { razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body

        // Check Razorpay response
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {

            return res.status(400).json({

                success: false,

                message: 'Razorpay payment details are required'

            })

        }

        const payment = await Payment.findOne({
            _id: paymentId,
            user: userId
        })

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'payment not found'
            })
        }

        if (payment.status === 'paid') {
            return res.status(400).json({
                success: false,
                message: 'payment already completed'
            })
        }
        // Verify Razorpay order ID
        if (payment.razorpayOrderId !== razorpay_order_id) {

            return res.status(400).json({

                success: false,

                message: 'Invalid Razorpay order ID'

            })

        }

        // Generate signature
        const generatedSignature = crypto
            .createHmac(
                'sha256',
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest('hex')
       


        // Verify signature
        if (generatedSignature !== razorpay_signature) {

            payment.status = 'failed'

            await payment.save()

            return res.status(400).json({

                success: false,

                message: 'Payment signature verification failed'

            })

        }

        payment.status = 'paid'
        payment.razorpayPaymentId = razorpay_payment_id

        payment.razorpaySignature = razorpay_signature

        payment.transactionId = razorpay_payment_id

        await payment.save()

        //updt order
        const order = await Order.findById(payment.order)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        order.paymentStatus = 'paid'
        // order.orderStatus = 'confirmed'
        await order.save()

        return res.status(200).json({

            success: true,

            message: 'Payment successful',

            payment,

            order

        })

    } catch (error) {
        console.log('Payment success error:', error)

        return res.status(500).json({

            success: false,

            message: 'Failed to complete payment',

            error: error.message

        })

    }
}

//paymnt faild
export const paymentFailed = async (req, res) => {
    try {
        const userId = req.user.userId
        const { paymentId } = req.params

        const payment = await Payment.findOne({
            _id: paymentId,
            user: userId
        })
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found'
            })
        }
        //check alredy paid

        if (payment.status === 'paid') {
            return res.status(400).json({
                success: false,
                message: 'Paid payment cannot be marked as failed'
            })
        }

        //update pymnt faild
        payment.status = 'failed'
        await payment.save()
        return res.status(200).json({

            success: true,

            message: 'Payment marked as failed',

            payment

        })

    } catch (error) {
        console.log('Payment failed error:', error)

        return res.status(500).json({

            success: false,

            message: 'Failed to update payment',

            error: error.message

        })

    }

}