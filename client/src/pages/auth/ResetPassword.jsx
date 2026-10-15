
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import logo from "../../assets/logo.png";
 export function ResetPassword(){

  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        `/auth/reset-password/${token}`,
        {
          password: formData.password,
        }
      );

      if (response.data.success) {
        setMessage("Password reset successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Reset link is invalid or expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-9 py-9">

        {/* Logo */}
        <div className="flex justify-center mb-6">

          <div className="flex items-center gap-2">

            <img
              src={logo}
              alt="PharmaCare logo"
              className="w-[25px] h-[25px] object-contain"
            />

            <span className="text-[18px] font-semibold text-[#102a43]">
              Pharma<span className="text-[#0aa678]">
                Care
              </span>
            </span>

          </div>

        </div>

        {/* Heading */}
        <div className="text-center mb-6">

          <h1 className="text-[21px] font-bold text-gray-800">
            Reset password
          </h1>

          <p className="text-[10px] text-gray-500 mt-2 leading-4">
            Create a new password for your
            <br />
            PharmaCare account.
          </p>

        </div>

        {/* Success */}
        {message && (
          <div className="bg-green-50 border border-green-100 text-green-600 text-[11px] p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-500 text-[11px] p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* New Password */}
          <div>

            <label className="block text-[10px] font-medium text-gray-600 mb-2">
              New password
            </label>

            <div className="relative">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                🔒
              </span>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                className="w-full h-9 border border-gray-200 rounded-lg px-8 text-[10px] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
              />

            </div>

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block text-[10px] font-medium text-gray-600 mb-2">
              Confirm password
            </label>

            <div className="relative">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                🔒
              </span>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
                className="w-full h-9 border border-gray-200 rounded-lg px-8 text-[10px] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
              />

            </div>

          </div>

          {/* Reset Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-9 bg-[#10a878] hover:bg-[#0d966a] text-white text-[10px] font-medium rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        {/* Back Login */}
        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-[10px] text-green-600 font-medium hover:underline"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

