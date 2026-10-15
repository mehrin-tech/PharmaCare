import mongoose from 'mongoose'


const medicineSchema= new mongoose.Schema({
    pharmacy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Pharmacy',
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    genericName:{
        type:String,
        trim:true
    },
    brandName:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    mrp: {
    type: Number,
    required: true,
    min: 0
},
    price:{
        type:Number,
        required:true,
        min:0
       
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    prescriptionRequired:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    expiryDate:{
        type:Date
    },
    manufacturer: {
  type: String,
  trim: true
},

packSize: {
  type: String,
  trim: true
},

dosage: {
  type: String,
  trim: true
},

form: {
  type: String,
  trim: true
},

drugType: {
  type: String,
  trim: true,
  default: "Allopathic"
},

countryOfOrigin: {
  type: String,
  trim: true,
  default: "India"
},
    isActive:{
        type:Boolean,
        default:true
    }
    
},
{
    timestamps:true
})

const Medicine=mongoose.model('Medicine',medicineSchema)

export default Medicine