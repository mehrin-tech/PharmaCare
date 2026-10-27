import Pharmacy from "../models/Pharmacy.js";
import User from '../models/User.js'

//get all pending pharmacies
export const getPendingPharmacies= async(req,res)=>{
    try{
        const pharmacies=await Pharmacy.find({
            approvalStatus:'pending'
        })
        .populate('user','name email phone').sort({createdAt: -1})

        return res.status(200).json({
            success:true,
            count:pharmacies.length,
            pharmacies
        })

}catch(error){
    console.log('get pending pharmacies error:',error)

    return res.status(500).json({
        success:false,
        message:'failed to fetch pending pharmacies',
        error:error.message
    })

}
}

//get single pharmacy details
export const getPharmacyDetails=async(req,res)=>{
    try{
        const {pharmacyId}=req.params
        const pharmacy=await Pharmacy.findById(pharmacyId)
        .populate('user','name email,phone role')

        if(!pharmacy){
            return res.status(404).json({
                success:false,
                message:'pharmacy not found'
            })
        }

        return res.status(200).json({
            success:true,
            pharmacy
        })

    }catch(error){
        console.log('get pharmacy details error:',error)
        return res.status(500).json({
            success:false,
            message:'failed to fetch pharmacy details',
            error:error.message
        })

    }
}

//approve pharmacy
export const approvePharmacy=async(req,res)=>{
    try{
        const {pharmacyId}=req.params;
        const pharmacy=await Pharmacy.findById(pharmacyId)

        if(!pharmacy){
            return res.status(404).json({
                success:false,
                message:'pharmacy not found'
            })
        }


        if(pharmacy.licenseVerification?.status !=='verified'){
            return res.status(400).json({
                success:false,
                message:'pharmacy license is not verified.cannot approve pharmacy.'
            })
        }
        pharmacy.approvalStatus='approved'
        pharmacy.isActive=true
        await pharmacy.save()


        return res.status(200).json({
            success:true,
            message:'pharmacy approved successfully',
            pharmacy:{
                id:pharmacy._id,
                pharmacyName:pharmacy.pharmacyName,
                approvalStatus:pharmacy.approvalStatus,
                licenseVerification:pharmacy.licenseVerification,
                isActive:pharmacy.isActive

            }
        })

    }catch(error){

        console.log('approve pharmacy error:',error)
        return res.status(500).json({
            success:false,
            message:'pharmacy approval failed',
            error:error.message
        })

    }
}

//Reject pharmacy

export const rejectPharmacy=async(req,res)=>{
    try{
        const {pharmacyId}=req.params
        const pharmacy=await Pharmacy.findById(pharmacyId)

        if(!pharmacy){
            return res.status(404).json({
                success:false,
                message:'pharmacy not found'
            })
        }
        pharmacy.approvalStatus='rejected'
        pharmacy.isActive=false

        await pharmacy.save()

        return res.status(200).json({
            success:true,
            message:'pharmacy rejected successfully',
            pharmacy:{
                id:pharmacy._id,
                pharmacyName:pharmacy.pharmacyName,
                approvalStatus:pharmacy.approvalStatus,
                isActive:pharmacy.isActive
            }
        })

    }catch(error){
        console.log('reject pharmacy error:',error)

        return res.status(500).json({
            success:false,
            message:'pharmacy rejection failed',
            error:error.message
        })

    }
}

// Get all pharmacies
// export const getAllPharmacies = async (req, res) => {
//     try {
//         const pharmacies = await Pharmacy.find()
//             .populate('user', 'name email phone role isActive')
//             .sort({ createdAt: -1 })

//         return res.status(200).json({
//             success: true,
//             count: pharmacies.length,
//             pharmacies
//         })

//     } catch (error) {
//         console.log('get all pharmacies error:', error)

//         return res.status(500).json({
//             success: false,
//             message: 'failed to fetch pharmacies',
//             error: error.message
//         })
//     }
// }

// Get all pharmacies with pagination
export const getAllPharmacies = async (req, res) => {
  try {
    // 1. Get page and limit from query parameters
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 10)
    );

    // 2. Calculate skip
    const skip = (page - 1) * limit;

    // 3. Fetch pharmacies and total count simultaneously
    const [pharmacies, totalPharmacies] = await Promise.all([
      Pharmacy.find()
        .populate("user", "name email phone role isActive")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Pharmacy.countDocuments(),
    ]);

    // 4. Calculate total pages
    const totalPages = Math.ceil(totalPharmacies / limit);

    // 5. Send response
    return res.status(200).json({
      success: true,
      count: pharmacies.length,
      pharmacies,
      pagination: {
        currentPage: page,
        totalPages,
        totalPharmacies,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log("get all pharmacies error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pharmacies",
      error: error.message,
    });
  }
};

// Activate / Deactivate pharmacy
export const updatePharmacyStatus = async (req, res) => {
    try {
        const { pharmacyId } = req.params
        const { isActive } = req.body

        if (typeof isActive !== 'boolean') {
            return res.status(400).json({
                success: false,
                message: 'isActive must be true or false'
            })
        }

        const pharmacy = await Pharmacy.findById(pharmacyId)

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'pharmacy not found'
            })
        }

        pharmacy.isActive = isActive

        await pharmacy.save()

        // Also update linked user
        if (pharmacy.user) {
            await User.findByIdAndUpdate(
                pharmacy.user,
                { isActive }
            )
        }

        return res.status(200).json({
            success: true,
            message: isActive
                ? 'pharmacy activated successfully'
                : 'pharmacy deactivated successfully',
            pharmacy: {
                id: pharmacy._id,
                pharmacyName: pharmacy.pharmacyName,
                approvalStatus: pharmacy.approvalStatus,
                isActive: pharmacy.isActive
            }
        })

    } catch (error) {
        console.log('update pharmacy status error:', error)

        return res.status(500).json({
            success: false,
            message: 'failed to update pharmacy status',
            error: error.message
        })
    }
}