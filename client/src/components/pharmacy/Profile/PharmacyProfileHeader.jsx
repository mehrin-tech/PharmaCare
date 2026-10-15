import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Store, Camera,ShieldCheck } from "lucide-react";
import api from '../../../services/api'
const PharmacyProfileHeader = () => {

    const [profile,setProfile]=useState(null)
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState('')

    useEffect(()=>{
        let active=true;
        const fetchProfile=async()=>{
            try{
                const response=await api.get('/profile')
                if(active){
                    setProfile(response.data.profile)
                }
            }catch(error){
                if(active){
                    setError(error.response?.data?.message || 'failed to load pharmacy profile')
                }
            }finally{
                if(active) setLoading(false)
            }
        }
        fetchProfile()

        return ()=>{
            active=false
        }
    },[])

     if (loading) {
    return <div className="rounded-xl border bg-white p-6">Loading pharmacy profile...</div>;
  }

  if (error) {
    return <div className="rounded-xl border bg-white p-6 text-red-600">{error}</div>;
  }

  const user=profile?.user
  const pharmacy=profile?.pharmacy;

   if (!pharmacy) {
    return <div className="rounded-xl border bg-white p-6">Pharmacy profile not found.</div>;
  }

    const address = pharmacy.address;
  const addressText =
    address && typeof address === "object"
      ? [address.street, address.city, address.district, address.state, address.pincode]
          .filter(Boolean)
          .join(", ")
      : typeof address === "string"
        ? address
        : "";

  const verificationStatus =
    pharmacy.licenseVerification?.status || "Pending";

  const approvalStatus =
    pharmacy.approvalStatus || "Pending";


  return (
   <div className="flex flex-col justify-between gap-6 rounded-xl border bg-white p-4 sm:p-6 md:flex-row">
      {/* Pharmacy details */}
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="relative shrink-0">
          {pharmacy.image ? (
            <img
              src={pharmacy.image}
              alt={pharmacy.pharmacyName || "Pharmacy"}
              className="h-20 w-20 rounded-full border object-cover sm:h-24 sm:w-24"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border bg-emerald-50 sm:h-24 sm:w-24">
              <Store size={34} className="text-emerald-600" />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold text-gray-900 sm:text-2xl">
            {pharmacy.pharmacyName}
          </h2>

          <p className="mb-3 text-sm capitalize text-gray-500">
            {pharmacy.pharmacyType || "Pharmacy"}
          </p>

          <div className="space-y-1.5 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <Store size={15} className="shrink-0" />
              <span>{pharmacy.ownerName || user?.name || "Owner not added"}</span>
            </p>

            <p className="flex items-center gap-2">
              <Mail size={15} className="shrink-0" />
              <span className="truncate">
                {pharmacy.email || user?.email || "Email not added"}
              </span>
            </p>

            <p className="flex items-center gap-2">
              <Phone size={15} className="shrink-0" />
              <span>{pharmacy.phone || user?.phone || "Phone not added"}</span>
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={15} className="shrink-0" />
              <span>{addressText || "Add business address"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Verification status */}
      <div className="flex gap-3 sm:gap-4 md:self-center">
        <div className="flex-1 rounded-xl bg-emerald-50 px-5 py-4 text-center sm:px-7">
          <ShieldCheck size={20} className="mx-auto text-emerald-600" />
          <p className="mt-1 text-xs text-gray-500">License Verification</p>
          <p className="mt-1 font-semibold capitalize text-gray-800">
            {verificationStatus}
          </p>
        </div>

        <div className="flex-1 rounded-xl bg-emerald-50 px-5 py-4 text-center sm:px-7">
          <p className="text-xs text-gray-500">Admin Approval</p>
          <p className="mt-2 font-semibold capitalize text-gray-800">
            {approvalStatus}
          </p>
        </div>
      </div>
    </div>

  );
};

export default PharmacyProfileHeader;
