import Wishlist from "../models/Wishlist.js";
import Medicine from '../models/Medicine.js'


//add medicine to wishlist
export const addToWishlist=async(req,res)=>{
    try{
        const {medicineId}=req.body;

        if(!medicineId){
             return res.status(400).json({
                success: false,
                message: 'Medicine ID is required'
            });
        }
         // Check medicine exists and active
         const medicine= await Medicine.findOne({
            _id:medicineId,
            isActive:true
         });
          if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            });
        }
         // Check already exists
         const existingWishlist=await Wishlist.findOne({
            user:req.user.userId,
            medicine:medicineId
         })

         if (existingWishlist) {
            return res.status(409).json({
                success: false,
                message: 'Medicine already in wishlist'
            });
        }

          const wishlist = await Wishlist.create({
            user: req.user.userId,
            medicine: medicineId
        });

        const populatedWishlist = await Wishlist.findById(
            wishlist._id
        ).populate(
            'medicine',
            'name genericName brandName category price stock prescriptionRequired image expiryDate pharmacy'
        );


        return res.status(201).json({
            success: true,
            message: 'Medicine added to wishlist',
            wishlist: populatedWishlist
        });

    }catch(error){
          console.log('Add wishlist error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to add medicine to wishlist',
            error: error.message
        });

    }
}


//get my wishlist

export const getMyWishlist=async(req,res)=>{
    try{
        const wishlist=await Wishlist.find({
            user:req.user.userId
        }).populate( 'medicine',
            'name genericName brandName category description price stock prescriptionRequired image expiryDate pharmacy')

            .sort({createdAt:-1});

            return res.status(200).json({
            success: true,
            count: wishlist.length,
            wishlist
        });


    }catch(error){
         console.log('Get wishlist error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch wishlist',
            error: error.message
        });
    }

}

// Remove medicine from wishlist

export const removeFromeWishlist=async(req,res)=>{
    try{
        const {medicineId}=req.params

        const wishlist=await Wishlist.findOneAndDelete({
            user:req.user.userId,
            medicine:medicineId
        })

        if(!wishlist){
             return res.status(404).json({
                success: false,
                message: 'Medicine not found in wishlist'
            });
        }
          return res.status(200).json({
            success: true,
            message: 'Medicine removed from wishlist'
        });

    }catch(error){
         console.log('Remove wishlist error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to remove medicine from wishlist',
            error: error.message
        });

    }
}
