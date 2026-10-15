
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Store, UserRound, Mail, Phone, MapPin, Building2, ImagePlus } from "lucide-react";
import { updatePharmacyProfile,resetUpdateStatus } from "../../../redux/slices/ProfileSlice";

const EditPharmacyProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { user, pharmacy, updating, error } = useSelector(
    (state) => state.profile
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pharmacyName: "",
    ownerName: "",
    pharmacyType: "",
    address: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Load existing profile data into the form
  useEffect(() => {
    if (isOpen && user && pharmacy) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        pharmacyName: pharmacy.pharmacyName || "",
        ownerName: pharmacy.ownerName || "",
        pharmacyType: pharmacy.pharmacyType || "",
        address:
  typeof pharmacy.address === "string"
    ? pharmacy.address
    : [
        pharmacy.address?.street,
        pharmacy.address?.city,
        pharmacy.address?.district,
        pharmacy.address?.state,
        pharmacy.address?.pincode,
      ]
        .filter(Boolean)
        .join(", "),
      });

      setImage(null);
      setImagePreview(pharmacy.image || "");
      dispatch(resetUpdateStatus());
    }
  }, [isOpen, user, pharmacy, dispatch]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.trim());
    });

    if (image) {
      data.append("image", image);
    }

    try {
      await dispatch(updatePharmacyProfile(data)).unwrap();
      onClose();
    } catch (err) {
      console.error("Pharmacy profile update failed:", err);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  const fields = [
    {
      label: "Pharmacy Name",
      name: "pharmacyName",
      icon: Store,
      required: true,
    },
    {
      label: "Owner Name",
      name: "ownerName",
      icon: UserRound,
      required: true,
    },
    {
      label: "Contact Name",
      name: "name",
      icon: UserRound,
      required: true,
    },
    {
      label: "Email Address",
      name: "email",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      label: "Phone Number",
      name: "phone",
      icon: Phone,
      type: "tel",
      required: true,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !updating) onClose();
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Pharmacy Profile
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your pharmacy details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updating}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-5"
        >
          {/* Pharmacy Image */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Pharmacy Image
            </label>

            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-emerald-50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Pharmacy preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImagePlus size={28} className="text-emerald-600" />
                )}
              </div>

              <label className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              <span className="text-xs text-gray-500">
                Maximum size: 5 MB
              </span>
            </div>
          </div>

          {/* Text Fields */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {fields.map(({ label, name, icon: Icon, type, required }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>

                <div className="relative">
                  <Icon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id={name}
                    name={name}
                    type={type || "text"}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    maxLength={name === "phone" ? 15 : 100}
                    className={`${inputClass} pl-10`}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                </div>
              </div>
            ))}

            {/* Pharmacy Type */}
            <div>
              <label
                htmlFor="pharmacyType"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Pharmacy Type
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  id="pharmacyType"
                  name="pharmacyType"
                  value={formData.pharmacyType}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pl-10`}
                >
                  <option value="">Select pharmacy type</option>
                  <option value="hospital">Hospital Pharmacy</option>
                  <option value="local">Local Pharmacy</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Business Address
              </label>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  maxLength={500}
                  className={`${inputClass} resize-y pl-10`}
                  placeholder="Enter pharmacy address"
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Footer */}
          <div className="mt-7 flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={updating}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPharmacyProfileModal;
