import Order from '../models/Order.js'
import Medicine from '../models/Medicine.js'
import Pharmacy from '../models/Pharmacy.js'
import PlatformSettings from '../models/PlatformSettings.js'
export const getRevenueReport=async(req,res)=>{
    try{

        const settings = await PlatformSettings.findOne()

        const COMMISSION_RATE =
            settings?.commissionRate ?? 10

        const orders=await Order.find({
            orderStatus:'delivered'
        }).sort({createdAt:-1})

        

        let totalSales=0
        let totalDeliveryFees=0
        let platformCommission=0
        let pharmacyEarnings=0

        const pharmacyMap=new Map()

        for(const order of orders){
            totalDeliveryFees+=order.deliveryFee || 0

            for(const item of order.items){
                const medicine=await Medicine.findById(item.medicine)

                if(!medicine ||!medicine.pharmacy){
                    continue
                }

                const pharmacyId=medicine.pharmacy.toString()
                const itemSales=item.price*item.quantity

                totalSales+=itemSales

                const commission=itemSales*COMMISSION_RATE/100
                const earnings=itemSales-commission

                platformCommission+=commission
                pharmacyEarnings+=earnings

                if(!pharmacyMap.has(pharmacyId)){
                    pharmacyMap.set(pharmacyId,{
                        pharmacyId,
                        sales:0,
                        commission:0,
                        earnings:0
                    })
                }

                const pharmacyData=pharmacyMap.get(pharmacyId)

                pharmacyData.sales += itemSales
                pharmacyData.commission += commission
                pharmacyData.earnings += earnings
            }
        }

        const pharmacies=[]

        for(const data of pharmacyMap.values()){
            const pharmacy=await Pharmacy.findById(data.pharmacyId)

            if(pharmacy){
                pharmacies.push({
                    pharmacyId: pharmacy._id,
                    pharmacyName: pharmacy.pharmacyName,
                    sales: data.sales,
                    commission: data.commission,
                    earnings: data.earnings
                })
            }
        }
          return res.status(200).json({
            success: true,

            report: {
                totalDeliveredOrders: orders.length,
                totalSales,
                totalDeliveryFees,
                platformCommission,
                pharmacyEarnings,
                commissionRate: `${COMMISSION_RATE}%`,
                pharmacies
            }
        })


    }catch(error){
        console.log('Revenue report error:', error)

        return res.status(500).json({
            success: false,
            message: 'failed to generate revenue report',
            error: error.message
        })

    }
}