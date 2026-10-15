import mongoose from 'mongoose'
const notificationSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    message:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['order',
        'payment',
        'prescription',
        'pharmacy',
        'complaint',
        'system'],
        default:'system'
    },
    isRead:{
        type:Boolean,
        default:false
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        default:null
    }
},
{timestamps:true})

const Notification=mongoose.model('Notification',notificationSchema)

export default Notification