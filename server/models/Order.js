import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            medicine: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Medicine',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            image: {
                type: String
            },
            price: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            }

        }
    ],
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        required: true,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    deliveredAt: {
        type: Date,
        default: null
    },

    orderStatus: {
        type: String,
        enum: [
            'pending',
            'accepted',
            'preparing',
            'packed',
            'out_for_delivery',
            'delivered',
            'cancelled'
        ],
        default: 'pending'
    },
    pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true
    },

    deliveryMethod: {
        type: String,
        enum: ['standard', 'express'],
        default: 'standard',
        required: true
    },
    orderNumber: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order