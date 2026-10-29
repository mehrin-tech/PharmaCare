import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Pharmacy from '../models/Pharmacy.js'
import jwt from 'jsonwebtoken'
import crypto from "crypto"
import nodemailer from 'nodemailer'
import { BadRequestError,ConflictError,UnauthorizedError } from '../Utils/error.js'
export const registerUser = async (req,res,next)=>{
    try{
        const {name,email,password,phone,role}=req.body

        //check required fields
        if(!name || !email || !password){
           return next( new BadRequestError('Name,email,and password are required'))
        }
        //check existing user
        const existingUser = await User.findOne({email})
        if(existingUser){
          return next(new ConflictError('user already exists'))
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create user
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
            role:role || 'customer',
        })

        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role,
            },
        })
    }catch(error){
        next(error)
        // res.status(500).json({
        //     success:false,
        //     message:'Registration failed',
        //     error:error.message
        // })
    }
}


//Login

export const loginUser =async (req,res,next)=>{
    try{
        const {email,password} = req.body;

        //1.validate input
        if(!email || !password){
          return next(new BadRequestError('email and password are required'))
        }

        //2.find user
        const user = await User.findOne({email});

        if(!user){
          return next(new UnauthorizedError('Unauthorized error'))
        }

        //check password

        console.log("Email:", email);
console.log("Password entered:", password);
console.log("Stored hash:", user.password);

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        console.log("Password match:", isPasswordCorrect);

        if(!isPasswordCorrect){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password",
            })
        }

        if(user.role === 'pharmacy'){
            const pharmacy=await Pharmacy.findOne({
                user:user._id,
            })
            if(!pharmacy){
                return res.status(403).json({
                    success:false,
                    message:'pharmacy account not found'
                })
            }

            if (pharmacy.approvalStatus !== "approved") {
    return res.status(403).json({
        success: false,
        message:
            pharmacy.approvalStatus === "rejected"
                ? "Your pharmacy registration has been rejected."
                : "Your pharmacy registration is awaiting admin approval.",
        approvalStatus: pharmacy.approvalStatus,
    });
}
        }
        //4 create JWT
        const token= jwt.sign({
            userId:user._id,
            role:user.role,
        },
    process.env.JWT_SECRET,
    {expiresIn:'10d'}
)

//send response

res.status(200).json({
    success:true,
    message:'login successful',
    token,
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        role:user.role,
    },
})
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Login Failed",
            error:error.message
        })

    }
}

export const getMe =async (req,res)=>{
    try{
        const user =await User.findById(req.user.userId).select('-password')

        if(!user){
            return res.status(404).json({
                success:false,
                message:'user not found'
            })
        }
        res.status(200).json({
            success:true,
            user
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:'failed to get user',
            error :error.message
        })

    }
}

export const resetPharmacyPassword = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash("Medicare@123", 10)

        const user = await User.findOneAndUpdate(
            {
                email: "medicare@gmail.com",
                role: "pharmacy"
            },
            {
                password: hashedPassword
            },
            {
                new: true
            }
        )

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Pharmacy user not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Pharmacy password reset successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Password reset failed",
            error: error.message
        })
    }
}


export const updateProfile = async (req, res) => {
    try {

        const { name, email, phone } = req.body

        if (!name && !email && !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please provide at least one field to update'
            })
        }

        const user = await User.findById(req.user.userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }


        // =========================
        // EMAIL UPDATE
        // =========================

        if (email && email !== user.email) {

            const existingUser = await User.findOne({
                email: email,
                _id: { $ne: req.user.userId }
            })

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: 'email already exists'
                })
            }

            user.email = email


            // Pharmacy email sync
            if (req.user.role === 'pharmacy') {

                const pharmacy = await Pharmacy.findOne({
                    user: req.user.userId
                })

                if (pharmacy) {
                    pharmacy.email = email
                    await pharmacy.save()
                }
            }

        } 


        // =========================
        // NAME UPDATE
        // =========================

        if (name) {
            user.name = name
        }


        // =========================
        // PHONE UPDATE
        // =========================

        if (phone) {
            user.phone = phone
        }


        // Save user
        await user.save()


        // =========================
        // RESPONSE
        // =========================

        res.status(200).json({

            success: true,

            message: 'profile updated successfully',

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }

        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Failed to update profile',
            error: error.message
        })

    }
}

export const forgotPassword=async(req,res)=>{
    try{
        const {email}=req.body

        if(!email){
            return res.status(400).json({
                success:false,
                message:"Email is required"
            })
        }

        const user=await User.findOne({email})
        if(!user){
        return res.status(200).json({
        success: true,
        message: "If the email exists, a password reset link has been sent.",
      });

        }

        const resetToken=crypto.randomBytes(32).toString('hex')

        const hashedToken=crypto.createHash('sha256').update(resetToken).digest('hex')

        user.resetPasswordToken=hashedToken;
        user.resetPasswordExpire=Date.now()+15*60*1000;

        await user.save()

        const resetUrl=`http://localhost:5173/reset-password/${resetToken}`;


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,

    tls: {
        rejectUnauthorized: false
    },

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });

    await transporter.sendMail({
      from: `"PharmaCare" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "PharmaCare - Password Reset",
      html: `
        <div style="font-family: Arial; max-width: 500px; margin: auto;">
          
          <h2 style="color: #10a878;">
            PharmaCare
          </h2>

          <h3>Reset your password</h3>

          <p>
            We received a request to reset your PharmaCare password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <a
            href="${resetUrl}"
            style="
              display:inline-block;
              padding:12px 22px;
              background:#10a878;
              color:white;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Reset Password
          </a>

          <p style="margin-top:20px;color:#777;">
            This link will expire in 15 minutes.
          </p>

        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email.",
    });
    }catch(error){
         console.error("Forgot password error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send password reset email",
    });
    }
}


export const resetPassword = async (req, res) => {
    try {

        const { token } = req.params
        const { password } = req.body

        // Validate password
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }

        // Hash the token received from URL
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")

        // Find user with valid token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset link is invalid or expired"
            })
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Update password
        user.password = hashedPassword

        // Remove reset token
        user.resetPasswordToken = null
        user.resetPasswordExpire = null

        await user.save()

        res.status(200).json({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {

        console.error("Reset password error:", error)

        res.status(500).json({
            success: false,
            message: "Failed to reset password",
            error: error.message
        })
    }
}