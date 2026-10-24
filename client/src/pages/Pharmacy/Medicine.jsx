import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import api from '../../services/api'
import MedicineStats from "../../components/pharmacy/Medicines/MedicineStats";
import MedicineToolbar from '../../components/pharmacy/Medicines/MedicineToolbar'
import MedicineTable from '../../components/pharmacy/Medicines/MedicineTable'
import { fetchMyMedicines, deleteMedicine } from "../../redux/slices/medicineSlice";
import MedicineDetailsModal from '../../components/pharmacy/Medicines/MedicineDetailsModal'
import EditMedicineModal from "../../components/pharmacy/Medicines/EditMedicineModal";
import AddMedicineModal from "../../components/pharmacy/Medicines/AddMedicineModal";
// import DeleteMedicineModal from
//   "../../components/pharmacy/Medicines/DeleteMedicineModal";
const Medicine = () => {
    const dispatch = useDispatch()

    const { medicines, loading, error } = useSelector((state) => state.medicines)

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [stockStatus, setStockStatus] = useState("all");
    const [selectedMedicine, setSelectedMedicine] = useState(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [editingMedicine, setEditingMedicine] = useState(null)
     const [showAddModal, setShowAddModal] = useState(false);
  const [adding, setAdding] = useState(false);


    useEffect(() => {
        dispatch(fetchMyMedicines())
    }, [dispatch])
    console.log("Medicines from Redux:", medicines);
    console.log("Medicine loading:", loading);
    console.log("Medicine error:", error);

const handleAddMedicine = async (formData) => {
  try {
    setAdding(true);

    const response = await api.post("/medicines", formData);

    console.log("Medicine added:", response.data);

    setShowAddModal(false);

    // Ivide medicine list refresh cheyyuka.
    // Example: dispatch(getPharmacyMedicines());

  } catch (error) {
    console.error("Add medicine failed:", error);

    throw new Error(
      error.response?.data?.message || "Failed to add medicine"
    );
  } finally {
    setAdding(false);
  }
};

    const handleViewMedicine = (medicine) => {
        setSelectedMedicine(medicine)
        setIsDetailsOpen(true)
    }

    const handleCloseDetails = () => {
        setIsDetailsOpen(false)
        setSelectedMedicine(null)
    }

    const handleEditMedicine = (medicine) => {
        setIsDetailsOpen(false)
        setEditingMedicine(medicine)
        console.log("Edit medicine:", medicine);

    }
    const handleCloseEdit = () => {
        setEditingMedicine(null);
    };

    const handleDeleteMedicine = async (medicine) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${medicine.name}" ?`
        )

        if (!confirmed) return
        try {
            await dispatch(deleteMedicine(medicine._id)).unwrap();

            alert("Medicine deleted successfully!");
        } catch (error) {
            alert(
                typeof error === "string"
                    ? error
                    : "Failed to delete medicine"
            );
        }
    }

    const categories = [
        ...new Set(
            medicines.map((medicine) => medicine.category).filter(Boolean)
        ),
    ];

    const filteredMedicines = medicines.filter((medicine) => {
        const name = (
            medicine.name || medicine.medicineName || ""
        ).toLowerCase();

        const matchesSearch = name.includes(search.toLowerCase());

        const matchesCategory =
            category === "all" || medicine.category === category;

        const medicineStatus = medicine.isActive ? "active" : "inactive";

        const matchesStatus =
            status === "all" || medicineStatus === status;

        const stock = Number(medicine.stock ?? 0);

        const matchesStock =
            stockStatus === "all" ||
            (stockStatus === "in-stock" && stock > 10) ||
            (stockStatus === "low-stock" && stock > 0 && stock <= 10) ||
            (stockStatus === "out-of-stock" && stock === 0);

        return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesStock
        );
    });

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-black">
                Medicines
            </h1>

            <MedicineStats />
            <MedicineToolbar
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                status={status}
                setStatus={setStatus}
                stockStatus={stockStatus}
                setStockStatus={setStockStatus} categories={categories}
               onAddMedicine={() => setShowAddModal(true)}
            //   onImport={handleImport}


            />

            {loading ? (
                <p className="mt-6 text-sm text-gray-500">
                    Loading medicines...
                </p>
            ) : error ? (
                <p className="mt-6 text-sm text-red-600">{error}</p>
            ) : (
                <MedicineTable medicines={filteredMedicines} onView={handleViewMedicine}
                    onEdit={handleEditMedicine}  onDelete={handleDeleteMedicine}
                />
            )}
              

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
              <AddMedicineModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddMedicine}
        loading={adding}
      />
            {/* <DeleteMedicineModal
  isOpen={Boolean(deletingMedicine)}
  medicine={deletingMedicine}
  onCancel={handleCancelDelete}
  onConfirm={handleConfirmDelete}
  loading={loading}
/> */}

        </div>
    );
};

export default Medicine;
