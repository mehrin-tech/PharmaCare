import Pharmacy from '../models/Pharmacy.js'
import Address from '../models/Address.js'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import cloudinary from '../config/cloudinary.js'
import {Readable} from 'stream'
import { extractTextFromImage,extractTextFromPDF } from '../services/licenseOCRService.js'
import { verifyLicenseWithAI } from '../services/licenseAIService.js'
import mongoose from 'mongoose'

export const registerPharmacy = async(req,res)=>{
    try{
       // const userId=req.user.userId
        const { pharmacyName,
            ownerName,
            email,
            password,
            phone,
            pharmacyType,
            licenseNumber,
            address,
            location,
            image}=req.body

        if(!pharmacyName || !ownerName || !email || !password || !phone || !pharmacyType || !licenseNumber){
            return res.status(400).json({
                success:false,
                message:'Required pharmacy details are missing'
            })
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
             return res.status(409).json({
                success: false,
                message: 'User with this email already exists'
            })
        }

        const existingPharmacy = await Pharmacy.findOne({
             $or: [
        { email },
        { licenseNumber }
    ]
        })

        if(existingPharmacy){
            return res.status(409).json({
                success:false,
                message:'Pharmacy with this email or license number already exists'
            })
        }

        let imageUrl = typeof image === 'string' ? image.trim() : '';

        if (req.file) {
            const uploadedImage = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'pharmacare/pharmacies', resource_type: 'image' },
                    (error, result) => error ? reject(error) : resolve(result)
                );
                uploadStream.end(req.file.buffer);
            });
            imageUrl = uploadedImage.secure_url;
        }

        const pharmacyAddress = typeof address === 'string' ? JSON.parse(address) : address;
        const pharmacyLocation = typeof location === 'string' ? JSON.parse(location) : location;

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name:ownerName,
            email,
            password:hashedPassword,
            phone,
            role:'pharmacy'
        })

        const pharmacy = await Pharmacy.create({
           user:user._id,
            pharmacyName,ownerName,email,phone,pharmacyType,licenseNumber,address:pharmacyAddress,location:pharmacyLocation,image:imageUrl,
            licenseVerification:{
                status:'pending',
                confidence:0
            },
            approvalStatus:'pending'
        })
        user.pharmacy = pharmacy._id
await user.save()


        res.status(201).json({
            success:true,
            message:'Pharmacy registered successfully. Waiting for verification and admin approval.',
            pharmacy:{
                id:pharmacy._id,
                pharmacyName:pharmacy.pharmacyName,
                image:pharmacy.image,
                ownerName: pharmacy.ownerName,
                email: pharmacy.email,
                phone: pharmacy.phone,
                pharmacyType: pharmacy.pharmacyType,
                licenseNumber: pharmacy.licenseNumber,
                approvalStatus: pharmacy.approvalStatus,
                licenseVerification: pharmacy.licenseVerification
            }
        })

    }catch(error){
        console.log('pharmacy register  err',error)
        res.status(500).json({
            success:false,
            message:'Pharmacy registration failed',
            error:error.message
        })

    }
}
export const uploadLicense = async (req, res) => {
    try {
 console.log("🔥 UPLOAD LICENSE CONTROLLER HIT")
        const { pharmacyId } = req.params
            console.log("Pharmacy ID:", pharmacyId)

        // 1. Check file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'License document is required'
            })
        }

        console.log("✅ FILE RECEIVED")
        console.log("File name:", req.file.originalname)
        console.log("File type:", req.file.mimetype)
        console.log("File size:", req.file.size)

        // 2. Find pharmacy
        const pharmacy = await Pharmacy.findById(pharmacyId)

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }

        // 3. OCR
        console.log("🚀 STARTING OCR")
        let extractedText = ''

        if (req.file.mimetype === 'application/pdf') {

            console.log('PDF detected. Starting PDF OCR...')

            extractedText = await extractTextFromPDF(
                req.file.buffer
            )

        } else {

            console.log('Image detected. Starting image OCR...')

            extractedText = await extractTextFromImage(
                req.file.buffer
            )
        }

        // 4. Show OCR result
        console.log('========== OCR RESULT ==========')
        console.log(extractedText)
        console.log('================================')


//         

    //5 AI verification

    console.log('starting AI verification')

    const aiResult=await verifyLicenseWithAI({
        ocrText:extractedText,
        registeredLicenseNumber:pharmacy.licenseNumber,
        registeredPharmacyName:pharmacy.pharmacyName,
        registeredOwnerName:pharmacy.ownerName
    })

    console.log("========== AI RESULT ==========")
