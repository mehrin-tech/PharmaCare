
import React from "react";
import { useSelector } from "react-redux";
import {
  Store,
  UserRound,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

const PharmacyInfo = ({ onEdit }) => {
  const { user, pharmacy, loading, error } = useSelector(
    (state) => state.profile
  );

  if (loading) {
    return <p className="p-5 text-gray-500">Loading pharmacy information...</p>;
  }

  if (error) {
    return <p className="p-5 text-red-500">{error}</p>;
  }

  if (!user || !pharmacy) {
    return (
      <p className="p-5 text-gray-500">
        Pharmacy information not found.
      </p>
    );
  }

  const fields = [
    {
      label: "Pharmacy Name",
      value: pharmacy.pharmacyName,
      icon: Store,
    },
    {
      label: "Owner Name",
      value: pharmacy.ownerName || user.name,
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: pharmacy.email || user.email,
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: pharmacy.phone || user.phone,
      icon: Phone,
    },
    {
      label: "Pharmacy Type",
      value: pharmacy.pharmacyType,
      icon: Building2,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Pharmacy Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your pharmacy's basic details
          </p>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-50 p-3">
              <Icon size={20} className="text-emerald-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="mt-1 font-medium text-gray-800">
                {value || "Not provided"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyInfo;
