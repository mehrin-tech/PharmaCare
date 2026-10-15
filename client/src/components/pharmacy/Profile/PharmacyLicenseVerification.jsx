
import React from "react";
import { useSelector } from "react-redux";
import {
  ShieldCheck,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";

const PharmacyLicenseVerification = () => {
  const { pharmacy, loading, error } = useSelector(
    (state) => state.profile
  );

  if (loading && !pharmacy) {
    return <div className="rounded-xl bg-white p-6 text-gray-500">
      Loading license details...
    </div>;
  }

  if (error && !pharmacy) {
    return <div className="rounded-xl bg-red-50 p-4 text-red-600">
      {error}
    </div>;
  }

  if (!pharmacy) {
    return <div className="rounded-xl bg-white p-6 text-gray-500">
      Pharmacy details not found.
    </div>;
  }

  const verification = pharmacy.licenseVerification || {};
  const verificationStatus = verification.status || "pending";
  const approvalStatus = pharmacy.approvalStatus || "pending";

  const statusConfig = {
    verified: {
      label: "Verified",
      icon: CheckCircle,
      className: "bg-emerald-50 text-emerald-700",
    },
    pending: {
      label: "Pending",
      icon: Clock,
      className: "bg-amber-50 text-amber-700",
    },
    suspicious: {
      label: "Suspicious",
      icon: AlertTriangle,
      className: "bg-orange-50 text-orange-700",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      className: "bg-red-50 text-red-700",
    },
  };

  const approvalConfig = {
    approved: {
      label: "Approved",
      icon: CheckCircle,
      className: "bg-emerald-50 text-emerald-700",
    },
    pending: {
      label: "Pending Approval",
      icon: Clock,
      className: "bg-amber-50 text-amber-700",
    },
    rejected: {
      label: "Rejected",
      icon: XCircle,
      className: "bg-red-50 text-red-700",
    },
  };

  const verificationInfo =
    statusConfig[verificationStatus] || statusConfig.pending;

  const approvalInfo =
    approvalConfig[approvalStatus] || approvalConfig.pending;

  const VerificationIcon = verificationInfo.icon;
  const ApprovalIcon = approvalInfo.icon;

  const confidence = Number(verification.confidence);
  const confidenceValid =
    Number.isFinite(confidence) && confidence >= 0 && confidence <= 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-emerald-50 p-3">
            <ShieldCheck size={26} className="text-emerald-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              License & Verification
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              View your pharmacy license and verification details.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">AI Verification Status</p>
            <span
              className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${verificationInfo.className}`}
            >
              <VerificationIcon size={16} />
              {verificationInfo.label}
            </span>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500">Admin Approval</p>
            <span
              className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${approvalInfo.className}`}
            >
              <ApprovalIcon size={16} />
              {approvalInfo.label}
            </span>
          </div>
        </div>
      </section>

      {/* License Information */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-5 flex items-center gap-3">
          <FileText size={22} className="text-emerald-600" />
          <h3 className="text-base font-semibold text-gray-800">
            License Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">License Number</p>
            <p className="mt-1 font-medium text-gray-800">
              {pharmacy.licenseNumber || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">License Document</p>

            {pharmacy.licenseDocument ? (
              <a
                href={pharmacy.licenseDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 font-medium text-emerald-700 hover:underline"
              >
                <FileText size={17} />
                View License Document
              </a>
            ) : (
              <p className="mt-1 text-gray-500">No document available</p>
            )}
          </div>
        </div>
      </section>

      {/* AI Verification Details */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-5 text-base font-semibold text-gray-800">
          AI Verification Details
        </h3>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Verification Confidence
            </span>
            <span className="font-semibold text-gray-800">
              {confidenceValid ? `${confidence}%` : "Not available"}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all"
              style={{
                width: confidenceValid ? `${confidence}%` : "0%",
              }}
            />
          </div>
        </div>

        <div className="mt-5 rounded-lg bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">
            AI Verification Reason
          </p>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            {verification.aiReason || "No verification reason available."}
          </p>
        </div>

        {verification.verifiedAt && (
          <p className="mt-4 text-sm text-gray-500">
            Verified on:{" "}
            {new Date(verification.verifiedAt).toLocaleDateString("en-IN")}
          </p>
        )}
      </section>

      {/* Human Review Notice */}
      <section className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <BadgeCheck size={22} className="shrink-0 text-blue-600" />
        <div>
          <h3 className="font-medium text-blue-900">
            AI Verification & Admin Review
          </h3>
          <p className="mt-1 text-sm leading-6 text-blue-800">
            AI verification assists the review process. Final pharmacy
            approval is handled by the administrator.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PharmacyLicenseVerification;
