import mongoose from 'mongoose'

const prescriptionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    medicine:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Medicine',
        required:true
    },
    pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true
    },
    image:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    },
    rejectionReason:{
        type:String,
        trim:true
    },
    verifiedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    verifiedAt:{
        type:Date
    }
    
},
{timestamps:true})

const Prescription =mongoose.model('Prescription',prescriptionSchema)

export default Prescription