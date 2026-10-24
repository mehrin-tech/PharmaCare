import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  ArrowLeft,
  RefreshCw,
  XCircle,
} from "lucide-react";
import api from "../../services/api";

const PharmacyRegistrationStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initial pharmacy data received during registration/license upload
  const [pharmacy, setPharmacy] = useState(
    location.state?.pharmacy || null
  );

  // Support different ID property names
  const pharmacyId =
    location.state?.pharmacyId ||
    location.state?.pharmacy?._id ||
    location.state?.pharmacy?.id ||
    null;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Fetch the latest pharmacy status from the backend
  const fetchStatus = async (showRefresh = false) => {
    if (!pharmacyId) {
      setError(
        "Pharmacy ID is missing. Please register again or open this page from your registration flow."
      );
      setLoading(false);
      return;
    }

    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await api.get(
        `/pharmacy/registration-status/${pharmacyId}`
      );

      if (!response.data?.success || !response.data?.pharmacy) {
        throw new Error("Unable to retrieve pharmacy registration status.");
      }

      // Always use the latest status returned by the backend
      setPharmacy(response.data.pharmacy);
    } catch (err) {
      console.error("Fetch pharmacy registration status failed:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to fetch registration status. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [pharmacyId]);

  // Status values
  const aiStatus =
    pharmacy?.licenseVerification?.status?.toLowerCase() || "pending";

  const approvalStatus =
    pharmacy?.approvalStatus?.toLowerCase() || "pending";

  const aiVerified = aiStatus === "verified";
  const adminApproved = approvalStatus === "approved";
  const isRejected = approvalStatus === "rejected";

  const verificationLabel = {
    verified: "Verified",
    suspicious: "Needs Review",
    failed: "Verification Failed",
    pending: "Pending",
  }[aiStatus] || "Pending";

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
          <p className="text-sm text-slate-600">
            Loading registration status...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !pharmacy) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
          <XCircle className="mx-auto mb-4 text-red-500" size={44} />

          <h1 className="text-xl font-bold text-slate-900">
            Unable to Load Registration Status
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {error}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => fetchStatus(true)}
              disabled={refreshing}
              className="rounded-lg bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {refreshing ? "Retrying..." : "Try Again"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-slate-700 hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    {
      label: "Registration",
      completed: true,
      current: false,
    },
    {
      label: "License Upload",
      completed: true,
      current: false,
    },
    {
      label: "AI Verification",
      completed: aiVerified,
      current:
        !aiVerified &&
        !["failed", "suspicious"].includes(aiStatus),
    },
    {
      label: "Admin Approval",
      completed: adminApproved,
      current:
        aiVerified && !adminApproved && !isRejected,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-10">

        {/* Header */}
        <div className="text-center">
          <div
            className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full ${
              isRejected
                ? "bg-red-50"
                : adminApproved
                ? "bg-emerald-50"
                : "bg-emerald-50"
            }`}
          >
            {isRejected ? (
              <XCircle size={42} className="text-red-600" />
            ) : (
              <FileCheck2 size={42} className="text-emerald-600" />
            )}
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {isRejected
              ? "Registration Rejected"
              : adminApproved
              ? "Pharmacy Approved!"
              : "Registration Submitted Successfully!"}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            {isRejected
              ? "Your pharmacy registration has been rejected. Please contact the administrator for more information."
              : adminApproved
              ? "Your pharmacy registration has been approved. You can now access your pharmacy dashboard."
              : "Your pharmacy details and license have been submitted. Your application is waiting for admin approval."}
          </p>

          {/* Manual refresh */}
          <button
            type="button"
            onClick={() => fetchStatus(true)}
            disabled={refreshing}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh Status"}
          </button>

          {error && pharmacy && (
            <p className="mt-3 text-sm text-red-600">
              Latest status could not be refreshed: {error}
            </p>
          )}
        </div>

        {/* Progress Tracker */}
        <div className="my-10 grid grid-cols-4 gap-2">
          {steps.map((step, index) => (
            <div key={step.label} className="relative text-center">
              <div className="relative z-10 mb-3 flex justify-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    step.completed
                      ? "bg-emerald-500 text-white"
                      : step.current
                      ? "bg-amber-400 text-white"
                      : "bg-gray-200 text-white"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 size={23} />
                  ) : step.label === "Admin Approval" && isRejected ? (
                    <XCircle size={22} />
                  ) : (
                    <Clock3 size={22} />
                  )}
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                {step.label}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {step.completed
                  ? "Completed"
                  : step.label === "Admin Approval" && isRejected
                  ? "Rejected"
                  : step.current
                  ? "In Progress"
                  : "Pending"}
              </p>

              {index < steps.length - 1 && (
                <div
                  className={`absolute left-[65%] top-5 h-1 w-[70%] ${
                    step.completed
                      ? "bg-emerald-400"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* AI Verification Card */}
        <div
          className={`mb-4 flex items-center gap-4 rounded-xl border p-4 sm:p-6 ${
            aiVerified
              ? "border-emerald-100 bg-emerald-50/70"
              : aiStatus === "failed"
              ? "border-red-100 bg-red-50"
              : "border-amber-100 bg-amber-50/70"
          }`}
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${
              aiVerified
                ? "bg-emerald-500"
                : aiStatus === "failed"
                ? "bg-red-500"
                : "bg-amber-400"
            }`}
          >
            {aiVerified ? (
              <CheckCircle2 size={27} />
            ) : aiStatus === "failed" ? (
              <XCircle size={27} />
            ) : (
              <Clock3 size={27} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-slate-900 sm:text-lg">
              AI License Verification
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {aiVerified
                ? "Your license has been verified successfully."
                : aiStatus === "suspicious"
                ? "Your license needs additional review."
                : aiStatus === "failed"
                ? "Automatic verification was unsuccessful. Further review is required."
                : "Your license is waiting for verification."}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold sm:px-5 sm:text-sm ${
              aiVerified
                ? "bg-emerald-100 text-emerald-700"
                : aiStatus === "failed"
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {verificationLabel}
          </span>
        </div>

        {/* Admin Approval Card */}
        <div
          className={`flex items-center gap-4 rounded-xl border p-4 sm:p-6 ${
            adminApproved
              ? "border-emerald-100 bg-emerald-50/70"
              : isRejected
              ? "border-red-100 bg-red-50"
              : "border-amber-100 bg-amber-50/70"
          }`}
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ${
              adminApproved
                ? "bg-emerald-500"
                : isRejected
                ? "bg-red-500"
                : "bg-amber-400"
            }`}
          >
            {adminApproved ? (
              <CheckCircle2 size={27} />
            ) : isRejected ? (
              <XCircle size={27} />
            ) : (
              <Clock3 size={27} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-slate-900 sm:text-lg">
              Admin Approval
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              {adminApproved
                ? "Your pharmacy has been approved by the administrator."
                : isRejected
                ? "Your pharmacy registration was rejected."
                : "Your application is under review. You will be able to access your dashboard after approval."}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold sm:px-5 sm:text-sm ${
              adminApproved
                ? "bg-emerald-100 text-emerald-700"
                : isRejected
                ? "bg-red-100 text-red-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {approvalStatus.charAt(0).toUpperCase() +
              approvalStatus.slice(1)}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-gray-100 pt-6 text-center">
          {adminApproved ? (
            <button
              type="button"
              onClick={() => navigate("/pharmacy/dashboard")}
              className="rounded-lg bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Go to Pharmacy Dashboard
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-600 px-7 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          )}

          {pharmacyId && (
            <p className="mt-4 text-xs text-slate-400">
              Application ID: {pharmacyId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyRegistrationStatus;