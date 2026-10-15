// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//     Home,
//     Briefcase,
//     MapPin,
//     Pencil,
//     Trash2,
//     Plus,
//     X,
//     Check,
//     Navigation
// } from "lucide-react";

// import api from "../../../services/api";
// import {
//     getAddresses,
//     addAddress,
//     updateAddress,
//     deleteAddress,
//     setDefaultAddress as setDefaultAddressThunk,
// } from "../../../redux/slices/addressSlice";
// const AddressSection = () => {

//    const dispatch = useDispatch();

// const {
//     addresses,
//     loading,
// } = useSelector((state) => state.address);

// const [saving, setSaving] = useState(false);
//     const [saving, setSaving] = useState(false);

//     const [showForm, setShowForm] = useState(false);
//     const [editingId, setEditingId] = useState(null);

//     const [formData, setFormData] = useState({
//         fullName: "",
//         phone: "",
//         street: "",
//         city: "",
//         state: "",
//         pincode: "",
//         landmark: "",
//         addressType: "home",
//         location: {
//             latitude: null,
//             longitude: null
//         },
//         isDefault: false
//     });

//     // =========================
//     // FETCH ADDRESSES
//     // =========================

//     const fetchAddresses = async () => {
//         try {
//             setLoading(true);

//             const response = await api.get("/addresses/my");

//             setAddresses(response.data.addresses || []);

//         } catch (error) {
//             console.error(
//                 "Failed to fetch addresses:",
//                 error.response?.data || error.message
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         let active = true;
//         api.get("/addresses/my")
//             .then((response) => {
//                 if (active) setAddresses(response.data.addresses || []);
//             })
//             .catch((error) => {
//                 console.error("Failed to fetch addresses:", error.response?.data || error.message);
//             })
//             .finally(() => {
//                 if (active) setLoading(false);
//             });
//         return () => { active = false; };
//     }, []);

//     // =========================
//     // INPUT CHANGE
//     // =========================

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // =========================
//     // CURRENT LOCATION
//     // =========================

//     const getCurrentLocation = () => {

//         if (!navigator.geolocation) {
//             alert("Geolocation is not supported by your browser.");
//             return;
//         }

//         navigator.geolocation.getCurrentPosition(
//             (position) => {

//                 const { latitude, longitude } = position.coords;

//                 setFormData((prev) => ({
//                     ...prev,
//                     location: {
//                         latitude,
//                         longitude
//                     }
//                 }));

//                 alert("Current location selected successfully.");

//             },
//             (error) => {
//                 console.error("Location error:", error);

//                 alert(
//                     "Unable to get your location. Please allow location permission."
//                 );
//             }
//         );
//     };

//     // =========================
//     // RESET FORM
//     // =========================

//     const resetForm = () => {

//         setFormData({
//             fullName: "",
//             phone: "",
//             street: "",
//             city: "",
//             state: "",
//             pincode: "",
//             landmark: "",
//             addressType: "home",
//             location: {
//                 latitude: null,
//                 longitude: null
//             },
//             isDefault: false
//         });

//         setEditingId(null);
//         setShowForm(false);
//     };

//     // =========================
//     // EDIT ADDRESS
//     // =========================

//     const handleEdit = (address) => {

//         setFormData({
//             fullName: address.fullName || "",
//             phone: address.phone || "",
//             street: address.street || "",
//             city: address.city || "",
//             state: address.state || "",
//             pincode: address.pincode || "",
//             landmark: address.landmark || "",
//             addressType: address.addressType || "home",

//             location: {
//                 latitude: address.location?.latitude ?? null,
//                 longitude: address.location?.longitude ?? null
//             },

//             isDefault: address.isDefault || false
//         });

//         setEditingId(address._id);
//         setShowForm(true);
//     };

//     // =========================
//     // SAVE ADDRESS
//     // =========================

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         // Location validation
//         if (
//             formData.location.latitude === null ||
//             formData.location.longitude === null
//         ) {
//             alert("Please select your current location.");
//             return;
//         }

//         try {

//             setSaving(true);

//             let response;

//             if (editingId) {

//                 response = await api.patch(
//                     `/address/${editingId}`,
//                     formData
//                 );

//             } else {

//                 response = await api.post(
//                     "/address",
//                     formData
//                 );
//             }

//             console.log(
//                 "Address saved:",
//                 response.data
//             );

//             await fetchAddresses();

//             resetForm();

//         } catch (error) {

//             console.error(
//                 "Address save error:",
//                 error.response?.data || error.message
//             );

