import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
} from "lucide-react";

import { uploadPrescription } from "../../../redux/slices/prescriptionSlice";

const PrescriptionUpload = ({
  medicineId,
  pharmacyId,
  medicineName,
}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const { uploadLoading, uploadError } = useSelector(
    (state) => state.prescription
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");

  // =========================
  // FILE SELECT
  // =========================

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileError("");

    // Allowed file types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type) || !/\.(jpe?g|png|pdf)$/i.test(file.name)) {
      setFileError(
        "Only JPG, PNG and PDF files are allowed."
      );

      return;
    }

    // 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setFileError(
        "File size should not exceed 5 MB."
      );

      return;
    }

    setSelectedFile(file);
  };

  // =========================
  // REMOVE FILE
  // =========================

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================
  // UPLOAD
  // =========================

  const handleUpload = async () => {
    setFileError("");

    if (!selectedFile) {
      setFileError("Please select a prescription.");
      return;
    }

    if (!medicineId || !pharmacyId) {
      setFileError(
        "Medicine and pharmacy information is missing."
      );
      return;
    }

    try {
      await dispatch(
        uploadPrescription({
          file: selectedFile,
          medicineId,
          pharmacyId,
        })
      ).unwrap();

      // Clear selected file after successful upload
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      // Error is already stored in Redux
      // Redux exposes a safe, user-facing upload error.
    }
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">

      {/* HEADER */}
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F0FBF7]">
            <FileText
              size={16}
              className="text-[#0F9D74]"
            />
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-800">
              Upload Prescription
            </h2>

            <p className="mt-0.5 text-[8px] text-gray-400">
              Upload your valid prescription
            </p>
          </div>
        </div>
      </div>

      {medicineId && pharmacyId && (
        <div className="mb-4 rounded-lg border border-[#DFF6EE] bg-[#F0FBF7] p-3">
          <p className="text-[8px] font-medium uppercase tracking-wide text-gray-500">
            Prescription for
          </p>
          <p className="mt-1 text-[11px] font-semibold text-gray-800">
            {medicineName || "Selected medicine"}
          </p>
        </div>
      )}

      {(!medicineId || !pharmacyId) && (
        <p className="mb-4 rounded-lg bg-amber-50 p-3 text-[10px] text-amber-700">
          Select a medicine to upload a prescription.
        </p>
      )}

      {/* UPLOAD AREA */}
      {!selectedFile ? (
        <div
          onClick={() =>
            fileInputRef.current?.click()
          }
          className="cursor-pointer rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center transition hover:border-[#0F9D74] hover:bg-[#F0FBF7]"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <Upload
              size={18}
              className="text-[#0F9D74]"
            />
          </div>

          <p className="mt-3 text-[10px] font-medium text-gray-700">
            Click to upload prescription
          </p>

          <p className="mt-1 text-[8px] text-gray-400">
            JPG, PNG or PDF · Maximum 5 MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            aria-label="Select prescription file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        /* SELECTED FILE */
        <div className="rounded-xl border border-[#DFF6EE] bg-[#F0FBF7] p-4">

          <div className="flex items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                <FileText
                  size={16}
                  className="text-[#0F9D74]"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[9px] font-medium text-gray-700">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-[7px] text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemoveFile}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-gray-400 hover:text-red-500"
            >
              <X size={12} />
            </button>

          </div>

          <div className="mt-3 flex items-center gap-1">
            <CheckCircle
              size={11}
              className="text-[#0F9D74]"
            />

            <span className="text-[8px] text-[#0F9D74]">
              File selected successfully
            </span>
          </div>
        </div>
      )}

      {/* FRONTEND ERROR */}
      {fileError && (
        <p className="mt-3 text-[9px] text-red-500">
          {fileError}
        </p>
      )}

      {/* BACKEND ERROR */}
      {uploadError && (
        <p className="mt-2 text-[9px] text-red-500">
          {uploadError}
        </p>
      )}

      {/* UPLOAD BUTTON */}
      <button
  type="button"
  onClick={handleUpload}
  disabled={
    uploadLoading ||
    !selectedFile ||
    !medicineId ||
    !pharmacyId
  }
  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F9D74] px-4 py-3 text-[9px] font-medium text-white transition hover:bg-[#0c8965] disabled:cursor-not-allowed disabled:opacity-50"
>
        {uploadLoading ? (
          "Uploading..."
        ) : (
          <>
            <Upload size={12} />
            Upload Prescription
          </>
        )}
      </button>

    </section>
  );
};

export default PrescriptionUpload;
