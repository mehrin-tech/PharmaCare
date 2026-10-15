import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import logo from "../../assets/logo.png";






export function ForgotPassword(){

    const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Backend endpoint available aanenkil ivide connect cheyyam
      const response = await api.post("/auth/forgot-password", {
        email,
      });

      setMessage(
        response.data.message ||
          "Password reset instructions have been sent to your email."
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
    return(
          <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] px-9 py-9">

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="PharmaCare logo"
              className="w-[25px] h-[25px] object-contain"
            />

            <span className="text-[18px] font-semibold text-[#102a43]">
              Pharma<span className="text-[#0aa678]">Care</span>
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-[21px] font-bold text-gray-800">
            Forgot password?
          </h1>

          <p className="text-[10px] text-gray-500 mt-2 leading-4">
            Enter your email address and we'll help you
            <br />
            reset your password.
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
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-[10px] font-medium text-gray-600 mb-2">
              Email address
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                ✉
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full h-9 border border-gray-200 rounded-lg px-8 text-[10px] outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-9 bg-[#10a878] hover:bg-[#0d966a] text-white text-[10px] font-medium rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {/* Back to Login */}
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
    )
}