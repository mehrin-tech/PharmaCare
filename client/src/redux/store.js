import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import locationReducer from "./slices/locationSlice";
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/wishlistSlice'
import addressReducer from "./slices/addressSlice";
import pharmacyReducer from "./slices/pharmacySlice";
import checkoutReducer from "./slices/checkoutSlice";
import paymentReducer from "./slices/paymentSlice";
import orderReducer from "./slices/orderSlice";
import prescriptionReducer from "./slices/prescriptionSlice";
import notificationReducer from "./slices/notificationSlice";
import medicineReducer from "./slices/medicineSlice";
import inventoryReducer from "./slices/inventorySlice";
import profileReducer from "./slices/ProfileSlice";
import salesReportReducer from "./slices/salesReportSlice";


export const store=configureStore({
    reducer:{
        auth:authReducer,
        location:locationReducer,
        cart:cartReducer,
        wishlist:wishlistReducer,
        address: addressReducer,
       pharmacy: pharmacyReducer,
        checkout: checkoutReducer,
        payment: paymentReducer,
        orders: orderReducer,
        prescription:prescriptionReducer,
        notifications:notificationReducer,
        medicines: medicineReducer,
        inventory: inventoryReducer,
        profile: profileReducer,
        salesReport: salesReportReducer,
    }
})