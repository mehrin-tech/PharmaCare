import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    phone:{
        type:String,
        trim:true,
    },
    role:{
        type:String,
        enum:['customer','pharmacy','admin'],
        default:'customer'
    },
    pharmacy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Pharmacy',
        default:null
    },
    isActive:{
        type:Boolean,
        default:true
    },
    profilePhoto: {
    type: String,
    default: ""
},
dateOfBirth: {
    type: Date
},

bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
},

gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
},

preferredLanguage: {
    type: String,
    enum: ["English", "Malayalam", "Hindi"]
},
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordExpire:{
        type:Date,
        default:null
    }
},
{timestamps:true}
)

const User = mongoose.model("User",userSchema)

export default User;