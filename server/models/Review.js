import mongoose from 'mongoose'

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    pharmacy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Pharmacy',
        required:true
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type:String,
        trim:true,
        maxlength:500
    }
},{
    timestamps:true
})

reviewSchema.index(
    {user:1,order:1},
    {unique:true}
)

const Review =mongoose.model('Review',reviewSchema)

export default Review