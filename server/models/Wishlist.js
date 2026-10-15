import mongoose from 'mongoose'

const wishlistSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    },
     medicine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
            required: true
        }
},
{
    timestamps:true
})
// Same medicine ore customer randuthavana wishlist cheyyunnth prevent chyeyeyan

wishlistSchema.index(
    {user:1,medicine:1},
    {unique:true}
)

const Wishlist =mongoose.model('Wishlist',wishlistSchema)

export default Wishlist;