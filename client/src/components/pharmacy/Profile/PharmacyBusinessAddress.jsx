
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  MapPinned,
  Navigation,
  Pencil,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";
import { updatePharmacyProfile } from "../../../redux/slices/ProfileSlice";

const PharmacyBusinessAddress = () => {
  const dispatch = useDispatch();

  const { user, pharmacy, updating, error } = useSelector(
    (state) => state.profile
  );

  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (pharmacy) {
      setFormData({
        street: pharmacy.address?.street || "",
        city: pharmacy.address?.city || "",
        state: pharmacy.address?.state || "",
        pincode: pharmacy.address?.pincode || "",
      });
    }
  }, [pharmacy]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setSuccess("");
  };

  const handleCancel = () => {
    setFormData({
      street: pharmacy?.address?.street || "",
      city: pharmacy?.address?.city || "",
      state: pharmacy?.address?.state || "",
      pincode: pharmacy?.address?.pincode || "",
    });
    setIsEditing(false);
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    const data = new FormData();

    data.append("address", JSON.stringify(formData));

    // Existing profile fields are not changed by this form.
    data.append("name", user?.name || "");
    data.append("email", user?.email || "");
    data.append("phone", user?.phone || "");
    data.append("pharmacyName", pharmacy?.pharmacyName || "");
    data.append("ownerName", pharmacy?.ownerName || "");
    data.append("pharmacyType", pharmacy?.pharmacyType || "");

    try {
      await dispatch(updatePharmacyProfile(data)).unwrap();
      setIsEditing(false);
      setSuccess("Business address updated successfully.");
    } catch (err) {
      console.error("Address update failed:", err);
    }
  };

  if (!pharmacy) {
    return (
      <div className="rounded-xl border bg-white p-6 text-gray-500">
        Pharmacy information not found.
      </div>
    );
  }

  const latitude = pharmacy.location?.latitude;
  const longitude = pharmacy.location?.longitude;

  const hasCoordinates =
    Number.isFinite(Number(latitude)) &&
    Number.isFinite(Number(longitude)) &&
    latitude !== undefined &&
    longitude !== undefined;

  const mapsUrl = hasCoordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        [
          pharmacy.address?.street,
          pharmacy.address?.city,
          pharmacy.address?.state,
          pharmacy.address?.pincode,
        ]
          .filter(Boolean)
          .join(", ")
      )}`;

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <div className="space-y-6">
      {/* Address details */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-50 p-3">
              <MapPin className="text-emerald-600" size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Business Address
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your pharmacy's registered address.
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-lg border border-emerald-600 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              <Pencil size={16} />
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Street / Building Name
              </label>
              <input
                name="street"
                value={formData.street}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter street or building name"
                maxLength={200}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter city"
                  maxLength={100}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter state"
                  maxLength={100}
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  PIN Code
                </label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="6-digit PIN code"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex flex-wrap justify-end gap-3 border-t pt-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={updating}
                className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {updating ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <Save size={17} />
                )}
                {updating ? "Saving..." : "Save Address"}
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Street / Building", pharmacy.address?.street],
                ["City", pharmacy.address?.city],
                ["State", pharmacy.address?.state],
                ["PIN Code", pharmacy.address?.pincode],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="mt-1 break-words font-medium text-gray-800">
                    {value || "Not provided"}
                  </p>
                </div>
              ))}
            </div>

            {success && (
              <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                {success}
              </p>
            )}
          </>
        )}
      </section>

      {/* Map and directions */}
      {/* <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div className="rounded-lg bg-blue-50 p-3">
            <MapPinned className="text-blue-600" size={22} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Map Location
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View your pharmacy location and open directions.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <MapPin size={30} className="mx-auto text-emerald-600" />

          {hasCoordinates ? (
            <>
              <p className="mt-3 font-medium text-gray-800">
                Location coordinates available
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Latitude: {latitude}
              </p>
              <p className="text-sm text-gray-500">
                Longitude: {longitude}
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 font-medium text-gray-800">
                Exact map coordinates not added yet
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Directions will search using your business address.
              </p>
            </>
          )}

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <Navigation size={17} />
            Open Google Maps
          </a>
        </div>
      </section> */}
    </div>
  );
};

export default PharmacyBusinessAddress;
