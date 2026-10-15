
import React, { useEffect, useState } from "react";
import { X, PackagePlus } from "lucide-react";

const AddStockModal = ({
  isOpen,
  medicines = [],
  selectedMedicine = null,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [medicineId, setMedicineId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMedicineId(selectedMedicine?._id || "");
      setQuantity("");
      setError("");
    }
  }, [isOpen, selectedMedicine]);

  if (!isOpen) return null;

  const currentMedicine = medicines.find(
    (medicine) => medicine._id === medicineId
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!medicineId) {
      setError("Please select a medicine.");
      return;
    }

    const quantityToAdd = Number(quantity);

    if (!Number.isInteger(quantityToAdd) || quantityToAdd <= 0) {
      setError("Enter a valid quantity greater than zero.");
      return;
    }

    onConfirm?.({
      medicineId,
      quantity: quantityToAdd,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-stock-title"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <PackagePlus size={21} />
            </div>

            <div>
              <h2
                id="add-stock-title"
                className="text-lg font-semibold text-gray-900"
              >
                Add Stock
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Increase existing medicine quantity
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Medicine selector */}
          <div>
            <label
              htmlFor="stock-medicine"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Select Medicine <span className="text-red-500">*</span>
            </label>

            <select
              id="stock-medicine"
              value={medicineId}
              onChange={(e) => setMedicineId(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="">Choose a medicine</option>

              {medicines.map((medicine) => (
                <option
                  key={medicine._id}
                  value={medicine._id}
                >
                  {medicine.name} — Stock: {medicine.stock ?? 0}
                </option>
              ))}
            </select>
          </div>

          {/* Current stock */}
          {currentMedicine && (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs text-gray-600">
                Current stock
              </p>

              <p className="mt-1 text-xl font-bold text-emerald-700">
                {Number(currentMedicine.stock ?? 0)} units
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {currentMedicine.name}
              </p>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label
              htmlFor="stock-quantity"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Quantity to Add{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              id="stock-quantity"
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Preview */}
          {currentMedicine && Number(quantity) > 0 &&
            Number.isInteger(Number(quantity)) && (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                <span className="text-sm text-gray-600">
                  Updated stock preview
                </span>

                <span className="font-semibold text-gray-900">
                  {Number(currentMedicine.stock ?? 0) +
                    Number(quantity)}{" "}
                  units
                </span>
              </div>
            )}

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
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
              disabled={loading || medicines.length === 0}
              className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Stock"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStockModal;
