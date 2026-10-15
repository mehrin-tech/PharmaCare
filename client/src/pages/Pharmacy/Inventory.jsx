
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InventoryTable from
  "../../components/pharmacy/Inventory/InventoryTable";
import InventoryStats from "../../components/pharmacy/Inventory/InventoryStats";
import MedicineToolbar from "../../components/pharmacy/Medicines/MedicineToolbar";

import { fetchMyMedicines } from "../../redux/slices/medicineSlice";
import { setInventory } from "../../redux/slices/inventorySlice";
import MedicineDetailsModal from "../../components/pharmacy/Medicines/MedicineDetailsModal";
import EditMedicineModal from "../../components/pharmacy/Medicines/EditMedicineModal";

const Inventory = () => {
  const dispatch = useDispatch();

  const { medicines, loading, error } = useSelector(
    (state) => state.medicines
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [stockStatus, setStockStatus] = useState("all");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
const [isDetailsOpen, setIsDetailsOpen] = useState(false);
const [editingMedicine, setEditingMedicine] = useState(null);
const [deletingMedicine, setDeletingMedicine] = useState(null);
const [isAddStockOpen, setIsAddStockOpen] = useState(false);
const [stockMedicine, setStockMedicine] = useState(null);

  // Fetch existing medicines
  useEffect(() => {
    dispatch(fetchMyMedicines());
  }, [dispatch]);

  // Sync existing medicines with inventory slice
  useEffect(() => {
    dispatch(setInventory(medicines));
  }, [medicines, dispatch]);

  // Categories
  const categories = [
    ...new Set(
      medicines
        .map((medicine) => medicine.category)
        .filter(Boolean)
    ),
  ];

  // Search and stock filtering
  const filteredMedicines = medicines.filter((medicine) => {
    const name = (
      medicine.name ||
      medicine.medicineName ||
      ""
    ).toLowerCase();

    const matchesSearch = name.includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || medicine.category === category;

    const stock = Number(medicine.stock ?? 0);

    const matchesStock =
      stockStatus === "all" ||
      (stockStatus === "in-stock" && stock > 10) ||
      (stockStatus === "low-stock" && stock > 0 && stock <= 10) ||
      (stockStatus === "out-of-stock" && stock === 0);

    return matchesSearch && matchesCategory && matchesStock;
  });

//   const handleAddStock = () => {
//     console.log("Add Stock clicked");
//     // Next step: open AddStockModal
//   };
  const handleViewMedicine = (medicine) => {
  setSelectedMedicine(medicine);
  setIsDetailsOpen(true);
};

const handleCloseDetails = () => {
  setIsDetailsOpen(false);
  setSelectedMedicine(null);
};

const handleEditMedicine = (medicine) => {
  setIsDetailsOpen(false);
  setSelectedMedicine(null);
  setEditingMedicine(medicine);
};

const handleCloseEdit = () => {
  setEditingMedicine(null);
};

const handleDeleteMedicine = (medicine) => {
  setDeletingMedicine(medicine);
};

const handleCancelDelete = () => {
  setDeletingMedicine(null);
};

const handleConfirmDelete = async () => {
  if (!deletingMedicine?._id) return;

  try {
    await dispatch(deleteMedicine(deletingMedicine._id)).unwrap();
    setDeletingMedicine(null);
  } catch (error) {
    alert(
      typeof error === "string"
        ? error
        : "Failed to delete medicine"
    );
  }
};

// const handleAddStock = () => {
//   setStockMedicine(null);
//   setIsAddStockOpen(true);
// };

const handleAddStockForMedicine = (medicine) => {
  setStockMedicine(medicine);
  setIsAddStockOpen(true);
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="mb-2 text-xs text-gray-500">
          Home / Inventory
        </p>

        <h1 className="text-2xl font-bold text-gray-900">
          Inventory
        </h1>
      </div>

      {/* Statistics */}
      <InventoryStats />

      {/* Toolbar */}
      <div className="mt-6">
        <MedicineToolbar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          stockStatus={stockStatus}
          setStockStatus={setStockStatus}
          categories={categories}
          buttonLabel="Add Stock"
        //   onAddMedicine={handleAddStock}
          showStatusFilter={false}
          showStockStatusFilter={true}
        />
      </div>

      {/* Inventory table - next step */}
      <div className="mt-5 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-sm text-gray-500">
            Loading inventory...
          </p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <p className="text-sm text-gray-500">
            {filteredMedicines.length} medicines found.
            Inventory table will be added next.
          </p>
        )}
       
       <InventoryTable
  medicines={filteredMedicines}
  onView={handleViewMedicine}
  onEdit={handleEditMedicine}
  onDelete={handleDeleteMedicine}
  onAddStock={(medicine) => {
    console.log("Add stock:", medicine);
  }}
  onAdjustStock={(medicine) => {
    console.log("Adjust stock:", medicine);
  }}
  onStockHistory={(medicine) => {
    console.log("Stock history:", medicine);
  }}
/>
<MedicineDetailsModal
  medicine={selectedMedicine}
  isOpen={isDetailsOpen}
  onClose={handleCloseDetails}
  onEdit={handleEditMedicine}
/>

<EditMedicineModal
  medicine={editingMedicine}
  isOpen={Boolean(editingMedicine)}
  onClose={handleCloseEdit}
/>
{/* <AddStockModal
  isOpen={isAddStockOpen}
  medicines={medicines}
  selectedMedicine={stockMedicine}
  onAddStock={handleAddStockForMedicine}
  onClose={() => {
    setIsAddStockOpen(false);
    setStockMedicine(null);
  }}
  onConfirm={({ medicineId, quantity }) => {
    console.log("Add stock:", { medicineId, quantity });
    // Next step: Redux action connect cheyyam
  }}
/> */}

      </div>
    </div>
  );
};

export default Inventory;

