import React from "react";
import { useSelector } from "react-redux";

import PrescriptionCard from "./PrescriptionCard";

const PrescriptionList = () => {
  const {
    prescriptions,
    loading,
    error,
  } = useSelector((state) => state.prescription);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-xs font-semibold text-gray-800">
          My Prescriptions
        </h2>

        <div className="py-8 text-center">
          <p className="text-[10px] text-gray-400">
            Loading prescriptions...
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <section className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-xs font-semibold text-gray-800">
          My Prescriptions
        </h2>

        <div className="py-8 text-center">
          <p className="text-[10px] text-red-500">
            {error}
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (!prescriptions || prescriptions.length === 0) {
    return (
      <section className="mt-5 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-xs font-semibold text-gray-800">
          My Prescriptions
        </h2>

        <div className="py-8 text-center">
          <p className="text-[10px] text-gray-400">
            No prescriptions found.
          </p>

          <p className="mt-1 text-[9px] text-gray-300">
            Upload a prescription to see it here.
          </p>
        </div>
      </section>
    );
  }

  // =========================
  // PRESCRIPTION LIST
  // =========================

  return (
    <section className="mt-5">
      <div className="mb-3">
        <h2 className="text-xs font-semibold text-gray-800">
          My Prescriptions
        </h2>

        <p className="mt-1 text-[9px] text-gray-400">
          Your uploaded prescriptions
        </p>
      </div>

      <div className="space-y-3">
        {prescriptions.map((prescription) => (
          <PrescriptionCard
            key={prescription._id}
            prescription={prescription}
          />
        ))}
      </div>
    </section>
  );
};

export default PrescriptionList;