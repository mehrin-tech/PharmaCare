import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAddress } from "../../../redux/slices/addressSlice";

function AddAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    addressType: "Home",
    isDefault: false,
  });

  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // get current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setError("");
      },
      () => {
        setError("Unable to get your current location");
      }
    );
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!location.latitude || !location.longitude) {
      setError("Please get your location");
      return;
    }

    const addressData = {
      ...formData,

      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    };

    try {
      setLoading(true);

      await dispatch(addAddress(addressData)).unwrap();

      // after successful save
      navigate("/checkout");

    } catch (error) {
      setError(error || "Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-lg font-semibold text-gray-800">
              Add New Address
            </h1>

            <p className="mt-1 text-xs text-gray-500">
              Enter your delivery address details
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            Cancel
          </button>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-500">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* FULL NAME */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F9D74]"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F9D74]"
            />
          </div>

          {/* STREET */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Street / House Address
            </label>

            <textarea
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              rows="3"
              placeholder="House name, street, locality"
              className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F9D74]"
            />
          </div>

          {/* CITY + STATE */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F9D74]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="State"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F9D74]"
              />
            </div>

          </div>

          {/* PINCODE + LANDMARK */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                placeholder="Pincode"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F9D74]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700">
                Landmark
              </label>

              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0F9D74]"
              />
            </div>

          </div>

          {/* ADDRESS TYPE */}
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-700">
              Address Type
            </label>

            <div className="flex gap-3">

              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-xs">
                <input
                  type="radio"
                  name="addressType"
                  value="home"
                  checked={formData.addressType === "home"}
                  onChange={handleChange}
                />

                Home
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-xs">
                <input
                  type="radio"
                  name="addressType"
                  value="office"
                  checked={formData.addressType === "office"}
                  onChange={handleChange}
                />

                Office
              </label>

            </div>
          </div>

          {/* LOCATION */}
          <div className="rounded-lg border border-[#BCE9D9] bg-[#F0FBF7] p-4">

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="text-xs font-medium text-gray-700">
                  Delivery Location
                </p>

                {location.latitude ? (
                  <p className="mt-1 text-[10px] text-green-600">
                    Location captured ✓
                  </p>
                ) : (
                  <p className="mt-1 text-[10px] text-gray-500">
                    Your location is required
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleGetLocation}
                className="rounded-md bg-[#0F9D74] px-4 py-2 text-xs text-white"
              >
                Get Location
              </button>

            </div>

          </div>

          {/* DEFAULT ADDRESS */}
          <label className="flex cursor-pointer items-center gap-2">

            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="accent-[#0F9D74]"
            />

            <span className="text-xs text-gray-600">
              Make this my default address
            </span>

          </label>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="flex-1 rounded-lg border border-gray-300 py-3 text-xs font-medium text-gray-600"
            >
              Cancel
            </button>

            <button
            onClick={() => navigate("/checkout")}
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-[#0F9D74] py-3 text-xs font-medium text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Address"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddAddress;