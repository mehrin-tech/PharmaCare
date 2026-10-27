import Medicine from '../models/Medicine.js'
import Pharmacy from '../models/Pharmacy.js'
import cloudinary from '../config/cloudinary.js'
import { Readable } from 'stream'
import mongoose from 'mongoose'
export const addMedicine = async (req, res) => {
    try {
        console.log("BODY:", req.body)
        console.log("FILE:", req.file)
        const pharmacy = await Pharmacy.findOne({
            user: req.user.userId
        })

        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }

        if (pharmacy.approvalStatus !== 'approved') {
            return res.status(403).json({
                success: false,
                message: 'Pharmacy is not approved'
            })
        }

        const {
            name,
            genericName,
            brandName,
            manufacturer,
            category,
            description,
            mrp,
            price,
            stock,
            packSize,
            dosage,
            form,
            drugType,
            countryOfOrigin,
            prescriptionRequired,
            expiryDate,

        } = req.body;
        if (!name || !category || price === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Name, category and price are required'
            })
        }

        let image = ''
        if (req.file) {
            const uploadToCloudinary = () => {
                return new Promise((resolve, reject) => {

                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'pharmacare/medicines',
                            resource_type: 'image'
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

            image = result.secure_url
        }



        const medicine = await Medicine.create({
            pharmacy: pharmacy._id,
            name,
            genericName,
            brandName,
            manufacturer,
            category,
            description,
            mrp: Number(mrp),
            price: Number(price),
            stock: Number(stock) || 0,
            packSize,
            dosage,
            form,
            drugType,
            countryOfOrigin,
            prescriptionRequired: prescriptionRequired === 'true',
            image,
            expiryDate,

        })
        return res.status(201).json({
            success: true,
            message: 'Medicine added successfully',
            medicine
        })
    } catch (error) {
        console.log('Add medicine error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to add medicine',
            error: error.message
        })

    }
}


// export const getMyMedicines = async (req, res) => {
//     try {
//         const pharmacy = await Pharmacy.findOne({
//             user: req.user.userId
//         })

//         if (!pharmacy) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Pharmacy not found'
//             })
//         }

//         const medicines = await Medicine.find({
//             pharmacy: pharmacy._id,
//             isActive: true
//         }).sort({ createdAt: -1 })

//         return res.status(200).json({
//             success: true,
//             count: medicines.length,
//             medicines
//         })

//     } catch (error) {
//         console.log('Get medicines error:', error)

//         return res.status(500).json({
//             success: false,
//             message: 'Failed to fetch medicines',
//             error: error.message
//         })

//     }
// }


// Get my medicines with pagination
export const getMyMedicines = async (req, res) => {
  try {
    // 1. Find pharmacy belonging to the logged-in user
    const pharmacy = await Pharmacy.findOne({
      user: req.user.userId,
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        message: "Pharmacy not found",
      });
    }

    // 2. Get pagination parameters
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number(req.query.limit) || 10)
    );

    const skip = (page - 1) * limit;

    // 3. Define filter
    const filter = {
      pharmacy: pharmacy._id,
      isActive: true,
    };

    // 4. Fetch medicines and total count
    const [medicines, totalMedicines] = await Promise.all([
      Medicine.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Medicine.countDocuments(filter),
    ]);

    // 5. Calculate total pages
    const totalPages = Math.ceil(totalMedicines / limit);

    // 6. Send response
    return res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
      pagination: {
        currentPage: page,
        totalPages,
        totalMedicines,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.log("Get medicines error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch medicines",
      error: error.message,
    });
  }
};

export const getAllActiveMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find({
            isActive: true,
        })
            .populate({
                path: "pharmacy",
                match: {
                    approvalStatus: "approved",
                    isActive: true,
                },
                select: "pharmacyName pharmacyType address location",
            })
            .sort({ createdAt: -1 });

        // Remove medicines whose pharmacy is not approved/active
        const availableMedicines = medicines.filter(
            (medicine) => medicine.pharmacy !== null
        );

        return res.status(200).json({
            success: true,
            count: availableMedicines.length,
            medicines: availableMedicines,
        });
    } catch (error) {
        console.error("Get active medicines error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch active medicines",
            error: error.message,
        });
    }
};

export const updateMedicine = async (req, res) => {
    try {
        const { medicineId } = req.params

        const pharmacy = await Pharmacy.findOne({
            user: req.user.userId
        })
        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }

        if (pharmacy.approvalStatus !== 'approved') {
            return res.status(403).json({
                success: false,
                message: 'Pharmacy is not approved'
            })
        }

        const medicine = await Medicine.findOne({
            _id: medicineId,
            pharmacy: pharmacy._id
        })

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            })
        }

        const {
            name,
            genericName,
            brandName,
            category,
            description,
            mrp,
            price,
            stock,
            prescriptionRequired,
            image,
            expiryDate
        } = req.body

        if (name !== undefined) medicine.name = name
        if (genericName !== undefined) medicine.genericName = genericName
        if (brandName !== undefined) medicine.brandName = brandName
        if (category !== undefined) medicine.category = category
        if (description !== undefined) medicine.description = description
        if (mrp !== undefined) medicine.mrp = mrp
        if (price !== undefined) medicine.price = price
        if (stock !== undefined) medicine.stock = stock
        if (prescriptionRequired !== undefined) {
            medicine.prescriptionRequired = prescriptionRequired
        }
        if (image !== undefined) medicine.image = image
        if (expiryDate !== undefined) medicine.expiryDate = expiryDate

        await medicine.save()

        return res.status(200).json({
            success: true,
            message: 'Medicine updated successfully',
            medicine
        })


    } catch (error) {
        console.log('Update medicine error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to update medicine',
            error: error.message
        })

    }
}

export const deleteMedicine = async (req, res) => {
    try {
        const { medicineId } = req.params

        const pharmacy = await Pharmacy.findOne({
            user: req.user.userId
        })
        if (!pharmacy) {
            return res.status(404).json({
                success: false,
                message: 'Pharmacy not found'
            })
        }
        // 2. Check approval
        if (pharmacy.approvalStatus !== 'approved') {
            return res.status(403).json({
                success: false,
                message: 'Pharmacy is not approved'
            })
        }

        // 3. Find medicine belonging to this pharmacy
        const medicine = await Medicine.findOne({
            _id: medicineId,
            pharmacy: pharmacy._id
        })

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            })
        }

        //delte
        medicine.isActive = false
        await medicine.save()

        return res.status(200).json({
            success: true,
            message: 'Medicine deleted successfully',
            medicine: {
                id: medicine._id,
                name: medicine.name,
                isActive: medicine.isActive
            }
        })


    } catch (error) {
        console.log('Delete medicine error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to delete medicine',
            error: error.message
        })

    }
}

export const searchMedicines = async (req, res) => {
    try {
        const { search = "", category = '', } = req.query
        const query = {
            isActive: true
        }

        if (!search.trim()) {
            query.$nor = [
                {
                    name: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
                {
                    genericName: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
                {
                    brandName: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                }
            ]
        }

        // Category filter
    if (category.trim()) {
      query.category = {
        $regex: `^${category.trim()}$`,
        $options: "i",
      };
    }

      

        const medicines = await Medicine.find(query)
      .populate(
        "pharmacy",
        "pharmacyName image pharmacyType address location"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: medicines.length,
      medicines,
    });

    } catch (error) {
        console.log('Search medicines error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to search medicines',
            error: error.message
        })

    }
}

