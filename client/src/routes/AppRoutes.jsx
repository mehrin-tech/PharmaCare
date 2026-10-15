import { Routes,Route } from "react-router-dom";
import { CustomerRegister } from "../pages/auth/CustomerRegister";
import {Login} from '../pages/auth/Login'
import  {ForgotPassword}  from "../pages/auth/ForgotPassword";
import {ResetPassword} from "../pages/auth/ResetPassword";
import CustomerDashboard from "../pages/Customer/CustomerDashboard"
import Medicines from '../pages/Customer/Medicines'
 import MedicineDetails from "../pages/Customer/MedicineDetails";
import CustomerProfile from "../pages/Customer/CustomerProfile"
import Pharmacies from '../pages/Customer/Pharmacies'
import PharmacyDetails from "../pages/Customer/PharmacyDetails";
import NotFound from "../pages/NotFound/NotFound";
import Cart from '../pages/Customer/Cart'
import Wishlist from "../pages/Customer/Wishlist";
import Checkout from "../pages/Customer/Checkout";
import AddAddress from "../components/customer/Checkout/AddAddress";
import MyOrders from "../pages/Customer/MyOrders";
import OrderDetails from "../pages/Customer/OrderDetails"
import Prescription from "../pages/Customer/Prescription";
import Medicine from '../pages/Pharmacy/Medicine'
import PharmacyLayout from '../layouts/PharmacyLayout'
import  PharmacyRegistration from '../pages/auth/PharmacyRegistration'
import Inventory from '../pages/Pharmacy/Inventory'
import PharmacyProfile from '../pages/Pharmacy/PharmacyProfile'
import PrescriptionManagement from "../pages/Pharmacy/PrescriptionManagement";
function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<h1>PharmaCare Home</h1>} />
            <Route path="/register" element={<CustomerRegister/>} />
            <Route path='/login' element={<Login/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password/:token" element={<ResetPassword />}/>
            <Route path="/home" element={<CustomerDashboard />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/medicines/:medicineId" element={<MedicineDetails />} />
            <Route path="/pharmacies" element={<Pharmacies/>}/>
            <Route  path="/pharmacies/:pharmacyId" element={<PharmacyDetails/>}/>
<Route
  path="/profile"
  element={<CustomerProfile />}
/>

<Route path="/cart" element={<Cart />} />
<Route path="/wishlist" element={<Wishlist/>}/>
<Route path="/checkout" element={<Checkout />} />

<Route
  path="/checkout/add-address"
  element={<AddAddress />}
/>
<Route path="/orders"  element={<MyOrders />}/>
<Route
  path="/orders/:orderId"
  element={<OrderDetails />}
/>

<Route
  path="/prescription"
  element={<Prescription />}
/>
<Route path='/pharmacy' element={<PharmacyRegistration/>}/>
<Route  path='/pharmacy' element={<PharmacyLayout /> }>

<Route  path='medicines' element={<Medicine />}/>
<Route path="inventory" element={<Inventory />} />
<Route path='profile' element={<PharmacyProfile/>} />
<Route path="prescriptions"  element={<PrescriptionManagement/>}/>
</Route>



<Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
