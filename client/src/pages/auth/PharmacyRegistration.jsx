

import { useState } from "react";
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Building2,
  UserRound,
  Mail,
  Phone,
  MapPin,
  FileText,
  LockKeyhole,
  UploadCloud,
  Image as ImageIcon,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import api from "../../services/api";
import pharmacyImage from "../../assets/bannerRegisterPharma.png";

const PharmacyRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pharmacyName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    licenseNumber: "",
    gstNumber: "",
    pharmacyType: "local",
    password: "",
    confirmPassword: "",
  });

  const [licenseFile, setLicenseFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");
  const [registrationDone, setRegistrationDone] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLicenseChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, JPG or PNG file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("License file must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setLicenseFile(file);
  };

  const inputClass =
    "h-[39px] w-full min-w-0 rounded-md border border-gray-200 bg-white px-3 text-[11px] text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100";

  const iconClass =
    "pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!licenseFile && !pharmacyId) {
      setError("Please upload your pharmacy license.");
      return;
    }

    setLoading(true);

    try {
      let id = pharmacyId;

      // Step 1: Register the pharmacy only once.
      if (!id) {
        const registrationPayload = {
          pharmacyName: form.pharmacyName.trim(),
          ownerName: form.ownerName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          password: form.password,
          pharmacyType: form.pharmacyType,
          licenseNumber: form.licenseNumber.trim(),
          address: {
            street: form.address.trim(),
          },
        };

        const response = await api.post(
          "/pharmacy/register",
          registrationPayload
        );

        id = response.data.pharmacy.id;
        setPharmacyId(id);
        setRegistrationDone(true);
      }

      // Step 2: Upload license against the created pharmacy.
      if (!licenseFile) {
        setError(
          "Your account is registered. Select your license and retry."
        );
        return;
      }

      const licenseData = new FormData();
      licenseData.append("license", licenseFile);

      const licenseResponse = await api.post(
        `/pharmacy/${id}/license`,
        licenseData
      );
        const uploadedPharmacy = licenseResponse.data?.pharmacy;

  navigate("/pharmacy/registration-status", {
    state: {
      pharmacyId:
        uploadedPharmacy?._id ||
        uploadedPharmacy?.id ||
        id,
      message: licenseResponse.data.message,
      pharmacy: uploadedPharmacy || {
        _id: id,
        approvalStatus: "pending",
        licenseVerification: {
          status: "verified",
        },
      },
    },
  });

    
    } catch (err) {
      console.error("Registration error:", err.response?.data || err);
  console.log("Status:", err.response?.status);
  console.log("Backend response:", err.response?.data);

  setError(
    err.response?.data?.message ||
      err.response?.data?.error ||
      "Registration failed. Please try again."
  );
    
    } finally {
      setLoading(false);
    }
  };

  const PasswordField = ({
    name,
    placeholder,
    visible,
    toggle,
  }) => (
    <div className="relative min-w-0">
      <LockKeyhole size={13} className={iconClass} />
      <input
        name={name}
        type={visible ? "text" : "password"}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required
        disabled={registrationDone}
        className={`${inputClass} pl-8 pr-8`}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`Toggle ${placeholder}`}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
      >
        {visible ? <EyeOff size={13} /> : <Eye size={13} />}
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F7F6] p-3 sm:p-6">
      <div className="grid w-full max-w-[1050px] overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(16,80,54,0.10)] md:min-h-[610px] md:grid-cols-[44%_56%]">

        {/* LEFT PANEL */}
        <div className="relative hidden overflow-hidden bg-[#EFFCF4] p-7 md:flex md:flex-col">
          <Link
            to="/"
            className="relative z-10 flex items-center gap-2"
          >
           
            <img src={logo} className=" w-[22px] h-[22px] object-contain"/>
            <span className="text-[17px] font-bold tracking-tight text-gray-800">
              Pharma<span className="text-emerald-600">Care</span>
            </span>
          </Link>

          <div className="flex flex-1 items-center justify-center">
            <img
              src={pharmacyImage}
              alt="PharmaCare pharmacy products"
              className="h-auto max-h-[390px] w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center p-5 sm:p-8 md:px-8 md:py-7">
          <div className="w-full max-w-[440px]">
            <h1 className="text-[23px] font-bold tracking-tight text-gray-900">
              Create your account
            </h1>

            <p className="mt-1 text-[11px] leading-4 text-gray-500">
              Sign up & start your journey
              <br />
              towards better health.
            </p>

            {error && (
              <div className="mt-3 rounded-md border border-red-100 bg-red-50 p-2.5 text-xs text-red-700">
                {error}
              </div>
            )}

            {registrationDone && (
              <div className="mt-3 flex gap-2 rounded-md bg-emerald-50 p-2.5 text-xs text-emerald-700">
                <CheckCircle2 size={15} className="shrink-0" />
                Account created. Upload your license to continue.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-2.5">
              {/* Pharmacy and owner */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative min-w-0">
                  <Building2 size={13} className={iconClass} />
                  <input
                    name="pharmacyName"
                    value={form.pharmacyName}
                    onChange={handleChange}
                    placeholder="Pharmacy Name"
                    required
                    disabled={registrationDone}
                    className={`${inputClass} pl-8`}
                  />
                </div>

                <div className="relative min-w-0">
                  <UserRound size={13} className={iconClass} />
                  <input
                    name="ownerName"
                    value={form.ownerName}
                    onChange={handleChange}
                    placeholder="Pharmacy Owner Name"
                    required
                    disabled={registrationDone}
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </div>

              {/* Email and phone */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative min-w-0">
                  <Mail size={13} className={iconClass} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    disabled={registrationDone}
                    className={`${inputClass} pl-8`}
                  />
                </div>

                <div className="relative min-w-0">
                  <Phone size={13} className={iconClass} />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                    disabled={registrationDone}
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <MapPin size={13} className={iconClass} />
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Pharmacy Address"
                  required
                  disabled={registrationDone}
                  className={`${inputClass} pl-8`}
                />
              </div>

              {/* License and GST */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative min-w-0">
                  <FileText size={13} className={iconClass} />
                  <input
                    name="licenseNumber"
                    value={form.licenseNumber}
                    onChange={handleChange}
                    placeholder="Pharmacy License Number"
                    required
                    disabled={registrationDone}
                    className={`${inputClass} pl-8`}
                  />
                </div>

                <div className="relative min-w-0">
                  <ImageIcon size={13} className={iconClass} />
                  <input
                    name="gstNumber"
                    value={form.gstNumber}
                    onChange={handleChange}
                    placeholder="GST Number"
                    disabled={registrationDone}
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </div>

              {/* Pharmacy type */}
              <select
                name="pharmacyType"
                value={form.pharmacyType}
                onChange={handleChange}
                disabled={registrationDone}
                className={inputClass}
              >
                <option value="local">Local Pharmacy</option>
                <option value="hospital">Hospital Pharmacy</option>
              </select>

              {/* License upload */}
              <label className="flex h-[94px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-emerald-400 bg-[#F0FFF6] px-3 text-center transition hover:bg-emerald-50">
                <UploadCloud
                  size={24}
                  strokeWidth={1.6}
                  className="text-emerald-500"
                />

                <span className="mt-1.5 max-w-full truncate text-[11px] font-semibold text-gray-800">
                  {licenseFile
                    ? licenseFile.name
                    : "Drag & Drop your license here"}
                </span>

                <span className="mt-1 text-[10px] text-gray-500">
                  PDF, JPG or PNG · Max 5 MB
                </span>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                  onChange={handleLicenseChange}
                  className="hidden"
                />
              </label>

              {/* Passwords */}
              <div className="grid grid-cols-2 gap-2">
                <PasswordField
                  name="password"
                  placeholder="Create Password"
                  visible={showPassword}
                  toggle={() =>
                    setShowPassword((prev) => !prev)
                  }
                />

                <PasswordField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  visible={showConfirmPassword}
                  toggle={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 h-[40px] w-full rounded-md bg-[#0F9D74] text-xs font-semibold text-white shadow-sm transition hover:bg-[#0B8964] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : registrationDone
                    ? "Retry License Upload"
                    : "Register"}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyRegistration