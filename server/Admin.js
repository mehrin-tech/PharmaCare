import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import User from './models/User.js'
import connectDB from './config/db.js'

dotenv.config()

const createAdmin=async()=>{
    try{
        await connectDB()
        const existingAdmin=await User.findOne({
            email:'admin@pharmacare.com'
        })
        if(existingAdmin){
            console.log('admin alredy exists')
            process.exit()
        }

        const hashedPassword=await bcrypt.hash('Admin@123',10)

        await User.create({
            name:'PharmaCare Admin',
            email:'admin@pharmacare.com',
            password:hashedPassword,
            role:'admin',
            isActive:true
        })

        console.log('admin created successfuly')
        console.log('email: admin@pharmacare.com')
        console.log('password:Admin@123')

    }catch(error){
        console.error('Admin creation failed',error)
        process.exit(1)

    }
}
createAdmin()