//             alert(
//                 error.response?.data?.message ||
//                 "Failed to save address"
//             );

//         } finally {

//             setSaving(false);
//         }
//     };

//     // =========================
//     // DELETE ADDRESS
//     // =========================

//     const handleDelete = async (id) => {

//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this address?"
//         );

//         if (!confirmDelete) return;

//         try {

//             await api.delete(`/address/${id}`);

//             await fetchAddresses();

//         } catch (error) {

//             console.error(
//                 "Delete address error:",
//                 error.response?.data || error.message
//             );

//             alert(
//                 error.response?.data?.message ||
//                 "Failed to delete address"
//             );
//         }
//     };

//     // =========================
//     // SET DEFAULT
//     // =========================

//     const handleSetDefault = async (id) => {

//         try {

//             await api.patch(
//                 `/address/${id}/default`
//             );

//             await fetchAddresses();

//         } catch (error) {

//             console.error(
//                 "Set default error:",
//                 error.response?.data || error.message
//             );

//             alert(
//                 error.response?.data?.message ||
//                 "Failed to set default address"
//             );
//         }
//     };

//     // =========================
//     // LOADING
//     // =========================

//     if (loading) {
//         return (
//             <div className="p-6 text-center text-gray-500">
//                 Loading addresses...
//             </div>
//         );
//     }

//     return (
//         <div className="p-4 sm:p-6">

//             {/* HEADER */}

//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

//                 <div>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                         My Addresses
//                     </h2>

//                     <p className="text-sm text-gray-500 mt-1">
//                         Manage your delivery addresses
//                     </p>
//                 </div>

//                 <button
//                     type="button"
//                     onClick={() => {
//                         resetForm();
//                         setShowForm(true);
//                     }}
//                     className="
//                         flex items-center justify-center gap-2
//                         bg-[#0F9D74]
//                         hover:bg-[#0c8763]
//                         text-white
//                         px-4 py-2.5
//                         rounded-lg
//                         text-sm
//                         font-medium
//                         transition
//                     "
//                 >
//                     <Plus size={17} />
//                     Add Address
//                 </button>

//             </div>

//             {/* =========================
//                 ADDRESS FORM
//             ========================= */}

//             {showForm && (

//                 <div className="mb-6 border rounded-xl p-4 sm:p-6 bg-gray-50">

//                     <div className="flex items-center justify-between mb-5">

//                         <h3 className="font-semibold text-gray-900">
//                             {editingId
//                                 ? "Edit Address"
//                                 : "Add New Address"}
//                         </h3>

//                         <button
//                             type="button"
//                             onClick={resetForm}
//                             className="text-gray-500 hover:text-gray-800"
//                         >
//                             <X size={20} />
//                         </button>

//                     </div>

//                     <form onSubmit={handleSubmit}>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                             {/* FULL NAME */}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Full Name
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="fullName"
//                                     value={formData.fullName}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
//                                     placeholder="Enter full name"
//                                 />
//                             </div>

//                             {/* PHONE */}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Phone
//                                 </label>

//                                 <input
//                                     type="tel"
//                                     name="phone"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
//                                     placeholder="Enter phone number"
//                                 />
//                             </div>

//                             {/* STREET */}

//                             <div className="md:col-span-2">

//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Street / House Address
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="street"
//                                     value={formData.street}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
//                                     placeholder="House name, street"
//                                 />

//                             </div>

//                             {/* CITY */}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     City
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="city"
//                                     value={formData.city}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
//                                     placeholder="City"
//                                 />
//                             </div>

//                             {/* STATE */}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     State
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="state"
//                                     value={formData.state}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
//                                     placeholder="State"
//                                 />
//                             </div>

//                             {/* PINCODE */}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Pincode
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="pincode"
//                                     value={formData.pincode}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
//                                     placeholder="Pincode"
//                                 />
//                             </div>

//                             {/* LANDMARK */}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Landmark
//                                 </label>

//                                 <input
//                                     type="text"
//                                     name="landmark"
//                                     value={formData.landmark}
//                                     onChange={handleChange}
//                                     className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
//                                     placeholder="Nearby landmark"
//                                 />
//                             </div>

//                             {/* ADDRESS TYPE */}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Address Type
//                                 </label>

//                                 <select
//                                     name="addressType"
//                                     value={formData.addressType}
//                                     onChange={handleChange}
//                                     className="w-full border rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200 bg-white"
//                                 >
//                                     <option value="home">
//                                         Home
//                                     </option>

//                                     <option value="work">
//                                         Work
//                                     </option>

