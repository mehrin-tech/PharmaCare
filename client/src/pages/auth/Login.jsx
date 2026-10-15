
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  HeartPulse,
} from "lucide-react";

import api from "../../services/api";
import logo from "../../assets/logo.png";
import loginImage from "../../assets/bannerRegisterPharma.png";

import { setCredentials } from "../../redux/slices/authSlice";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const getDashboardPath = (user) => {
    switch (user?.role) {
      case "customer":
        return "/home";

      case "pharmacy":
        // Use your actual pharmacy dashboard route.
        if (user.approvalStatus === "pending") {
          return "/pharmacy/registration-status";
        }
        return "/pharmacy/dashboard";

      case "admin":
        return "/admin/dashboard";

      default:
        return "/home";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!response.data.success) {
        setError(response.data.message || "Login failed.");
        return;
      }

      const { user, token } = response.data;

      if (!user || !token) {
        setError("Invalid login response from server.");
        return;
      }

      // Pharmacy approval must also be enforced by the backend.
      if (
        user.role === "pharmacy" &&
        user.approvalStatus &&
        user.approvalStatus !== "approved"
      ) {
        dispatch(setCredentials({ user, token }));

        navigate("/pharmacy/registration-status", {
          replace: true,
        });

        return;
      }

      dispatch(
        setCredentials({
          user,
          token,
        })
      );

      navigate(getDashboardPath(user), {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-12 w-full rounded-lg border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-50";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F7F6] px-4 py-8 sm:px-6">
      <div className="grid w-full max-w-[1100px] overflow-hidden rounded-[22px] bg-white shadow-[0_12px_40px_rgba(15,80,54,0.09)] md:min-h-[600px] md:grid-cols-2">

        {/* LEFT IMAGE PANEL */}
        <div className="relative hidden flex-col bg-[#EFFCF4] md:flex">
          {/* Brand */}
          <Link
            to="/"
            className="absolute left-10 top-10 z-10 flex items-center gap-3"
          >
            <img
              src={logo}
              alt="PharmaCare logo"
              className="h-9 w-9 object-contain"
            />

            <span className="text-2xl font-bold tracking-tight text-[#102A43]">
              Pharma
              <span className="text-[#0F9D74]">Care</span>
            </span>
          </Link>

          {/* Illustration */}
          <div className="flex flex-1 items-center justify-center p-8 pt-20">
            <img
              src={loginImage}
              alt="PharmaCare healthcare products"
              className="max-h-[420px] w-full max-w-[440px] object-contain"
            />
          </div>
        </div>

        {/* RIGHT LOGIN PANEL */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-12 md:px-12 lg:px-16">
          <div className="w-full max-w-[440px]">

            {/* Mobile brand */}
            <Link
              to="/"
              className="mb-8 flex items-center gap-2 md:hidden"
            >
              <img
                src={logo}
                alt="PharmaCare logo"
                className="h-8 w-8 object-contain"
              />

              <span className="text-xl font-bold text-[#102A43]">
                Pharma
                <span className="text-[#0F9D74]">Care</span>
              </span>
            </Link>

            {/* Heading */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-950">
              Welcome back!
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to continue your account
            </p>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mt-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    required
                    disabled={loading}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={19}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-emerald-600"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                <div className="mt-3 text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-[#0F9D74] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-[#0F9D74] text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B8964] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Registration */}
            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#0F9D74] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
