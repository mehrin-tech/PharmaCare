import express from "express";

import {
    getMyProfile,
    updateCustomerProfile,
    updatePharmacyProfile,
    updateAdminProfile
} from "../controllers/profileController.js";

import {
    protect,
    
} from "../middleware/authMiddleware.js";
import {authorize} from '../middleware/roleMiddleware.js'

import upload from '../middleware/uploadMiddleware.js'
const router = express.Router();


// Get profile
router.get(
    "/",
    protect,
    getMyProfile
);


// Customer profile
router.patch(
    "/customer",
    protect,
    authorize("customer"),
    upload.single('profilePhoto'),
    updateCustomerProfile
);


// Pharmacy profile
router.patch(
    "/pharmacy",
    protect,
    authorize("pharmacy"),
    upload.single('image'),
    updatePharmacyProfile
);


// Admin profile
router.patch(
    "/admin",
    protect,
    authorize("admin"),
    updateAdminProfile
);


export default router;
