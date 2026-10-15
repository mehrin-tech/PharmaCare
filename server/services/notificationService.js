import Notification from "../models/Notification.js";

export const createNotification=async({
    userId,
    title,
    message,
    type ='system',
    orderId=null
})=>{
    try{
        const notification=await Notification.create({
            user:userId,
            title,
            message,
            type,
            order:orderId
        })
        return notification

    }catch(error){
          console.error('Notification error:', error.message)
    return null

    }
}