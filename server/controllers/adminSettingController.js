import PlatformSettings from "../models/PlatformSettings.js";

export const getPlatformSettings=async(req,res)=>{
    try{
        let settings=await PlatformSettings.findOne()

         if (!settings) {

            settings = await PlatformSettings.create({
                commissionRate: 10,
                deliveryFee: 40
            })
        }

         return res.status(200).json({

            success: true,

            settings

        })

    }catch(error){

        console.error(
            'Get platform settings error:',
            error
        )

        return res.status(500).json({

            success: false,

            message: 'Failed to get platform settings',

            error: error.message

        })

    }
}

export const updatePlatformSettings=async(req,res)=>{
    try{
        const {commissionRate,deliveryFee}=req.body

        if(commissionRate==undefined && deliveryFee==undefined){
             return res.status(400).json({

                success: false,

                message:
                    'At least one setting is required'

            })
        }
           if (
            commissionRate !== undefined &&
            (
                typeof commissionRate !== 'number' ||
                commissionRate < 0 ||
                commissionRate > 100
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    'Commission rate must be between 0 and 100'

            })
        }


        if (
            deliveryFee !== undefined &&
            (
                typeof deliveryFee !== 'number' ||
                deliveryFee < 0
            )
        ) {

            return res.status(400).json({

                success: false,

                message:
                    'Delivery fee must be 0 or greater'

            })
        }

           // FIND SETTINGS
        // ==========================================

        let settings = await PlatformSettings.findOne()


        // ==========================================
        // CREATE IF NOT EXISTS
        // ==========================================

        if (!settings) {

            settings = new PlatformSettings({
                commissionRate:
                    commissionRate ?? 10,

                deliveryFee:
                    deliveryFee ?? 40
            })

        } else {

            // ==========================================
            // UPDATE ONLY PROVIDED VALUES
            // ==========================================

            if (commissionRate !== undefined) {

                settings.commissionRate =
                    commissionRate
            }

            if (deliveryFee !== undefined) {

                settings.deliveryFee =
                    deliveryFee
            }
        }


        await settings.save()


        return res.status(200).json({

            success: true,

            message:
                'Platform settings updated successfully',

            settings

        })

    }catch(error){
          console.error(
            'Update platform settings error:',
            error
        )

        return res.status(500).json({

            success: false,

            message:
                'Failed to update platform settings',

            error: error.message

        })

    }
}