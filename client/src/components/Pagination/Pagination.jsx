import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  limit = 10,
  onPageChange,
  loading = false,
}) => {
  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * limit + 1;

  const endItem = Math.min(currentPage * limit, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      {/* Results information */}
      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-800">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-800">
          {totalItems}
        </span>{" "}
        results
      </p>

      {/* Pagination buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={loading || currentPage <= 1}
          aria-label="Go to previous page"
          className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            disabled={loading || page === currentPage}
            aria-current={page === currentPage ? "page" : undefined}
            className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
              page === currentPage
                ? "bg-emerald-600 text-white"
                : "border border-gray-200 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
            } disabled:cursor-pointer`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={loading || currentPage >= totalPages || totalPages === 0}
          aria-label="Go to next page"
          className="flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;