import React from 'react'
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNearByPharmacies } from '../../../redux/slices/pharmacySlice';
import { setSelectedPharmacy } from '../../../redux/slices/checkoutSlice';
function SelectPharmacy() {
    const dispatch=useDispatch()
    const {Pharmacies,loading,error}=useSelector((state)=>state.pharmacy)
    
     const selectedPharmacy = useSelector(
    (state) => state.checkout.selectedPharmacy
  );
     useEffect(() => {
    dispatch(getNearByPharmacies());
  }, [dispatch]);
console.log(Pharmacies);

 const handleSelectPharmacy = (pharmacyId) => {
    dispatch(setSelectedPharmacy(pharmacyId));
  };
  return (
     <section className="rounded-xl border border-gray-200 bg-white p-4">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-800">
          <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0F9D74] text-xs text-white">
            2
          </span>

          Select Pharmacy
        </h2>

        <p className="ml-7 mt-1 text-[10px] text-gray-500">
          Choose a pharmacy for your order
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="py-6 text-center text-xs text-gray-500">
          Loading pharmacies...
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="rounded-lg bg-red-50 p-3 text-xs text-red-500">
          {error}
        </div>
      )}

      {/* NO PHARMACY */}
      {!loading &&
        !error &&
        Pharmacies?.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
            <p className="text-xs text-gray-500">
              No pharmacies available
            </p>
          </div>
        )}

      {/* PHARMACY LIST */}
      {!loading &&
        !error &&
        Pharmacies?.length > 0 && (
          <div className="space-y-3">

            {Pharmacies.map((pharmacy) => {

              const isSelected =
                selectedPharmacy === pharmacy._id;

              return (
                <div
                  key={pharmacy._id}
                  onClick={() =>
                    handleSelectPharmacy(pharmacy._id)
                  }
                  className={`cursor-pointer rounded-lg border p-3 transition ${
                    isSelected
                      ? "border-[#0F9D74] bg-[#F0FBF7]"
                      : "border-gray-200 bg-white hover:border-[#BCE9D9]"
                  }`}
                >

                  <div className="flex items-start gap-3">

                    {/* RADIO */}
                    <div
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-[#0F9D74]"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-[#0F9D74]" />
                      )}
                    </div>

                    {/* PHARMACY DETAILS */}
                    <div className="flex-1">

                      <div className="flex items-center justify-between">

                        <h3 className="text-xs font-semibold text-gray-800">
                          {pharmacy.pharmacyName}
                        </h3>

                        {isSelected && (
                          <span className="rounded-full bg-[#DFF6EE] px-2 py-0.5 text-[9px] font-medium text-[#0F9D74]">
                            Selected
                          </span>
                        )}

                      </div>

                      <p className="mt-1 text-[10px] text-gray-500">
                        {pharmacy.ownerName}
                      </p>

                      <div className="mt-2 flex items-center gap-3">

                        <span className="text-[10px] text-gray-500">
                          📍 Nearby pharmacy
                        </span>

                        <span className="text-[10px] text-green-600">
                          ✓ Available
                        </span>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

    </section>
  )
}

export default SelectPharmacy
