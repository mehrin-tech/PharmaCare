import nodemailer from 'nodemailer'

const transporter=nodemailer.createTransport({
     host: 'smtp.gmail.com',
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
})

export const sendEmail=async({
    to,
    subject,
    message
})=>{
    try{
        await transporter.sendMail({
            from:`"PharmaCare" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text:message
        })
         console.log('Email sent successfully')
    }catch(error){
            console.error('Email error:', error.message)

    }
}