// import jwt from 'jsonwebtoken'

// export const protect=(req,res,next)=>{
//     try{

//         const authHeader= req.headers.authorization;

//         if(!authHeader ||!authHeader.startsWith('Bearer ')){
//             return res.status(401).json({
//                 success:false,
//                 message:"Not authorized. Token required",
//             })
//         }
//         const token =authHeader.split(" ")[1];
//         const decoded =jwt.verify(
//             token,
//             process.env.JWT_SECRET
//         )
//         console.log("Decoded user:", decoded)
//         req.user=decoded
//         next()
//     }catch(error){
//         return res.status(401).json({
//             success:false,
//             message:"Invalid or expired token"
//         })

//     }
// }


import jwt from 'jsonwebtoken'
import Pharmacy from '../models/Pharmacy.js'

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized. Token required',
            })
        }

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        console.log('Decoded user:', decoded)

        // Check pharmacy approval status
        if (decoded.role === 'pharmacy') {
            const pharmacy = await Pharmacy.findOne({
                user: decoded.userId,
            })

            if (!pharmacy) {
                return res.status(403).json({
                    success: false,
                    message: 'Pharmacy account not found',
                })
            }

            if (pharmacy.approvalStatus !== 'approved') {
                return res.status(403).json({
                    success: false,
                    message:
                        pharmacy.approvalStatus === 'rejected'
                            ? 'Your pharmacy registration has been rejected.'
                            : 'Your pharmacy is waiting for admin approval.',
                    approvalStatus: pharmacy.approvalStatus,
                })
            }
        }

        req.user = decoded
        next()

    } catch (error) {
        console.error('Authentication error:', error)

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        })
    }
}