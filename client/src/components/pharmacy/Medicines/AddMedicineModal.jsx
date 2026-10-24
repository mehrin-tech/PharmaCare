
import React, { useEffect, useState } from "react";
import { X, Plus, UploadCloud, Image as ImageIcon } from "lucide-react";

const initialForm = {
  name: "",
  genericName: "",
  brandName: "",
  manufacturer: "",
  category: "",
  description: "",
  mrp: "",
  price: "",
  stock: "",
  packSize: "",
  dosage: "",
  form: "",
  drugType: "",
  countryOfOrigin: "India",
  prescriptionRequired: false,
  expiryDate: "",
  image: null,
};

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

const AddMedicineModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialForm);
      setImagePreview("");
      setFormError("");
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setFormError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setImagePreview(URL.createObjectURL(file));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const mrp = Number(formData.mrp);
    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (!formData.name.trim() || !formData.category.trim()) {
      setFormError("Medicine name and category are required.");
      return;
    }

    if (
      formData.mrp === "" ||
      formData.price === "" ||
      formData.stock === ""
    ) {
      setFormError("MRP, selling price and stock quantity are required.");
      return;
    }

    if (
      !Number.isFinite(mrp) ||
      !Number.isFinite(price) ||
      !Number.isInteger(stock) ||
      mrp < 0 ||
      price < 0 ||
      stock < 0
    ) {
      setFormError(
        "Enter valid non-negative prices and a whole-number stock quantity."
      );
      return;
    }

    if (mrp > 0 && price > mrp) {
      setFormError("Selling price cannot be greater than MRP.");
      return;
    }

    if (
      formData.expiryDate &&
      new Date(formData.expiryDate) < new Date(new Date().toDateString())
    ) {
      setFormError("Expiry date cannot be in the past.");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image") {
        if (value) data.append("image", value);
      } else if (key === "prescriptionRequired") {
        data.append(key, String(value));
      } else if (value !== "" && value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    try {
      await onSubmit(data);
    } catch (error) {
      setFormError(
        typeof error === "string"
          ? error
          : error?.message || "Unable to add medicine."
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-medicine-title"
        className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4 sm:px-7">
          <div>
            <h2
              id="add-medicine-title"
              className="text-xl font-bold text-gray-900"
            >
              Add New Medicine
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Add medicine information to your inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={21} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-7">
          {formError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {formError}
            </div>
          )}

          {/* Basic information */}
          <section>
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelClass}>
                  Medicine Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Paracetamol 500mg"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Generic Name</label>
                <input
                  name="genericName"
                  value={formData.genericName}
                  onChange={handleChange}
                  placeholder="e.g. Paracetamol"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Brand Name</label>
                <input
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder="e.g. Dolo"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Pain Relief"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Manufacturer</label>
                <input
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="Manufacturer name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Country of Origin</label>
                <input
                  name="countryOfOrigin"
                  value={formData.countryOfOrigin}
                  onChange={handleChange}
                  placeholder="e.g. India"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Pricing and inventory */}
          <section className="border-t border-gray-100 pt-5">
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Pricing & Inventory
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelClass}>
                  MRP (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  placeholder="0.00"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Selling Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  placeholder="0.00"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  step="1"
                  required
                  placeholder="Available quantity"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Pack Size</label>
                <input
                  name="packSize"
                  value={formData.packSize}
                  onChange={handleChange}
                  placeholder="e.g. 10 tablets"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Medicine details */}
          <section className="border-t border-gray-100 pt-5">
            <h3 className="mb-4 text-base font-semibold text-gray-900">
              Medicine Details
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelClass}>Dosage</label>
                <input
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  placeholder="e.g. 500mg"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Form</label>
                <select
                  name="form"
                  value={formData.form}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select form</option>
                  <option value="tablet">Tablet</option>
                  <option value="capsule">Capsule</option>
                  <option value="syrup">Syrup</option>
                  <option value="injection">Injection</option>
                  <option value="cream">Cream</option>
                  <option value="ointment">Ointment</option>
                  <option value="drops">Drops</option>
                  <option value="inhaler">Inhaler</option>
                  <option value="powder">Powder</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Drug Type</label>
                <select
                  name="drugType"
                  value={formData.drugType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select drug type</option>
                  <option value="prescription">Prescription</option>
                  <option value="otc">Over the counter (OTC)</option>
                </select>
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3">
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onChange={handleChange}
                className="h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm text-gray-700">
                Prescription required for this medicine
              </span>
            </label>

            <div className="mt-4">
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Enter medicine description..."
                className={`${inputClass} resize-y`}
              />
            </div>
          </section>

          {/* Image upload */}
          <section className="border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-base font-semibold text-gray-900">
              Medicine Image
            </h3>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-4 py-6 text-center transition hover:border-emerald-500 hover:bg-emerald-50/30">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Medicine preview"
                  className="mb-3 h-32 w-32 rounded-lg object-contain"
                />
              ) : (
                <div className="mb-3 rounded-full bg-emerald-50 p-3 text-emerald-600">
                  {formData.image ? (
                    <ImageIcon size={25} />
                  ) : (
                    <UploadCloud size={25} />
                  )}
                </div>
              )}

              <span className="text-sm font-semibold text-gray-700">
                Click to upload medicine image
              </span>
              <span className="mt-1 text-xs text-gray-500">
                PNG, JPG or WEBP · Maximum 5 MB
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>

            {formData.image && (
              <div className="mt-2 flex items-center justify-between gap-3 text-sm text-gray-600">
                <span className="truncate">{formData.image.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, image: null }));
                    setImagePreview("");
                  }}
                  className="shrink-0 text-red-600 hover:text-red-700"
                >
                  Remove image
                </button>
              </div>
            )}
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={17} />
              {loading ? "Adding Medicine..." : "Add Medicine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;
