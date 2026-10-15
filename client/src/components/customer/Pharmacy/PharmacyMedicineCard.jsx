import { useEffect, useState } from "react";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";
import api from "../../../services/api";

const PharmacyMedicineCard = ({ medicine, onAddToCart, onViewDetails }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.get("/wishlist/my").then(({ data }) => {
      const items = Array.isArray(data?.wishlist) ? data.wishlist : data?.wishlist?.items || [];
      const exists = items.some((item) => item?.medicine?._id === medicine._id || item?.medicine === medicine._id);
      if (mounted) setIsWishlisted(exists);
    }).catch((error) => console.error("Wishlist fetch error:", error.response?.data || error.message));
    return () => { mounted = false; };
  }, [medicine._id]);

  const toggleWishlist = async () => {
    if (wishlistLoading) return;
    setWishlistLoading(true);
    try {
      if (isWishlisted) await api.delete(`/wishlist/${medicine._id}`);
      else await api.post("/wishlist", { medicineId: medicine._id });
      setIsWishlisted((value) => !value);
    } catch (error) {
      console.error("Wishlist error:", error.response?.data || error.message);
    } finally {
      setWishlistLoading(false);
    }
  };

  const quantityType = [medicine.quantity, medicine.unit || medicine.packagingType]
    .filter(Boolean).join(" | ");
  const stock = Number(medicine.stock);

  return (
    <article className="relative flex min-h-[158px] flex-col rounded-[10px] border border-gray-200 bg-white p-2.5">
      <button type="button" aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} onClick={toggleWishlist} disabled={wishlistLoading} className="absolute right-2.5 top-2.5 text-[#102A43] disabled:opacity-50">
        <Heart size={15} className={isWishlisted ? "fill-rose-500 text-rose-500" : "hover:text-rose-500"} />
      </button>
      <div className="flex min-w-0 gap-2">
        <div className="flex h-[58px] w-[50px] shrink-0 items-center justify-center rounded-md bg-[#f7f8f8]">
          {medicine.image ? <img src={medicine.image} alt={medicine.name} className="h-full w-full rounded-md object-contain" /> : <span className="text-[8px] text-gray-400">No image</span>}
        </div>
        <div className="min-w-0 flex-1 pr-4">
          <h3 className="truncate text-[11px] font-semibold text-[#102A43]">{medicine.name}</h3>
          {quantityType && <p className="mt-0.5 truncate text-[9px] text-gray-500">{quantityType}</p>}
          {medicine.category && <p className="mt-0.5 truncate text-[9px] text-gray-500">{medicine.category}</p>}
          <p className="mt-1 text-[12px] font-semibold text-[#0F9D74]">{"\u20B9 "}{Number(medicine.price || 0).toFixed(2)}</p>
          <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[8px] ${stock > 0 ? "bg-[#E8F8F2] text-[#0F9D74]" : "bg-gray-100 text-gray-500"}`}>
            {stock > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>
      </div>
      <div className="mt-1.5 flex items-center gap-2 text-[9px] text-gray-600">
        <span className="flex items-center gap-px" aria-label={`Rating ${medicine.rating ?? "unavailable"}`}>
          {Array.from({ length: 5 }, (_, index) => <Star key={index} size={9} className={index < Math.round(Number(medicine.rating) || 0) ? "fill-amber-400 text-amber-400" : "text-amber-300"} />)}
          <span className="ml-0.5">{medicine.rating ?? "\u2014"}</span>
        </span>
        <span>{medicine.deliveryTime || "\u2014"}</span>
      </div>
      <div className="mt-auto flex gap-1.5 pt-2">
        <button type="button" onClick={() => onViewDetails(medicine)} className="flex h-7 flex-1 items-center justify-center gap-1 rounded-md border border-[#0F9D74] text-[9px] font-medium text-[#0F9D74] hover:bg-[#E8F8F2]"><Eye size={12} />View Details</button>
        <button type="button" onClick={() => onAddToCart(medicine)} className="flex h-7 flex-1 items-center justify-center gap-1 rounded-md bg-[#0F9D74] text-[9px] font-medium text-white hover:bg-[#0c8965]"><ShoppingCart size={12} />Add to Cart</button>
      </div>
    </article>
  );
};

export default PharmacyMedicineCard;
