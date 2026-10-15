import Review from '../models/Review.js'
import Order from '../models/Order.js'
import Pharmacy from '../models/Pharmacy.js'


export const addReview=async(req,res)=>{
    try{
        const {pharmacyId,orderId,rating,comment}=req.body

        if(!pharmacyId || !orderId || !rating){
            return res.status(400).json({
                success:false,
                message:'Pharmacy, order and rating are required'
            })
        }

        if(rating<1 || rating >5){
            return res.status(400).json({
                success:false,
                message:'Rating must be between 1 and 5'
            })
        }

        const pharmacy =await Pharmacy.findById(pharmacyId)
        if(!pharmacy){
            return res.status(404).json({
            success: false,
            message: 'Pharmacy not found'
            })
        }
        const order=await Order.findOne({
            _id:orderId,
            user:req.user.userId
        })
        if(!order){
            return res.status(404).json({
            success: false,
            message: 'Order not found'
      })
        }

        if(order.orderStatus!=='delivered'){
            return res.status(400).json({
        success: false,
        message: 'You can rate pharmacy only after delivery'
      })
        }

        const existingReview=await Review.findOne({
            user:req.user.userId,
            order:orderId
        })

        if(existingReview){
            return res.status(409).json({
            success: false,
            message: 'You have already reviewed this order'
      })
        }

        const review=await Review.create({
            user:req.user.userId,
            pharmacy:pharmacyId,
            order:orderId,
            rating,
            comment
        })

          res.status(201).json({
      success: true,
      message: 'Pharmacy rated successfully',
      review
    })
    }catch(error){

          res.status(500).json({
      success: false,
      message: 'Failed to add review',
      error: error.message
    })

    }
}

export const getPharmacyReviews=async(req,res)=>{
    try{

        const {pharmacyId}=req.params

        const reviews=await Review.find({
            pharmacy:pharmacyId
        }).populate('user','name')
        .sort({createdAt:-1})

        const totalReviews=reviews.length

        const averageRating=totalReviews>0?reviews.reduce((sum,review)=>sum+review.rating,0)/totalReviews:0

         res.status(200).json({
      success: true,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews,
      reviews
    })

    }catch(error){

         res.status(500).json({
      success: false,
      message: 'Failed to get reviews',
      error: error.message
    })

    }
}