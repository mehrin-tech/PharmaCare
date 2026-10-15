import mongoose from 'mongoose'

const platformSettingsSchema = new mongoose.Schema(
    {
        commissionRate: {
            type: Number,
            required: true,
            default: 10,
            min: 0,
            max: 100
        },

        deliveryFee: {
            type: Number,
            required: true,
            default: 40,
            min: 0
        }
    },
    {
        timestamps: true
    }
)

const PlatformSettings = mongoose.model(
    'PlatformSettings',
    platformSettingsSchema
)

export default PlatformSettings