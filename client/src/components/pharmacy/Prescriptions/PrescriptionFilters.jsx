
import { Search, RefreshCw } from "lucide-react";

const PrescriptionFilters = ({
  search,
  onSearchChange,
  activeFilter,
  onFilterChange,
  counts,
  onRefresh,
  loading,
}) => {
  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeFilter === filter.value
                ? "bg-emerald-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {filter.label}
            <span className="ml-2">
              {counts[filter.value] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1 md:w-72">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search customer or medicine..."
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          title="Refresh prescriptions"
          className="rounded-lg border border-gray-200 p-3 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            size={18}
            className={loading ? "animate-spin" : ""}
          />
        </button>
      </div>
    </div>
  );
};

export default PrescriptionFilters;
