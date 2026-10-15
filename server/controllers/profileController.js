import User from "../models/User.js";
import Pharmacy from "../models/Pharmacy.js";
import cloudinary from '../config/cloudinary.js'
//get customer/pharmacy/admin profile


export const getMyProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.userId)
        .select("-password")

        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }

        let profile={
            user:{
                 _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profilePhoto:user.profilePhoto,
                isActive: user.isActive
            }
            
        }
        if(user.role==='pharmacy'){
            const pharmacy=await Pharmacy.findOne({
                user:user._id
            })
            profile.pharmacy=pharmacy
        }
        return res.status(200).json({
            success:true,
            profile
        })

    }catch(error){
        console.log("Get profile error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get profile",
            error: error.message
        });
        
    }
}
//customer profile update

export const updateCustomerProfile=async(req,res)=>{
    try{
        if(req.user.role!=="customer"){
            return res.status(403).json({
                success: false,
                message: "Only customers can update this profile"
            })
        }

        const { name,
    email,
    phone,
    dateOfBirth,
    bloodGroup,
    gender,
    preferredLanguage}=req.body
        const user=await User.findById(req.user.userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }
        if (email && email !== user.email) {

            const existingUser = await User.findOne({
                email,
                _id: { $ne: user._id }
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        if (phone) {
            user.phone = phone;
        }

        if (dateOfBirth) {
    user.dateOfBirth = dateOfBirth;
}

if (bloodGroup) {
    user.bloodGroup = bloodGroup;
}

if (gender) {
    user.gender = gender;
}

if (preferredLanguage) {
    user.preferredLanguage = preferredLanguage;
}

       
        if (req.file) {
    const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "pharmacare/profiles",
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(req.file.buffer);
    });

    user.profilePhoto = result.secure_url;
}

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Customer profile updated successfully",
            profile: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profilePhoto:user.profilePhoto,
                dateOfBirth: user.dateOfBirth,

                bloodGroup: user.bloodGroup,

                gender: user.gender,

                preferredLanguage:
                    user.preferredLanguage
            }
        });

    }catch(error){
        console.log("Customer profile update error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update customer profile",
            error: error.message
        });

    }

}

export const updatePharmacyProfile = async (
    req,
    res
) => {

    try {

        if (req.user.role !== "pharmacy") {
            return res.status(403).json({
                success: false,
                message: "Only pharmacies can update this profile"
            });
        }

        const {
            name,
            email,
            phone,
            pharmacyName,
            ownerName,
            pharmacyType,
            address,
            image
        } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Pharmacy user not found"
            });
        }

        const pharmacy = await Pharmacy.findOne({
            user: user._id
        });

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: "Pharmacy not found"
            });
        }

        // User details

        if (email && email !== user.email) {

            const existingUser = await User.findOne({
                email,
                _id: { $ne: user._id }
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        if (phone) {
            user.phone = phone;
        }

        await user.save();


        // Pharmacy details

        if (pharmacyName) {
            pharmacy.pharmacyName = pharmacyName;
        }

        if (ownerName) {
            pharmacy.ownerName = ownerName;
        }

        if (phone) {
            pharmacy.phone = phone;
        }

        if (email) {
            pharmacy.email = email;
        }

        if (pharmacyType) {
            pharmacy.pharmacyType = pharmacyType;
        }

if (address !== undefined && address !== null) {
  let addressData;

  if (typeof address === "string") {
    try {
      // Handle JSON string if one is submitted
      addressData = JSON.parse(address);
    } catch {
      // Handle normal text address
      addressData = {
        street: address.trim(),
        city: "",
        state: "",
        pincode: "",
      };
    }
  } else {
    addressData = address;
  }

  if (
    !addressData ||
    typeof addressData !== "object" ||
    Array.isArray(addressData)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid address format",
    });
  }

  pharmacy.address = {
    street: addressData.street ?? pharmacy.address?.street ?? "",
    city: addressData.city ?? pharmacy.address?.city ?? "",
    state: addressData.state ?? pharmacy.address?.state ?? "",
    pincode: addressData.pincode ?? pharmacy.address?.pincode ?? "",
  };
}


        if (req.file) {
            const uploadedImage = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "pharmacare/pharmacies", resource_type: "image" },
                    (error, result) => error ? reject(error) : resolve(result)
                );
                uploadStream.end(req.file.buffer);
            });
            pharmacy.image = uploadedImage.secure_url;
        } else if (typeof image === "string") {
            pharmacy.image = image.trim();
        }

        await pharmacy.save();

        return res.status(200).json({
            success: true,
            message: "Pharmacy profile updated successfully",
            profile: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                },
                pharmacy
            }
        });

    } catch (error) {

        console.log("Pharmacy profile update error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update pharmacy profile",
            error: error.message
        });
    }
};

export const updateAdminProfile = async (
    req,
    res
) => {

    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admin can update this profile"
            });
        }

        const { name, email, phone } = req.body;

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        if (email && email !== user.email) {

            const existingUser = await User.findOne({
                email,
                _id: { $ne: user._id }
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        if (phone) {
            user.phone = phone;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Admin profile updated successfully",
            profile: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {

        console.log("Admin profile update error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update admin profile",
            error: error.message
        });
    }
};
