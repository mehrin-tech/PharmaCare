import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        pharmacy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pharmacy',
            default: null
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            default: null
        },

        subject: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ['pending', 'investigating', 'resolved', 'rejected'],
            default: 'pending'
        },

        adminResponse: {
            type: String,
            default: null,
            trim: true
        },

        resolvedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
)

const Complaint = mongoose.model('Complaint', complaintSchema)

export default Complaint