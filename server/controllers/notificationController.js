import Notification from "../models/Notification.js";

//get my notifications
export const getMyNotifications=async(req,res)=>{
    try{
        const notifications=await Notification.find({
            user:req.user.userId
        }).sort({createdAt:-1}).populate('order')

        const unreadCount=await Notification.countDocuments({
            user:req.user.userId,
            isRead:false
        })
         res.status(200).json({
      success: true,
      unreadCount,
      notifications
    })

    }catch(error){
         res.status(500).json({
      success: false,
      message: 'Failed to get notifications',
      error: error.message
    })

    }
}
//mark one notftn read
export const markNotificationAsRead=async(req,res)=>{
    try{
        const notification=await Notification.findOneAndUpdate({
            _id:req.params.notificationId,
            user:req.user.userId
        },
    {isRead:true},
{
    new:true
})
if(!notification){
     return res.status(404).json({
        success: false,
        message: 'Notification not found'
      })
}
  res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      notification
    })

    }catch(error){
 res.status(500).json({
      success: false,
      message: 'Failed to update notification',
      error: error.message
    })
    }
}
//mark all as read
export const markAllNotificationsAsRead=async(req,res)=>{
    try{
        await Notification.updateMany({
            user:req.user.userId,
            isRead:false
        },
    {
        isRead:true
    })
 res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    })

    }catch(error){
        res.status(500).json({
      success: false,
      message: 'Failed to update notifications',
      error: error.message
    })

    }
}