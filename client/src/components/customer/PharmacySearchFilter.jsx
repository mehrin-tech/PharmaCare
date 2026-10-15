import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function PharmacySearchFilter({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  pharmacyType,
  setPharmacyType,
}) {
  return (
    <div className="flex flex-col gap-3">

      {/* Search + Sort + Filter */}
      <div className="flex flex-col sm:flex-row gap-2">

        {/* Search */}
        <div className="relative flex-1">

          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search pharmacy..."
            className="w-full h-[38px] pl-9 pr-9 bg-white border border-gray-200 rounded-lg text-[11px] outline-none focus:border-[#0F9D74] focus:ring-1 focus:ring-[#0F9D74]/20"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X
                size={14}
                className="text-gray-400"
              />
            </button>
          )}

        </div>

        {/* Sort */}
        <div>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="h-[38px] min-w-[145px] px-3 pr-8 bg-white border border-gray-200 rounded-lg text-[10px] outline-none cursor-pointer"
          >
            <option value="nearest">
              Nearest first
            </option>

            <option value="delivery">
              Fastest delivery
            </option>

            <option value="name">
              Pharmacy name
            </option>
          </select>
        </div>

        {/* Filter */}
        <button
          onClick={() =>
            setShowFilters(!showFilters)
          }
          className={`h-[38px] px-4 rounded-lg border text-[10px] flex items-center justify-center gap-1.5 ${
            showFilters
              ? "bg-[#DDF7EE] border-[#0F9D74] text-[#0F9D74]"
              : "bg-white border-gray-200 text-[#102A43]"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>

      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-wrap gap-2">

          <button
            onClick={() => setPharmacyType("all")}
            className={`px-4 py-2 rounded-full text-[9px] border ${
              pharmacyType === "all"
                ? "bg-[#0F9D74] text-white border-[#0F9D74]"
                : "bg-white text-[#102A43] border-gray-200"
            }`}
          >
            All Pharmacies
          </button>

          <button
            onClick={() => setPharmacyType("hospital")}
            className={`px-4 py-2 rounded-full text-[9px] border ${
              pharmacyType === "hospital"
                ? "bg-[#0F9D74] text-white border-[#0F9D74]"
                : "bg-white text-[#102A43] border-gray-200"
            }`}
          >
            Hospital Pharmacies
          </button>

          <button
            onClick={() => setPharmacyType("local")}
            className={`px-4 py-2 rounded-full text-[9px] border ${
              pharmacyType === "local"
                ? "bg-[#0F9D74] text-white border-[#0F9D74]"
                : "bg-white text-[#102A43] border-gray-200"
            }`}
          >
            Local Pharmacies
          </button>

        </div>
      )}

    </div>
  );
}