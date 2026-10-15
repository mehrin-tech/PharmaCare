
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMedicine } from "../../../redux/slices/medicineSlice";

const EditMedicineModal = ({ medicine, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.medicines);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    brandName: "",
    category: "",
    description: "",
    mrp: "",
    price: "",
    stock: "",
    expiryDate: "",
    manufacturer: "",
    packSize: "",
    dosage: "",
    form: "",
    drugType: "",
    countryOfOrigin: "",
    prescriptionRequired: false,
    isActive: true,
  });

  // Existing medicine details form-il fill cheyyuka
  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name || "",
        genericName: medicine.genericName || "",
        brandName: medicine.brandName || "",
        category: medicine.category || "",
        description: medicine.description || "",
        mrp: medicine.mrp ?? "",
        price: medicine.price ?? "",
        stock: medicine.stock ?? "",
        expiryDate: medicine.expiryDate
          ? String(medicine.expiryDate).slice(0, 10)
          : "",
        manufacturer: medicine.manufacturer || "",
        packSize: medicine.packSize || "",
        dosage: medicine.dosage || "",
        form: medicine.form || "",
        drugType: medicine.drugType || "",
        countryOfOrigin: medicine.countryOfOrigin || "",
        prescriptionRequired: Boolean(
          medicine.prescriptionRequired
        ),
        isActive: medicine.isActive ?? true,
      });

      setError("");
    }
  }, [medicine]);

  if (!isOpen || !medicine) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.category.trim() ||
      formData.price === "" ||
      formData.mrp === "" ||
      formData.stock === ""
    ) {
      setError("Please fill all required fields.");
      return;
    }

    const price = Number(formData.price);
    const mrp = Number(formData.mrp);
    const stock = Number(formData.stock);

    if (
      !Number.isFinite(price) ||
      !Number.isFinite(mrp) ||
      !Number.isInteger(stock) ||
      price < 0 ||
      mrp < 0 ||
      stock < 0
    ) {
      setError("Enter valid price, MRP and stock values.");
      return;
    }

    if (price > mrp) {
      setError("Selling price cannot be greater than MRP.");
      return;
    }

    const medicineData = {
      ...formData,
      name: formData.name.trim(),
      price,
      mrp,
      stock,
    };

    try {
      await dispatch(
        updateMedicine({
          medicineId: medicine._id,
          medicineData,
        })
      ).unwrap();

      onClose();
    } catch (err) {
      setError(
        typeof err === "string"
          ? err
          : "Failed to update medicine. Please try again."
      );
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  const fields = [
    { name: "name", label: "Medicine Name", required: true },
    { name: "genericName", label: "Generic Name" },
    { name: "brandName", label: "Brand Name" },
    { name: "category", label: "Category", required: true },
    { name: "manufacturer", label: "Manufacturer" },
    { name: "dosage", label: "Dosage" },
    { name: "form", label: "Form (Tablet, Syrup, etc.)" },
    { name: "drugType", label: "Drug Type" },
    { name: "packSize", label: "Pack Size" },
    { name: "countryOfOrigin", label: "Country of Origin" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Medicine
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update medicine information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            aria-label="Close edit medicine modal"
          >
            &times;
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-5"
        >
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500"> *</span>
                  )}
                </label>

                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required || false}
                  className={inputClass}
                />
              </div>
            ))}

            {/* MRP */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                MRP (₹) *
              </label>
              <input
                type="number"
                name="mrp"
                min="0"
                step="0.01"
                value={formData.mrp}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Selling Price */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Stock */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={inputClass}
              placeholder="Enter medicine description"
            />
          </div>

          {/* Checkboxes */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
                className="h-4 w-4 accent-emerald-600"
              />
              Prescription required
            </label>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="h-4 w-4 accent-emerald-600"
              />
              Medicine active
            </label>
          </div>

          {/* Footer */}
          <div className="mt-7 flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMedicineModal;