export const compareMedicinePrices = async (req, res) => {
    try {
        const { query, latitude, longitude, radius = 20 } = req.query

        // 1. Validate input
        if (!query) {
            return res.status(400).json({
                success: false,
                message: 'Medicine search query is required'
            })
        }

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: 'Latitude and longitude are required'
            })
        }

        const userLatitude = Number(latitude)
        const userLongitude = Number(longitude)
        const maxRadius = Number(radius)

        if (
            Number.isNaN(userLatitude) ||
            Number.isNaN(userLongitude) ||
            Number.isNaN(maxRadius)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid location values'
            })
        }

        const medicines = await Medicine.find({
            isActive: true,
            stock: { $gt: 0 },
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { genericName: { $regex: query, $options: 'i' } },
                { brandName: { $regex: query, $options: 'i' } }
            ]
        }).populate({
            path: 'pharmacy',
            match: {
                approvalStatus: 'approved',
                isActive: true
            },
            select: 'pharmacyName pharmacyType address location'
        })

        // 3. Remove medicines without valid pharmacy
        const validMedicines = medicines.filter(
            medicine =>
                medicine.pharmacy &&
                medicine.pharmacy.location &&
                medicine.pharmacy.location.latitude !== undefined &&
                medicine.pharmacy.location.longitude !== undefined
        )

        // 4. Calculate distance
        const calculateDistance = (
            lat1,
            lon1,
            lat2,
            lon2
        ) => {

            const toRadians = (degree) => {
                return degree * (Math.PI / 180)
            }

            const R = 6371

            const dLat = toRadians(lat2 - lat1)
            const dLon = toRadians(lon2 - lon1)

            const a =
                Math.sin(dLat / 2) *
                Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2)

            const c =
                2 *
                Math.atan2(
                    Math.sqrt(a),
                    Math.sqrt(1 - a)
                )

            return R * c
        }

        const results = validMedicines
            .map(medicine => {

                const pharmacy = medicine.pharmacy

                const distance = calculateDistance(
                    userLatitude,
                    userLongitude,
                    pharmacy.location.latitude,
                    pharmacy.location.longitude
                )

                return {
                    medicineId: medicine._id,
                    name: medicine.name,
                    genericName: medicine.genericName,
                    brandName: medicine.brandName,
                    price: medicine.price,
                    stock: medicine.stock,
                    prescriptionRequired:
                        medicine.prescriptionRequired,

                    pharmacy: {
                        id: pharmacy._id,
                        pharmacyName:
                            pharmacy.pharmacyName,
                        pharmacyType:
                            pharmacy.pharmacyType,
                        address:
                            pharmacy.address,
                        location:
                            pharmacy.location
                    },

                    distance: Number(
                        distance.toFixed(2)
                    )
                }
            })
            // 6. Filter by radius
            .filter(
                medicine =>
                    medicine.distance <= maxRadius
            )
            // 7. Sort by price
            .sort(
                (a, b) =>
                    a.price - b.price
            )

        // 8. Response
        return res.status(200).json({
            success: true,
            query,
            userLocation: {
                latitude: userLatitude,
                longitude: userLongitude
            },
            radius: maxRadius,
            count: results.length,
            results
        })


    } catch (error) {
        console.log(
            'Compare medicine prices error:',
            error
        )

        return res.status(500).json({
            success: false,
            message: 'Failed to compare medicine prices',
            error: error.message
        })

    }
}

export const getMedicineDetails = async (req, res) => {
    try {
        const { medicineId } = req.params

        const medicine = await Medicine.findOne({
            _id: medicineId,
            isActive: true
        }).populate('pharmacy', 'pharmacyName pharmacyType address location')

        if (!medicine) {
            return res.status(404).json({
                success: false,
                message: 'Medicine not found'
            })
        }
        return res.status(200).json({
            success: true,
            medicine
        })
    } catch (error) {
        console.log('Get medicine details error:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch medicine details',
            error: error.message
        });

    }
}


export const getMedicinesByPharmacy = async (req, res) => {
    try {
        const { pharmacyId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(pharmacyId)) {
            return res.status(404).json({
                success: false,
                message: "Pharmacy not found",
            });
        }

        const medicines = await Medicine.find({
            pharmacy: pharmacyId,
            isActive: true,
            stock: { $gt: 0 },
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: medicines.length,
            medicines,
        });

    } catch (error) {
        console.error("Get pharmacy medicines error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch pharmacy medicines",
            error: error.message,
        });
    }
};
