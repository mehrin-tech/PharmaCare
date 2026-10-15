import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,useParams } from "react-router-dom";
import { getAddresses,setDefaultAddress,updateAddress,deleteAddress } from '../../../redux/slices/addressSlice'


function DeliveryAddress() {
    const dispatch=useDispatch()
    const navigate = useNavigate();

    const { addresses,loading,error}=useSelector((state)=>state.address)
    useEffect(()=>{
        dispatch(getAddresses())
    },[dispatch])
    
      const handleSelectAddress = (addressId) => {
    dispatch(setDefaultAddress(addressId));
  };

  const handleDeleteAddress = async (addressId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this address?"
  );

  if (!confirmDelete) return;

  try {
    await dispatch(deleteAddress(addressId)).unwrap();
  } catch (error) {
    console.log("Delete address error:", error);
  }
};

return(
    <section className="rounded-xl border border-gray-200 bg-white p-4">

      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0F9D74] text-xs text-white">
            1
          </span>

          Delivery Address
        </h2>

        <button onClick={() => navigate("/checkout/add-address")} className="text-xs font-medium text-[#0F9D74]">
          + Add New Address
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="py-6 text-center text-xs text-gray-500">
          Loading addresses...
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="rounded-lg bg-red-50 p-3 text-xs text-red-500">
          {error}
        </div>
      )}

      {/* NO ADDRESS */}
      {!loading &&
        !error &&
        addresses.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
            <p className="text-xs text-gray-500">
              No saved address found
            </p>

            <button className="mt-3 rounded-md bg-[#0F9D74] px-4 py-2 text-xs text-white">
              Add New Address
            </button>
          </div>
        )}

      {/* ADDRESS LIST */}
      {!loading &&
        !error &&
        addresses.length > 0 && (
          <div className="space-y-3">

            {addresses.map((address) => (
              <div
                key={address._id}
                className={`rounded-lg border p-3 transition ${
                  address.isDefault
                    ? "border-[#BCE9D9] bg-[#F0FBF7]"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">

                  {/* LEFT */}
                  <div className="flex gap-3">

                    {/* RADIO */}
                    <button
                      type="button"
                      onClick={() =>
                        handleSelectAddress(address._id)
                      }
                      className={`mt-1 flex h-4 w-4 items-center justify-center rounded-full border ${
                        address.isDefault
                          ? "border-[#0F9D74]"
                          : "border-gray-300"
                      }`}
                    >
                      {address.isDefault && (
                        <span className="h-2 w-2 rounded-full bg-[#0F9D74]" />
                      )}
                    </button>

                    {/* ADDRESS */}
                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="text-xs font-semibold text-gray-800">
                          {address.addressType}
                        </h3>

                        {address.isDefault && (
                          <span className="rounded-full bg-[#DFF6EE] px-2 py-0.5 text-[9px] font-medium text-[#0F9D74]">
                            Default
                          </span>
                        )}

                      </div>

                      <p className="mt-1 text-xs font-semibold text-gray-700">
                        {address.fullName}
                      </p>

                      <p className="text-[10px] text-gray-500">
                        {address.street}
                      </p>

                      <p className="text-[10px] text-gray-500">
                        {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </p>

                      {address.landmark && (
                        <p className="text-[10px] text-gray-500">
                          Landmark: {address.landmark}
                        </p>
                      )}

                      <p className="mt-1 text-[10px] text-gray-500">
                        Ph: {address.phone}
                      </p>

                    </div>
                  </div>

                  {/* EDIT
                  <button onClick={()=>navigate(`/checkout/add-address/${address._id}`)}
                    type="button"
                    className="rounded-md border border-[#0F9D74] px-2.5 py-1 text-[10px] font-medium text-[#0F9D74] hover:bg-[#DFF6EE]"
                  >
                    Edit
                  </button> */}
                  {/* ACTIONS */}
<div className="flex items-center gap-2">

  {/* EDIT */}
  <button
    type="button"
    onClick={() =>
      navigate(`/checkout/add-address/${address._id}`)
    }
    className="rounded-md border border-[#0F9D74] px-2.5 py-1 text-[10px] font-medium text-[#0F9D74] hover:bg-[#DFF6EE]"
  >
    Edit
  </button>

  {/* DELETE */}
  <button
    type="button"
    onClick={() =>
      handleDeleteAddress(address._id)
    }
    className="rounded-md border border-red-300 px-2.5 py-1 text-[10px] font-medium text-red-500 hover:bg-red-50"
  >
    Delete
  </button>

</div>

                </div>
              </div>
            ))}

          </div>
        )}

    </section>
)
  
}

export default DeliveryAddress
