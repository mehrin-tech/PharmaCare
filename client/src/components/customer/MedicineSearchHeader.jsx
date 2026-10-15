import { ChevronDown } from "lucide-react";

export default function MedicineSearchHeader({
  searchTerm = "Paracetamol 500 mg",
}) {
  return (
    <section className="w-full bg-white border border-gray-100 rounded-lg mt-3 px-4 h-[42px] flex items-center justify-between">

      {/* Search Result */}
      <div className="flex items-center gap-1">
        <span className="text-[11px] font-medium text-[#102A43]">
          Search Results for
        </span>

        <span className="text-[11px] font-medium text-[#0F9D74]">
          {searchTerm}
        </span>
        {/* <MedicineSearchHeader searchTerm={searchTerm} /> */}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">

        <span className="text-[8px] text-[#102A43]">
          Sort By
        </span>

        <button
          className="
            h-[28px]
            px-3
            border
            border-[#0F9D74]
            rounded-md
            bg-white
            text-[8px]
            text-[#102A43]
            flex
            items-center
            gap-2
            hover:bg-[#E8F8F2]
            transition
          "
        >
          Nearest

          <ChevronDown
            size={11}
            className="text-[#0F9D74]"
          />
        </button>

      </div>

    </section>
  );
}