//                                     <option value="other">
//                                         Other
//                                     </option>
//                                 </select>
//                             </div>

//                         </div>

//                         {/* LOCATION */}

//                         <div className="mt-5 p-4 bg-white border rounded-lg">

//                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

//                                 <div>

//                                     <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
//                                         <MapPin
//                                             size={17}
//                                             className="text-[#0F9D74]"
//                                         />
//                                         Delivery Location
//                                     </p>

//                                {formData.location.latitude !== null ? (

//     <p className="text-xs text-gray-500 mt-1">
//         {formData.city
//             ? `${formData.city}, ${formData.state}`
//             : "Current location selected"}
//     </p>

// ) : (

//     <p className="text-xs text-red-500 mt-1">
//         Location not selected
//     </p>

// )}

//                                 </div>

//                                 <button
//                                     type="button"
//                                     onClick={getCurrentLocation}
//                                     className="
//                                         flex items-center justify-center gap-2
//                                         border border-[#0F9D74]
//                                         text-[#0F9D74]
//                                         px-3 py-2
//                                         rounded-lg
//                                         text-sm
//                                         hover:bg-emerald-50
//                                     "
//                                 >
//                                     <Navigation size={15} />
//                                     Use Current Location
//                                 </button>

//                             </div>

//                         </div>

//                         {/* DEFAULT */}

//                         <div className="mt-4 flex items-center gap-2">

//                             <input
//                                 type="checkbox"
//                                 id="isDefault"
//                                 checked={formData.isDefault}
//                                 onChange={(e) =>
//                                     setFormData((prev) => ({
//                                         ...prev,
//                                         isDefault: e.target.checked
//                                     }))
//                                 }
//                                 className="accent-emerald-600"
//                             />

//                             <label
//                                 htmlFor="isDefault"
//                                 className="text-sm text-gray-600"
//                             >
//                                 Set as default address
//                             </label>

//                         </div>

//                         {/* BUTTONS */}

//                         <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

//                             <button
//                                 type="button"
//                                 onClick={resetForm}
//                                 className="px-4 py-2.5 border rounded-lg text-sm text-gray-600 hover:bg-gray-100"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 type="submit"
//                                 disabled={saving}
//                                 className="
//                                     px-5 py-2.5
//                                     bg-[#0F9D74]
//                                     hover:bg-[#0c8763]
//                                     disabled:opacity-50
//                                     text-white
//                                     rounded-lg
//                                     text-sm
//                                     font-medium
//                                 "
//                             >
//                                 {saving
//                                     ? "Saving..."
//                                     : editingId
//                                         ? "Update Address"
//                                         : "Save Address"}
//                             </button>

//                         </div>

//                     </form>

//                 </div>
//             )}

//             {/* =========================
//                 ADDRESS LIST
//             ========================= */}

//             {addresses.length === 0 ? (

//                 <div className="border border-dashed rounded-xl p-10 text-center">

//                     <MapPin
//                         size={35}
//                         className="mx-auto text-gray-400 mb-3"
//                     />

//                     <h3 className="font-medium text-gray-800">
//                         No addresses added
//                     </h3>

//                     <p className="text-sm text-gray-500 mt-1">
//                         Add an address for faster checkout.
//                     </p>

//                 </div>

//             ) : (

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//                     {addresses.map((address) => (

//                         <div
//                             key={address._id}
//                             className="
//                                 border
//                                 rounded-xl
//                                 p-4
//                                 sm:p-5
//                                 bg-white
//                                 hover:shadow-sm
//                                 transition
//                             "
//                         >

//                             {/* CARD HEADER */}

//                             <div className="flex items-start justify-between gap-3">

//                                 <div className="flex items-center gap-3">

//                                     <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">

//                                         {address.addressType === "work" ? (

//                                             <Briefcase
//                                                 size={18}
//                                                 className="text-[#0F9D74]"
//                                             />

//                                         ) : (

//                                             <Home
//                                                 size={18}
//                                                 className="text-[#0F9D74]"
//                                             />

//                                         )}

//                                     </div>

//                                     <div>

//                                         <div className="flex items-center gap-2">

//                                             <h3 className="font-semibold text-gray-900">
//                                                 {address.fullName}
//                                             </h3>

//                                             {address.isDefault && (

//                                                 <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
//                                                     Default
//                                                 </span>

//                                             )}

//                                         </div>

//                                         <p className="text-xs text-gray-500 capitalize">
//                                             {address.addressType}
//                                         </p>

//                                     </div>

//                                 </div>

//                                 {/* ACTIONS */}

//                                 <div className="flex items-center gap-1">

