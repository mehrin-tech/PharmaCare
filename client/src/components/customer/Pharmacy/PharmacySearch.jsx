import { Search } from "lucide-react";

const PharmacySearch = ({
  search,
  setSearch,
}) => {

  return (
    <div className="relative">

      <Search
        size={10}
        className="
          absolute
          left-2.5
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search medicines from this Pharmacy"
        className="
          w-full
          h-[27px]
          pl-7
          pr-2
          bg-white
          border
          border-gray-200
          rounded-md
          outline-none
          text-[11px]
          text-gray-700
          placeholder:text-gray-400
          focus:border-[#0F9D74]
        "
      />

    </div>
  );
};

export default PharmacySearch;
