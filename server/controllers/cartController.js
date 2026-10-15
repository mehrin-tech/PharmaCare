import Cart from '../models/Cart.js'
import Medicine from '../models/Medicine.js'


export const addToCart=async(req,res)=>{
    try{

        const {medicineId,quantity=1}=req.body

        if(!medicineId){
            return res.status(400).json({
                success:false,
                message:'medicine ID  is required'
            })
        }

        if(quantity<1){
            return res.status(400).json({
                success:false,
                message:'Quantity must be at least 1'
            })
        }

        const medicine=await Medicine.findOne({
            _id:medicineId,
            isActive:true
        })

        if(!medicine){
            return res.status(404).json({
                success:false,
                message:'medicine not found'
            })
        }

        if(medicine.stock<quantity){
            return res.status(400).json({
                success:false,
                message:'Not enough stock available'
            })
        }

        let cart=await Cart.findOne({
            user:req.user.userId
        })

        if(!cart){
            cart=await Cart.create({
                user:req.user.userId,
                items:[
                    {
                        medicine:medicineId,
                        quantity
                    }
                ]
            })
        }else{
            const existingItem =cart.items.find(item=>item.medicine.toString()===medicineId)
            if(existingItem){
                const newQuantity=existingItem.quantity+quantity

                if(newQuantity>medicine.stock){
                    return res.status(400).json({
                        success:false,
                        message:'Requested quantity exceeds available stock'
                    })
                }
                existingItem.quantity=newQuantity
            }else{
                cart.items.push({
                    medicine:medicineId,
                    quantity
                })
            }
            await cart.save()
        }

        await cart.populate({
            path:'items.medicine',
            populate:{
                path:'pharmacy',
                select:'pharmacyName pharmacyType address location'
            }
        })

        return res.status(201).json({
            success:true,
            message:'medicine added to cart',
            cart
        })
    }catch(error){

        console.log('Add to cart error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to add medicine to cart',
            error: error.message
        })

    }
}

//get my cart
export const getMyCart=async(req,res)=>{
    try{
        const cart =await Cart.findOne({
            user:req.user.userId
        }).populate({
            path:'items.medicine',
            populate:{
                path:'pharmacy',
                select:'pharmacyName pharmacyType address location'
            }
        })
        //no cart yet
        if(!cart){
            return res.status(200).json({
                success:true,
                count:0,
                totalAmount:0,
                cart:{
                    items:[]
                }
            })
        }
        let totalAmount=0

        cart.items.forEach(item=>{
            if(item.medicine){
                totalAmount+=item.medicine.price*item.quantity
            }
        })
        return res.status(200).json({
            success:true,
            count:cart.items.length,
            totalAmount,
            cart
        })

    }catch(error){
          console.log('Get cart error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to fetch cart',
            error: error.message
        })

    }
}

export const updateCart=async(req,res)=>{
    try{
        const {medicineId}=req.params
        const {quantity}=req.body

        if(quantity===undefined ||quantity<1){
            return res.status(400).json({
                success:false,
                message:'valied quantity is required'
            })
        }

        const medicine=await Medicine.findOne({
            _id:medicineId,
            isActive:true
        })
        if(!medicine){
            return res.status(404).json({
                success:false,
                message:'medicine not found'
            })
        }

        if(quantity>medicine.stock){
            return res.status(400).json({
                success:false,
                message:'Requested quantity exceeds available stock'
            })
        }

        const cart=await Cart.findOne({
            user:req.user.userId
        })

        if(!cart){
            return res.status(404).json({
                success:false,
                message:'cart not found'
            })
        }

        const item=cart.items.find(item=>item.medicine.toString()===medicineId)

        if(!item){
            return res.status(404).json({
                success:false,
                message:'medicine not found in cart'
            })
        }

        item.quantity=quantity

        await cart.save()
        await cart.populate({
            path:'items.medicine',
            populate:{
                path:'pharmacy',
                select: 'pharmacyName pharmacyType address location'
            }
        })

         return res.status(200).json({
            success: true,
            message: 'Cart quantity updated successfully',
            cart
        })


    }catch(error){

        console.log('Update cart error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to update cart',
            error: error.message
        })

    }
}

//remove from cart
export const removeFromCart=async(req,res)=>{
    try{
        const {medicineId}=req.params
        const cart =await Cart.findOne({
            user:req.user.userId
        })

        if(!cart){
            return res.status(404).json({
                success:false,
                message:'cart not found'
            })
        }

        const itemExists=cart.items.some(item=>item.medicine.toString()===medicineId)
        if(!itemExists){
            return res.status(404).json({
                success:false,
                message:'medicine not found in cart'
            })
        }

        cart.items=cart.items.filter(item=>item.medicine.toString()!==medicineId)

        await cart.save()

        await cart.populate({
    path: 'items.medicine',
    populate: {
        path: 'pharmacy',
        select: 'pharmacyName pharmacyType address location'
    }
});

        return res.status(200).json({
            success:true,
            message:'medicine removed from cart'
        })

    }catch(error){
         console.log('Remove cart error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to remove medicine from cart',
            error: error.message
        })
    

    }
}

//clear cart

export const clearCart=async(req,res)=>{
    try{
        const cart=await Cart.findOne({
            user:req.user.userId
        })

        if(!cart){
            return res.status(404).json({
                success:false,
                message:'cart not found'
            })
        }

        cart.items=[]

        await cart.save()

        return res.status(200).json({
            success:true,
            message:'cart cleared successfully'
        })

    }catch(error){
         console.log('Clear cart error:', error)

        return res.status(500).json({
            success: false,
            message: 'Failed to clear cart'
        })

    }
}