
import { Search, Filter, X } from "lucide-react";

const UserFilters = ({
  search = "",
  setSearch = () => {},
  status = "all",
  setStatus = () => {},
}) => {
  const clearFilters = () => {
    setSearch("");
    setStatus("all");
  };

  const hasFilters = search.trim() !== "" || status !== "all";

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search Input */}
      <div className="relative w-full lg:max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name or email..."
          className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-gray-400 focus:border-[#0F9D74] focus:ring-2 focus:ring-[#0F9D74]/10"
        />
      </div>

      {/* Status Filter + Clear */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Filter
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 min-w-[155px] appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-sm text-slate-700 outline-none transition focus:border-[#0F9D74] focus:ring-2 focus:ring-[#0F9D74]/10"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <X size={15} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default UserFilters;
