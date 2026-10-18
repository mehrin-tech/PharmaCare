import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {
  Pill,
  ShoppingBag,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";
import { getPharmacyOrders } from "../../../redux/slices/orderSlice";

const MedicineStats = () => {
const dispatch=useDispatch()
  const medicines = useSelector(
    (state) => state.medicines.medicines ?? []
  );

  const pharmacyOrders=useSelector((state)=>state.orders.pharmacyOrders ?? [])
   useEffect(() => {
    dispatch(getPharmacyOrders());
  }, [dispatch]);

  const totalMedicines = medicines.length;

  const lowStockItems = medicines.filter((medicine) => {
    const stock = Number(medicine.stockQuantity ?? medicine.stock ?? 0);
    const minStock = Number(medicine.minStock ?? 10);

    return stock <= minStock;
  }).length;

  const totalOrders=pharmacyOrders.length
  const totalRevenue = pharmacyOrders
  .filter(
    (order) =>
      order.paymentStatus === "paid" &&
      order.orderStatus !== "cancelled"
  )
  .reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0
  );
  const stats = [
    {
      title: "Total Medicines",
      value: totalMedicines,
      icon: Pill,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Low Stock Items",
      value: lowStockItems,
      icon: AlertTriangle,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="min-w-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${stat.color}`}
              >
                <Icon size={20} />
              </div>

              <p className="text-sm text-gray-500">
                {stat.title}
              </p>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {stat.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default MedicineStats;
