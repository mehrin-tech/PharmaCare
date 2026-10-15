import Cart from '../models/Cart.js'
import Address from '../models/Address.js'
import Medicine from '../models/Medicine.js'
import Prescription from '../models/Prescription.js'


export const getCheckout=async(req,res)=>{
    try{

        const userId=req.user.userId

        const cart=await Cart.findOne({
            user:userId
        }).populate('items.medicine')

        if(!cart || cart.items.length===0){
            return res.status(400).json({
                success:false,
                message:'cart is empty'
            })
        }
        const address=await Address.findOne({
            user:userId,
            isDefault:true
        })

        if(!address){
            return res.status(400).json({
                success:false,
                message:'please add a default address before checkout'
            })
        }
        let subtotal=0
        const checkoutItems=[]
        //check med
        for(const item of cart.items){
            const medicine=await Medicine.findById(item.medicine._id)

            if(!medicine){
                return res.status(404).json({
                    success:false,
                    message:'Medicine not found'
                })
            }
            //check activ med

            if(!medicine.isActive){
                return res.status(400).json({
                    success:false,
                    message:`${medicine.name} is no longer available`
                })
            }

            //check stock

            if(medicine.stock<item.quantity){
                return res.status(400).json({
                    success:false,
                    message:`only ${medicine.stock} units of ${medicine.name} are available`
                })
            }

            //prescription check

            if(medicine.prescriptionRequired){
                const approvedPrescription=await Prescription.findOne({
                    user:userId,
                    medicine: medicine._id,
                    status:'approved'
                })

                if(!approvedPrescription){
                    return res.status(403).json({
                        success:false,
                        message:`Approved prescription required for ${medicine.name}`
                    })
                }
            }

            const itemTotal=medicine.price*item.quantity

            subtotal+=itemTotal

            checkoutItems.push({
                medicine:medicine._id,
                name:medicine.name,
                quantity:item.quantity,
                price:medicine.price,
                total:itemTotal
            })
        }


        const deliveryFee=subtotal>=500?0:40

        const totalAmount=subtotal+deliveryFee

        return res.status(200).json({
            success:true,
            checkout:{
                items:checkoutItems,
                address,
                subtotal,
                deliveryFee,
                totalAmount
            }
        })

    }catch(error){
          console.log('Checkout error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to process checkout',
            error: error.message
        })

    }
}