//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             handleEdit(address)
//                                         }
//                                         className="p-2 text-gray-500 hover:text-[#0F9D74] hover:bg-emerald-50 rounded-lg"
//                                     >
//                                         <Pencil size={16} />
//                                     </button>

//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             handleDelete(address._id)
//                                         }
//                                         className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg"
//                                     >
//                                         <Trash2 size={16} />
//                                     </button>

//                                 </div>

//                             </div>

//                             {/* ADDRESS */}

//                             <div className="mt-4 text-sm text-gray-600 space-y-1">

//                                 <p>
//                                     {address.street}
//                                 </p>

//                                 <p>
//                                     {address.city},{" "}
//                                     {address.state} -{" "}
//                                     {address.pincode}
//                                 </p>

//                                 {address.landmark && (

//                                     <p>
//                                         Landmark:{" "}
//                                         {address.landmark}
//                                     </p>

//                                 )}

//                                 <p>
//                                     Phone: {address.phone}
//                                 </p>

//                             </div>

//                             {/* LOCATION */}

//                             {address.location && (

//                                 <p className="text-xs text-gray-400 mt-3">
//                                     <MapPin
//                                         size={12}
//                                         className="inline mr-1"
//                                     />

//                                     Location saved
//                                 </p>

//                             )}

//                             {/* DEFAULT BUTTON */}

//                             {!address.isDefault && (

//                                 <button
//                                     type="button"
//                                     onClick={() =>
//                                         handleSetDefault(
//                                             address._id
//                                         )
//                                     }
//                                     className="
//                                         mt-4
//                                         flex
//                                         items-center
//                                         gap-1.5
//                                         text-xs
//                                         text-[#0F9D74]
//                                         hover:underline
//                                     "
//                                 >
//                                     <Check size={14} />
//                                     Set as default
//                                 </button>

//                             )}

//                         </div>

//                     ))}

//                 </div>

//             )}

//         </div>
//     );
// };

// export default AddressSection;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Home,
  Briefcase,
  MapPin,
  Pencil,
  Trash2,
  Plus,
  X,
  Check,
  Navigation,
} from "lucide-react";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress as setDefaultAddressThunk,
} from "../../../redux/slices/addressSlice";

const createInitialForm = () => ({
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
  addressType: "home",
  location: {
    latitude: null,
    longitude: null,
  },
  isDefault: false,
});

