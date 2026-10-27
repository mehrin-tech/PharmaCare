import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PrescriptionStats from
  "../../components/pharmacy/Prescriptions/PrescriptionStats";

import PrescriptionFilters from
  "../../components/pharmacy/Prescriptions/PrescriptionFilters";

import PrescriptionTable from
  "../../components/pharmacy/Prescriptions/PrescriptionTable";

import PrescriptionDetailsModal from
  "../../components/pharmacy/Prescriptions/PrescriptionDetailsModal";

import RejectPrescriptionModal from
  "../../components/pharmacy/Prescriptions/RejectPrescriptionModal";

import {
  getAllPharmacyPrescriptions,
  approvePrescription,
  rejectPrescription,
} from "../../redux/slices/prescriptionSlice";
import Pagination from "../../components/Pagination/Pagination";

const PrescriptionManagement = () => {
  const dispatch = useDispatch();

  const {
    allPharmacyPrescriptions = [],
    pendingLoading,
    pendingError,
    actionLoading,
    actionError,
    pagination={}
  } = useSelector((state) => state.prescription);

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const [selectedPrescription, setSelectedPrescription] =
    useState(null);

  const [rejectingPrescription, setRejectingPrescription] =
    useState(null);

  const [rejectionReason, setRejectionReason] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
const limit = 5;

  // Fetch all pharmacy prescriptions
  useEffect(() => {
    dispatch(getAllPharmacyPrescriptions({
      page:currentPage,limit
    }));
  }, [dispatch,currentPage]);

  // Filter by status and search
  const filteredPrescriptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allPharmacyPrescriptions.filter((item) => {
      const matchesStatus =
        activeFilter === "all" ||
        item.status === activeFilter;

      const matchesSearch = [
        item._id,
        item.user?.name,
        item.user?.email,
        item.medicine?.name,
      ].some((value) =>
        String(value || "").toLowerCase().includes(query)
      );

      return matchesStatus && matchesSearch;
    });
  }, [allPharmacyPrescriptions, activeFilter, search]);

  // Status counts
  const counts = useMemo(
    () => ({
      all: allPharmacyPrescriptions.length,

      pending: allPharmacyPrescriptions.filter(
        (item) => item.status === "pending"
      ).length,

      approved: allPharmacyPrescriptions.filter(
        (item) => item.status === "approved"
      ).length,

      rejected: allPharmacyPrescriptions.filter(
        (item) => item.status === "rejected"
      ).length,
    }),
    [allPharmacyPrescriptions]
  );

  // Approve prescription
  const handleApprove = async (prescription) => {
    const result = await dispatch(
      approvePrescription(prescription._id)
    );

    if (approvePrescription.fulfilled.match(result)) {
      setSelectedPrescription(null);
      setRejectingPrescription(null);
    }
  };

  // Open rejection modal
  const openRejectModal = (prescription) => {
    setSelectedPrescription(null);
    setRejectingPrescription(prescription);
    setRejectionReason("");
  };

  // Reject prescription
  const handleReject = async () => {
    if (!rejectingPrescription || !rejectionReason.trim()) {
      return;
    }

    const result = await dispatch(
      rejectPrescription({
        prescriptionId: rejectingPrescription._id,
        rejectionReason: rejectionReason.trim(),
      })
    );

    if (rejectPrescription.fulfilled.match(result)) {
      setRejectingPrescription(null);
      setSelectedPrescription(null);
      setRejectionReason("");
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Prescription Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Review and manage customer prescriptions.
        </p>
      </div>

      {/* Statistics */}
      <PrescriptionStats
        prescriptions={allPharmacyPrescriptions}
      />

      {/* Fetch error */}
      {pendingError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {pendingError}
        </div>
      )}

      {/* Action error */}
      {actionError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {actionError}
        </div>
      )}

      {/* Search, filters and refresh */}
      <PrescriptionFilters
        search={search}
        onSearchChange={setSearch}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
        loading={pendingLoading}
        onRefresh={() =>
          dispatch(getAllPharmacyPrescriptions())
        }
      />

      {/* Prescription table */}
      <PrescriptionTable
        prescriptions={filteredPrescriptions}
        loading={pendingLoading}
        actionLoading={actionLoading}
        onView={setSelectedPrescription}
        onApprove={handleApprove}
        onReject={openRejectModal}
      />

{!pendingError && (
  <Pagination
    currentPage={pagination.currentPage || currentPage}
    totalPages={pagination.totalPages || 0}
    totalItems={pagination.totalPrescriptions || 0}
    limit={limit}
    onPageChange={setCurrentPage}
    loading={pendingLoading}
  />
)}
      {/* Prescription details */}
      <PrescriptionDetailsModal
        prescription={selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        onApprove={handleApprove}
        onReject={openRejectModal}
        actionLoading={actionLoading}
      />

      {/* Rejection reason modal */}
      <RejectPrescriptionModal
        prescription={rejectingPrescription}
        reason={rejectionReason}
        onReasonChange={setRejectionReason}
        onClose={() => {
          setRejectingPrescription(null);
          setRejectionReason("");
        }}
        onConfirm={handleReject}
        loading={actionLoading}
      />
    </div>
  );
};

export default PrescriptionManagement;