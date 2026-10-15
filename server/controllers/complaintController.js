import Complaint from '../models/Complaint.js'
import Pharmacy from '../models/Pharmacy.js'
import Order from '../models/Order.js'

export const createComplaint=async(req,res)=>{
    try{
        const {pharmacyId,orderId,subject,description}=req.body

        if(!subject || !description){
            return res.status(400).json({
                success:false,
                message:'Subject and description are required'
            })
        }
        if(pharmacyId){
            const pharmacy=await Pharmacy.findById(pharmacyId)
            if(!pharmacy){
                return res.status(404).json({
                    success:false,
                    message:'Pharmacy Not Found'
                })
            }
        }

        if(orderId){
            const order=await Order.findOne({
                _id:orderId,
                user:req.user.userId
            })
             if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                })
            }
        }

        const complaint=await Complaint.create({
            user:req.user.userId,
            pharmacy:pharmacyId||null,
            order:orderId|| null,
            subject,
            description,
            status:'pending'
        })

        return res.status(201).json({
            success: true,
            message: 'Complaint submitted successfully',
            complaint
        })


    }catch(error){

         console.log('Create complaint error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to create complaint',
            error: error.message
        })

    }
}

export const getMyComplaints=async(req,res)=>{
    try{
          const complaints = await Complaint.find({
            user: req.user.userId
        })
            .populate('pharmacy', 'pharmacyName phone')
            .populate('order', 'totalAmount orderStatus paymentStatus')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            count: complaints.length,
            complaints
        })

    }catch(error){
         console.log('Get complaints error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch complaints',
            error: error.message
        })

    }
}

export const getAllComplaints=async(req,res)=>{
       try {

        const complaints = await Complaint.find()
            .populate('user', 'name email phone')
            .populate('pharmacy', 'pharmacyName phone')
            .populate('order', 'totalAmount orderStatus paymentStatus')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            count: complaints.length,
            complaints
        })

    } catch (error) {

        console.log('Get all complaints error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch complaints',
            error: error.message
        })
    }
}
export const getComplaintDetails = async (req, res) => {
    try {

        const { complaintId } = req.params

        const complaint = await Complaint.findById(complaintId)
            .populate('user', 'name email phone')
            .populate('pharmacy', 'pharmacyName phone email')
            .populate('order')

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            })
        }

        return res.status(200).json({
            success: true,
            complaint
        })

    } catch (error) {

        console.log('Complaint details error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch complaint details',
            error: error.message
        })
    }
}

export const updateComplaint = async (req, res) => {
    try {

        const { complaintId } = req.params
        const { status, adminResponse } = req.body

        const allowedStatuses = [
            'pending',
            'investigating',
            'resolved',
            'rejected'
        ]

        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid complaint status'
            })
        }

        const complaint = await Complaint.findById(complaintId)

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: 'Complaint not found'
            })
        }

        if (status) {
            complaint.status = status
        }

        if (adminResponse !== undefined) {
            complaint.adminResponse = adminResponse
        }

        if (status === 'resolved') {
            complaint.resolvedAt = new Date()
        }

        await complaint.save()

        return res.status(200).json({
            success: true,
            message: 'Complaint updated successfully',
            complaint
        })

    } catch (error) {

        console.log('Update complaint error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to update complaint',
            error: error.message
        })
    }
}