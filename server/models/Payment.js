import mongoose from 'mongoose'

const paymentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:['cod','razorpay'],
        required:true
    },
    razorpayOrderId: {
      type: String,
      default: null
    },
     razorpayPaymentId: {
      type: String,
      default: null
    },
      razorpaySignature: {
      type: String,
      default: null
    },

    transactionId:{
        type:String,
        default:null
    },
    status:{
        type:String,
        enum:['pending','paid','failed'],
        default:'pending'
    }
},
{
    timestamps:true
})

const Payment=mongoose.model('Payment',paymentSchema)

export default Payment