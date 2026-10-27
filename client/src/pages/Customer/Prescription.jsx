import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Sidebar from "../../components/customer/Sidebar";
import TopNavbar from "../../components/customer/TopNavbar";

import PrescriptionUpload from "../../components/customer/Prescription/PrescriptionUpload";
import PrescriptionList from "../../components/customer/Prescription/PrescriptionList";

import { getMyPrescriptions } from "../../redux/slices/prescriptionSlice";
import Pagination from "../../components/Pagination/Pagination";

const Prescription = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
const limit = 2

const { pagination, loading, prescriptions } = useSelector(
  (state) => state.prescription
);

    const [searchParams] = useSearchParams();

  const medicineId = searchParams.get("medicineId");
  const pharmacyId = searchParams.get("pharmacyId");
  const medicineName = searchParams.get("medicineName");

  useEffect(() => {
    dispatch(getMyPrescriptions({
      page:currentPage,
      limit
    }));
  }, [dispatch,currentPage,limit]);

  return (
    <div className="min-h-screen bg-[#F7F9FA] md:flex">
      
      {/* SIDEBAR */}
      <Sidebar />

      <div className="min-w-0 flex-1">
        
        {/* TOP NAVBAR */}
        <TopNavbar />

        <main className="p-3 sm:p-4 lg:p-5">

          {/* PAGE HEADER */}
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-gray-800">
              My Prescriptions
            </h1>

            <p className="mt-1 text-[10px] text-gray-400">
              Upload and manage your prescriptions.
            </p>
          </div>

          {/* UPLOAD */}
          <PrescriptionUpload
            medicineId={medicineId}
            pharmacyId={pharmacyId}
            medicineName={medicineName}
          />

          {/* MY PRESCRIPTIONS */}
          <PrescriptionList />
          {prescriptions.length > 0 && (
  <div className="mt-5">
    <Pagination
      currentPage={pagination.currentPage || currentPage}
      totalPages={pagination.totalPages || 0}
      totalItems={pagination.totalPrescriptions || 0}
      limit={limit}
      onPageChange={setCurrentPage}
      loading={loading}
    />
  </div>
)}

        </main>
      </div>
    </div>
  );
};

export default Prescription;
