
import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {

    console.log('File name:', file.originalname)
    console.log('MIME type:', file.mimetype)

    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/pdf',
        'application/octet-stream'
    ]

    const isPdf = file.originalname
        .toLowerCase()
        .endsWith('.pdf')

    const isImage = [
        'image/jpeg',
        'image/png',
        'image/jpg'
    ].includes(file.mimetype)

    if (isPdf || isImage) {
        console.log('FILE ACCEPTED')
        cb(null, true)
    } else {
        console.log('REJECTED FILE')
        cb(new Error('Only JPG, PNG and PDF files are allowed'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export default upload