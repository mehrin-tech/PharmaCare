import Address from '../models/Address.js'


export const addAddress = async (req, res) => {
    try {
        const {
            fullName,
            phone,
            street,
            city,
            state,
            pincode,
            landmark,
            addressType,
            location,
            isDefault
        } = req.body

        if (!fullName ||
            !phone ||
            !street ||
            !city ||
            !state ||
            !pincode ||
            location?.latitude === undefined ||
            location?.latitude === null ||
            location?.longitude === undefined ||
            location?.longitude === null

        ) {
            return res.status(400).json({
                success: false,
                message: 'Full name, phone, street, city, state,location, pincode are required'
            })
        }

        if (isDefault === true) {
            await Address.updateMany({ user: req.user.userId }, { $set: { isDefault: false } })
        }

        const addressCount = await Address.countDocuments({
            user: req.user.userId
        })

        const latitude = Number(location.latitude)
        const longitude = Number(location.longitude)

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid latitude or longitude'
            })
        }
        const address = await Address.create({
            user: req.user.userId,
            fullName,
            phone,
            street,
            city,
            state,
            pincode,
            landmark,
            addressType,
            location: {
                latitude,
                longitude
            },
            isDefault: addressCount === 0
                ? true
                : Boolean(isDefault)
        })
        return res.status(201).json({
            success: true,
            message: 'Address added successfully',
            address
        })

    } catch (error) {
        console.log('Add address error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to add address',
            error: error.message
        })

    }
}

//get my address
export const getMyAddress = async (req, res) => {
    try {
        const addresses = await Address.find({
            user: req.user.userId
        }).sort({
            isDefault: -1,
            createdAt: -1
        })
        return res.status(200).json({
            success: true,
            count: addresses.length,
            addresses
        })

    } catch (error) {
        console.log('Get addresses error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch addresses',
            error: error.message
        })

    }
}
//get single address

export const getAddressDetails = async (req, res) => {
    try {
        const { addressId } = req.params

        const address = await Address.findOne({
            _id: addressId,
            user: req.user.userId
        })
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }
        return res.status(200).json({
            success: true,
            address
        })

    } catch (error) {
        console.log('Get address details error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch address',
            error: error.message
        })

    }
}

//update address
export const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params

        const address = await Address.findOne({
            _id: addressId,
            user: req.user.userId
        })
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }

        const {
            fullName,
            phone,
            street,
            city,
            state,
            pincode,
            landmark,
            addressType,
            location,
            isDefault
        } = req.body

        if (isDefault === true) {
            await Address.updateMany({
                user: req.user.userId
            }, {
                $set: {
                    isDefault: false
                }
            }
            )
            address.isDefault = true

        }

        if (fullName !== undefined) address.fullName = fullName
        if (phone !== undefined) address.phone = phone
        if (street !== undefined) address.street = street
        if (city !== undefined) address.city = city
        if (state !== undefined) address.state = state
        if (pincode !== undefined) address.pincode = pincode
        if (landmark !== undefined) address.landmark = landmark
        if (addressType !== undefined) address.addressType = addressType
        if (location !== undefined) {

            if (
                location.latitude === undefined ||
                location.latitude === null ||
                location.longitude === undefined ||
                location.longitude === null
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Both latitude and longitude are required'
                })
            }

            const latitude = Number(location.latitude)
            const longitude = Number(location.longitude)

            if (
                !Number.isFinite(latitude) ||
                !Number.isFinite(longitude)
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid latitude or longitude'
                })
            }

            address.location = {
                latitude,
                longitude
            }
        }
        if (isDefault === false) {
            address.isDefault = false
        }
        await address.save()

        return res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            address
        })



    } catch (error) {
        console.log('Update address error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to update address',
            error: error.message
        })

    }
}

//set default address

export const setDefaultAddress = async (req, res) => {
    try {
        const { addressId } = req.params

        const address = await Address.findOne({
            _id: addressId,
            user: req.user.userId
        })

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }

        await Address.updateMany({
            user: req.user.userId
        }, {
            $set: {
                isDefault: false
            }
        })

        address.isDefault = true

        await address.save()
        return res.status(200).json({
            success: true,
            message: 'Default address updated successfully',
            address
        })

    } catch (error) {
        console.log('Set default address error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to set default address',
            error: error.message
        })

    }
}
//delete Address

export const deleteAddress = async (req, res) => {
    try {

        const { addressId } = req.params

        const address = await Address.findOne({
            _id: addressId,
            user: req.user.userId
        })

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }

        await Address.deleteOne({
            _id: addressId
        })


        if (address.isDefault) {
            const nextAddress = await Address.findOne({
                user: req.user.userId
            }).sort({ createdAt: -1 })

            if (nextAddress) {
                nextAddress.isDefault = true
                await nextAddress.save()
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Address deleted successfully'
        })

    } catch (error) {
        console.log('Delete address error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to delete address',
            error: error.message
        })

    }
}