console.log(aiResult)
console.log("================================")



        // 6. Upload to Cloudinary
        const uploadToCloudinary = () => {

            return new Promise((resolve, reject) => {

                const stream =
                    cloudinary.uploader.upload_stream(
                        {
                            folder: 'pharmacare/license',
                            resource_type: 'auto'
                        },

                        (error, result) => {

                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }

                        }
                    )

                Readable
                    .from(req.file.buffer)
                    .pipe(stream)
            })
        }


        const result = await uploadToCloudinary()


        // 7. Save AI res document
        pharmacy.licenseDocument =
            result.secure_url


        pharmacy.licenseVerification={
            status:aiResult.status,
            confidence:aiResult.confidence,

            extractedData:{
                licenseNumber:aiResult.licenseNumber || null,
                pharmacyName:aiResult.pharmacyName || null,
                ownerName:aiResult.ownerName || null
            },
            aiReason: aiResult.reason || '',
            verifiedAt:new Date()
        }

        // 8. Admin approval remains pending
        pharmacy.approvalStatus = 'pending'

        await pharmacy.save()


         // 9. Response

        let message

        if (aiResult.status === 'verified') {

            message =
                'License uploaded and AI verified successfully. Waiting for admin approval.'

        } else if (aiResult.status === 'suspicious') {

            message =
                'License uploaded but AI detected suspicious information. Waiting for admin review.'

        } else {

            message =
                'License uploaded but AI verification failed. Waiting for admin review.'
        }

        // 10. Response
        return res.status(200).json({

            success: true,

            message,
              
            pharmacy: {

                id: pharmacy._id,

                pharmacyName:
                    pharmacy.pharmacyName,

                licenseDocument:
                    pharmacy.licenseDocument,

                licenseVerification:
                    pharmacy.licenseVerification,

                approvalStatus:
                    pharmacy.approvalStatus
            }
        })


    } catch (error) {

        console.log(
            'License upload error:',
            error
        )

        return res.status(500).json({
            success: false,
            message: 'License upload failed',
            error: error.message
        })
    }
}
export const updatePharmacyLocation = async (req, res) => {
    try {

        const { latitude, longitude } = req.body

        if (
            latitude === undefined ||
            latitude === null ||
            longitude === undefined ||
            longitude === null
        ) {
            return res.status(400).json({
                success: false,
                message: 'Latitude and longitude are required'
            })
        }

        const lat = Number(latitude)
        const lng = Number(longitude)

        if (
            !Number.isFinite(lat) ||
            !Number.isFinite(lng)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid latitude or longitude'
            })
        }

        const pharmacy = await Pharmacy.findOne({
            user: req.user.userId
        })

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }

        pharmacy.location = {
            latitude: lat,
            longitude: lng
        }

        await pharmacy.save()

        return res.status(200).json({
            success: true,
            message: 'Pharmacy location updated successfully',
            location: pharmacy.location
        })

    } catch (error) {

        console.error(
            'Update pharmacy location error:',
            error
        )

        return res.status(500).json({
            success: false,
            message: 'Failed to update pharmacy location',
            error: error.message
        })
    }
}

