import React, { useState } from "react";
import {
  Search,
  Plus,
  
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";

const MedicineToolbar = ({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  stockStatus,
  setStockStatus,
  categories = [],
  onAddMedicine,
  buttonLabel='Add Medicine'
 
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setCategory("all");
    setStatus("all");
    setStockStatus("all");
  };

  const activeFilterCount = [
    category !== "all",
    status !== "all",
    stockStatus !== "all",
  ].filter(Boolean).length;

  return (
    <div className="mt-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Search and actions */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filters button */}
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            aria-expanded={showFilters}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
              showFilters
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal size={17} />
            Filters

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-xs text-white">
                {activeFilterCount}
              </span>
            )}

            <ChevronDown
              size={15}
              className={`transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Import button */}
          {/* <button
            type="button"
            onClick={onImport}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Upload size={17} />
            Import
          </button> */}

          {/* Add medicine button */}
          <button
            type="button"
            onClick={onAddMedicine}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          >
            <Plus size={18} />
            {buttonLabel}
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mt-5 border-t border-gray-100 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
              Filter Medicines
            </h3>

            <button
              type="button"
              onClick={() => setShowFilters(false)}
              aria-label="Close filters"
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
              >
                <option value="all">All Categories</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Stock status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-600">
                Stock Status
              </label>

              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
              >
                <option value="all">All Stock Status</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineToolbar;