const AddressSection = () => {
  const dispatch = useDispatch();

  const {
    addresses = [],
    loading,
    error,
  } = useSelector((state) => state.address);

  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(createInitialForm);

  // FETCH ADDRESSES
  useEffect(() => {
    dispatch(getAddresses());
  }, [dispatch]);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CURRENT LOCATION
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setFormData((prev) => ({
          ...prev,
          location: {
            latitude,
            longitude,
          },
        }));

        alert("Current location selected successfully.");
      },
      (locationError) => {
        console.error("Location error:", locationError);

        alert(
          "Unable to get your location. Please allow location permission."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // RESET FORM
  const resetForm = () => {
    setFormData(createInitialForm());
    setEditingId(null);
    setShowForm(false);
  };

  // EDIT ADDRESS
  const handleEdit = (address) => {
    setFormData({
      fullName: address.fullName || "",
      phone: address.phone || "",
      street: address.street || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      landmark: address.landmark || "",
      addressType: address.addressType || "home",
      location: {
        latitude: address.location?.latitude ?? null,
        longitude: address.location?.longitude ?? null,
      },
      isDefault: Boolean(address.isDefault),
    });

    setEditingId(address._id);
    setShowForm(true);
  };

  // SAVE / UPDATE ADDRESS
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.location.latitude === null ||
      formData.location.longitude === null
    ) {
      alert("Please select your current location.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await dispatch(
          updateAddress({
            addressId: editingId,
            addressData: formData,
          })
        ).unwrap();
      } else {
        await dispatch(addAddress(formData)).unwrap();
      }

      await dispatch(getAddresses()).unwrap();

      resetForm();
      alert(
        editingId
          ? "Address updated successfully."
          : "Address saved successfully."
      );
    } catch (err) {
      console.error("Address save error:", err);

      alert(
        typeof err === "string"
          ? err
          : "Failed to save address. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE ADDRESS
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);

      await dispatch(deleteAddress(id)).unwrap();
    } catch (err) {
      console.error("Delete address error:", err);

      alert(
        typeof err === "string"
          ? err
          : "Failed to delete address."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // SET DEFAULT ADDRESS
  const handleSetDefault = async (id) => {
    try {
      setActionLoading(id);

      await dispatch(setDefaultAddressThunk(id)).unwrap();
      await dispatch(getAddresses()).unwrap();
    } catch (err) {
      console.error("Set default address error:", err);

      alert(
        typeof err === "string"
          ? err
          : "Failed to set default address."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // LOADING
  if (loading && addresses.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading addresses...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            My Addresses
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your delivery addresses
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#0F9D74] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0c8763]"
        >
          <Plus size={17} />
          Add Address
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ADDRESS FORM */}
      {showForm && (
        <div className="mb-6 rounded-xl border bg-gray-50 p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              {editingId ? "Edit Address" : "Add New Address"}
            </h3>

            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close address form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* FULL NAME */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Enter full name"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Enter phone number"
                />
              </div>

              {/* STREET */}
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Street / House Address
                </label>

                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="House name, street"
                />
              </div>

              {/* CITY */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="City"
                />
              </div>

              {/* STATE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="State"
                />
              </div>

              {/* PINCODE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{6}"
                  title="Enter a valid 6-digit pincode"
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="6-digit pincode"
                />
              </div>

              {/* LANDMARK */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Landmark
                </label>

                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Nearby landmark"
                />
              </div>

              {/* ADDRESS TYPE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Address Type
                </label>

                <select
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleChange}
                  className="w-full rounded-lg border bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="mt-5 rounded-lg border bg-white p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-gray-800">
                    <MapPin size={17} className="text-[#0F9D74]" />
                    Delivery Location
                  </p>

                  {formData.location.latitude !== null &&
                  formData.location.longitude !== null ? (
                    <p className="mt-1 text-xs text-gray-500">
                      {formData.location.latitude.toFixed(5)},{" "}
                      {formData.location.longitude.toFixed(5)}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-red-500">
                      Location not selected
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#0F9D74] px-3 py-2 text-sm text-[#0F9D74] hover:bg-emerald-50"
                >
                  <Navigation size={15} />
                  Use Current Location
                </button>
              </div>
            </div>

            {/* DEFAULT */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isDefault: e.target.checked,
                  }))
                }
                className="accent-emerald-600"
              />

              <label
                htmlFor="isDefault"
                className="text-sm text-gray-600"
              >
                Set as default address
              </label>
            </div>

            {/* FORM BUTTONS */}
            <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#0F9D74] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0c8763] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Address"
                    : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADDRESS LIST */}
      {addresses.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <MapPin
            size={35}
            className="mx-auto mb-3 text-gray-400"
          />

          <h3 className="font-medium text-gray-800">
            No addresses added
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add an address for faster checkout.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="rounded-xl border bg-white p-4 transition hover:shadow-sm sm:p-5"
            >
              {/* CARD HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                    {address.addressType === "work" ? (
                      <Briefcase
                        size={18}
                        className="text-[#0F9D74]"
                      />
                    ) : (
                      <Home
                        size={18}
                        className="text-[#0F9D74]"
                      />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {address.fullName}
                      </h3>

                      {address.isDefault && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
                          Default
                        </span>
                      )}
                    </div>

                    <p className="text-xs capitalize text-gray-500">
                      {address.addressType}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    disabled={actionLoading === address._id}
                    aria-label="Edit address"
                    className="rounded-lg p-2 text-gray-500 hover:bg-emerald-50 hover:text-[#0F9D74]"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(address._id)}
                    disabled={actionLoading === address._id}
                    aria-label="Delete address"
                    className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* ADDRESS DETAILS */}
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p>{address.street}</p>

                <p>
                  {address.city}, {address.state} -{" "}
                  {address.pincode}
                </p>

                {address.landmark && (
                  <p>Landmark: {address.landmark}</p>
                )}

                <p>Phone: {address.phone}</p>
              </div>

              {/* LOCATION */}
              {address.location?.latitude != null &&
                address.location?.longitude != null && (
                  <p className="mt-3 text-xs text-gray-400">
                    <MapPin
                      size={12}
                      className="mr-1 inline"
                    />
                    Location saved
                  </p>
                )}

              {/* SET DEFAULT */}
              {!address.isDefault && (
                <button
                  type="button"
                  onClick={() => handleSetDefault(address._id)}
                  disabled={actionLoading === address._id}
                  className="mt-4 flex items-center gap-1.5 text-xs text-[#0F9D74] hover:underline disabled:opacity-50"
                >
                  <Check size={14} />
                  {actionLoading === address._id
                    ? "Please wait..."
                    : "Set as default"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressSection;

