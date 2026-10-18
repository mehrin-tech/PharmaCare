import Prescription from "../models/Prescription.js";
import Medicine from '../models/Medicine.js'
import Pharmacy from '../models/Pharmacy.js'
import cloudinary from '../config/cloudinary.js'
import {Readable} from 'stream'

export const uploadPrescription=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                 success: false,
                message: 'Prescription file is required'
            })
        }

             const { medicineId, pharmacyId } = req.body

        if (!medicineId || !pharmacyId) {
            return res.status(400).json({
                success: false,
                message: 'Medicine and pharmacy are required'
            })
        }

         // Check medicine belongs to the selected pharmacy
        const medicine = await Medicine.findOne({
            _id: medicineId,
            pharmacy: pharmacyId,
            isActive: true
        });


        if (!medicine.prescriptionRequired) {
  return res.status(400).json({
    success: false,
    message: "This medicine does not require a prescription"
  });
}
        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            })
        }

        // Check pharmacy exists and is approved/active
        const pharmacy = await Pharmacy.findOne({
            _id: pharmacyId,
            approvalStatus: "approved",
            isActive: true
        });


        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }

        const isPdf = req.file.mimetype === 'application/pdf' ||
            req.file.originalname?.toLowerCase().endsWith('.pdf');

        const uploadToCloudinary=()=>{
            return new Promise((res,rej)=>{
                const stream=cloudinary.uploader.upload_stream({
                    folder:'pharmacare/prescriptions',
                    resource_type: isPdf ? 'raw' : 'image'
                },(error,result)=>{
                    if(error){
                        rej(error)
                    }else{
                        res(result)
                    }
                })
                Readable.from(req.file.buffer).pipe(stream)
            })
        }



        const result=await uploadToCloudinary()

        const prescription=await Prescription.create({
            user:req.user.userId,
            medicine: medicineId,
            pharmacy: pharmacyId,
            image:result.secure_url,
            status:'pending'
        })

        const populatedPrescription = await Prescription.findById(prescription._id)
            .populate("medicine", "name price")
            .populate("pharmacy", "pharmacyName");

         return res.status(201).json({
            success: true,
            message: 'Prescription uploaded successfully',
            prescription: populatedPrescription
        })

    }catch(error){

         console.log('Upload prescription error:', error)

        return res.status(500).json({
            success: false,
            message: 'Prescription upload failed'
        })

    }
}

export const getMyPrescription=async(req,res)=>{
    try{
        const prescriptions=await Prescription.find({
            user:req.user.userId
        }) .populate("medicine", "name price")
            .populate("pharmacy", "pharmacyName").sort({createdAt:-1})

         return res.status(200).json({
            success: true,
            count: prescriptions.length,
            prescriptions
        })

    }catch(error){
         console.log('Get prescriptions error:',error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch prescriptions'
        })

    }
}

export const getPendingPrescriptions=async(req,res)=>{
    try{

         const pharmacy = await Pharmacy.findOne({
            user: req.user.userId
        })

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }


        const prescriptions=await Prescription.find({
            status:'pending',
            pharmacy: pharmacy._id
        }).populate('user','name email').populate("medicine", "name price")
        .populate("pharmacy", "pharmacyName")
        .sort({ createdAt: -1 });

         return res.status(200).json({
            success: true,
            count: prescriptions.length,
            prescriptions
        })

    }catch(error){

          console.log('Get pending prescriptions error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch pending prescriptions',
            error: error.message
        })

    }
}

export const getAllPharmacyPrescriptions = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findOne({
      user: req.user.userId,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    const prescriptions = await Prescription.find({
      pharmacy: pharmacy._id,
    })
      .populate("user", "name email")
      .populate("medicine", "name price")
      .populate("pharmacy", "pharmacyName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: prescriptions.length,
      prescriptions,
    });
  } catch (error) {
    console.log("Get all pharmacy prescriptions error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch prescriptions",
    });
  }
};

export const approvePrescription=async(req,res)=>{
    try{

        const {prescriptionId}=req.params
        const prescription=await Prescription.findById(prescriptionId)

        if(!prescription){
             return res.status(404).json({
                success: false,
                message: 'Prescription not found'
            })
        }

         // Find logged-in pharmacy
        const pharmacy = await Pharmacy.findOne({
            user: req.user.userId
        });

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: "Pharmacy not found"
            });
        }

        // Ownership check
        if (
            prescription.pharmacy.toString() !==
            pharmacy._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to approve this prescription"
            });
        }

        if(prescription.status!=='pending'){
             return res.status(400).json({
                success: false,
                message: `Prescription is already ${prescription.status}`
            })
        }

        prescription.status='approved'
         prescription.verifiedBy = req.user.userId
        prescription.verifiedAt = new Date()

        await prescription.save()

         return res.status(200).json({
            success: true,
            message: 'Prescription approved successfully',
            prescription
        })

    }catch(error){
          console.log('Approve prescription error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to approve prescription',
            error: error.message
        })

    }
}

export const rejectPrescription=async(req,res)=>{
    try{

        const {prescriptionId}=req.params
        const { rejectionReason } = req.body
         if (!rejectionReason) {
            return res.status(400).json({
                success: false,
                message: 'Rejection reason is required'
            })
        }

        const prescription=await Prescription.findById(prescriptionId)

        if(!prescription){
             return res.status(404).json({
                success: false,
                message: 'Prescription not found'
            })
        }


        // Find logged-in pharmacy
        const pharmacy = await Pharmacy.findOne({
            user: req.user.userId
        });

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: "Pharmacy not found"
            });
        }

        // Ownership check
        if (
            prescription.pharmacy.toString() !==
            pharmacy._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to reject this prescription"
            });
        }

        if(prescription.status!=='pending'){
             return res.status(400).json({
                success: false,
                message: `Prescription is already ${prescription.status}`
            })
        }

        prescription.status='rejected'
        prescription.rejectionReason = rejectionReason
        prescription.verifiedBy = req.user.userId
        prescription.verifiedAt = new Date()

        await prescription.save()

         return res.status(200).json({
            success: true,
            message: 'Prescription rejected successfully',
            prescription
        })

    }catch(error){
             console.log('Reject prescription error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to reject prescription',
            error: error.message
        })

    }
}
