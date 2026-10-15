import mongoose from 'mongoose'

const checkoutSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[
        {
            medicine:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Medicine",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true
            },
            total:{
                type:Number,
                required:true
            }
        }
    ],
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
        required:true
    },
    subtotal:{
        type:Number,
        required:true
    },
    deliveryFee:{
        type:Number,
        required:true,
        default:0
    },
    totalAmount:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})


const Checkout=mongoose.model('Checkout',checkoutSchema)

export default Checkout