export const getNearbyPharmacies = async (req, res) => {
    try {
        const { radius = 20 } = req.query;
        const maxRadius = Number(radius);

        // 1. Validate radius
        if (!Number.isFinite(maxRadius) || maxRadius <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid radius"
            });
        }

        // 2. Get customer's default address
        const address = await Address.findOne({
            user: req.user.userId,
            isDefault: true
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Default delivery address not found"
            });
        }

        // 3. Check customer location
        if (
            !address.location ||
            address.location.latitude === undefined ||
            address.location.longitude === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Customer location is not available"
            });
        }

        const userLatitude = Number(
            address.location.latitude
        );

        const userLongitude = Number(
            address.location.longitude
        );

        if (
            !Number.isFinite(userLatitude) ||
            !Number.isFinite(userLongitude)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid customer location"
            });
        }

        // 4. Get approved + active pharmacies
        const pharmacies = await Pharmacy.find({
            approvalStatus: "approved",
            isActive: true,
            "location.latitude": { $exists: true },
            "location.longitude": { $exists: true }
        }).select(
            "pharmacyName image pharmacyType address location"
        );

        // 5. Calculate distance
        const calculateDistance = (
            lat1,
            lon1,
            lat2,
            lon2
        ) => {

            const toRadians = (degree) => {
                return degree * (Math.PI / 180);
            };

            const R = 6371; // Earth radius in KM

            const dLat = toRadians(lat2 - lat1);
            const dLon = toRadians(lon2 - lon1);

            const a =
                Math.sin(dLat / 2) *
                Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

            const c =
                2 *
                Math.atan2(
                    Math.sqrt(a),
                    Math.sqrt(1 - a)
                );

            return R * c;
        };

        // 6. Delivery time based on distance
        const getDeliveryTime = (distance) => {

            if (distance <= 2) {
                return "20 min";
            }

            if (distance <= 5) {
                return "30 min";
            }

            if (distance <= 10) {
                return "45 min";
            }

            if (distance <= 15) {
                return "60 min";
            }

            return "90 min";
        };

        // 7. Calculate distance + delivery time
        const nearbyPharmacies = pharmacies

            .map((pharmacy) => {

                const distance = calculateDistance(
                    userLatitude,
                    userLongitude,
                    pharmacy.location.latitude,
                    pharmacy.location.longitude
                );

                // Round distance to 2 decimal places
                const roundedDistance = Number(
                    distance.toFixed(2)
                );

                return {
                    _id: pharmacy._id,

                    pharmacyName: pharmacy.pharmacyName,
                     image: pharmacy.image,

                    pharmacyType: pharmacy.pharmacyType,

                    address: pharmacy.address,

                    location: pharmacy.location,

                    // Distance from customer
                    distance: roundedDistance,

                    // Delivery time based on distance
                    deliveryTime: getDeliveryTime(
                        roundedDistance
                    )
                };
            })

            // 8. Radius filter
            .filter(
                (pharmacy) =>
                    pharmacy.distance <= maxRadius
            )

            // 9. Nearest pharmacy first
            .sort(
                (a, b) =>
                    a.distance - b.distance
            );

        // 10. Response
        return res.status(200).json({
            success: true,

            userLocation: {
                latitude: userLatitude,
                longitude: userLongitude
            },

            radius: maxRadius,

            count: nearbyPharmacies.length,

            pharmacies: nearbyPharmacies
        });

    } catch (error) {

        console.error(
            "Get nearby pharmacies error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch nearby pharmacies",
            error: error.message
        });
    }
};

export const getPharmacyDetails=async(req,res)=>{
    try {
         const { pharmacyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    const pharmacy = await Pharmacy.findById(pharmacyId)
      .select("-password");

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pharmacy details fetched successfully",
      pharmacy,
    });
        
    } catch (error) {

        console.error("Get pharmacy details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pharmacy details",
    });
        
    }
}

export const updatePharmacy=async(req,res)=>{
    try{
        const {pharmacyId}=req.params
        const pharmacy=await Pharmacy.findById(pharmacyId)

        if(!pharmacy){
             return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });

      
        }
        const {pharmacyName,ownerName,phone,pharmacyType,address,location}=req.body
    //update basic info

    if(pharmacyName !== undefined){
        pharmacy.pharmacyName=pharmacyName.trim()
    }
     if (ownerName !== undefined) {
      pharmacy.ownerName = ownerName.trim();
    }

    if (phone !== undefined) {
      pharmacy.phone = phone.trim();
    }

    if (pharmacyType !== undefined) {
      pharmacy.pharmacyType = pharmacyType;
    }
     if (address !== undefined) {
      try {
        pharmacy.address =
          typeof address === "string"
            ? JSON.parse(address)
            : address;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid address format",
        });
      }
    }


    if (location !== undefined) {
      try {
        pharmacy.location =
          typeof location === "string"
            ? JSON.parse(location)
            : location;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid location format",
        });
      }
    }

    if (req.file) {
      const uploadedImage = await new Promise(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder: "pharmacare/pharmacies",
                resource_type: "image",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            );

          Readable.from(req.file.buffer).pipe(
            uploadStream
          );
        }
      );

      pharmacy.image =
        uploadedImage.secure_url;
    }
    await pharmacy.save()


    // -----------------------------
    // 6. Update linked User
    // -----------------------------

    if (pharmacy.user) {
      const user = await User.findById(
        pharmacy.user
      );

      if (user) {
        if (ownerName !== undefined) {
          user.name = ownerName.trim();
        }

        if (phone !== undefined) {
          user.phone = phone.trim();
        }

        await user.save();
      }
    }

     // -----------------------------
    // 7. Response
    // -----------------------------

    return res.status(200).json({
      success: true,
      message: "Pharmacy updated successfully",

      pharmacy: {
        id: pharmacy._id,
        pharmacyName: pharmacy.pharmacyName,
        image: pharmacy.image,
        ownerName: pharmacy.ownerName,
        email: pharmacy.email,
        phone: pharmacy.phone,
        pharmacyType: pharmacy.pharmacyType,
        licenseNumber: pharmacy.licenseNumber,
        address: pharmacy.address,
        location: pharmacy.location,
        approvalStatus: pharmacy.approvalStatus,
        isActive: pharmacy.isActive,
      },
    });

    }catch(error){

          console.error(
      "Update pharmacy error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update pharmacy",
      error: error.message,
    });

    }
}