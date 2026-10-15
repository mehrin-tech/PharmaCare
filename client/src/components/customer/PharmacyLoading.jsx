export default function PharmacyLoading() {
  return (
    <div className="p-3 space-y-2.5">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="border border-gray-100 rounded-lg p-3 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />

            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-32 mb-2" />
              <div className="h-2 bg-gray-200 rounded w-24" />
            </div>
          </div>

          <div className="h-7 bg-gray-200 rounded mt-3" />
        </div>
      ))}
    </div>
  );
}