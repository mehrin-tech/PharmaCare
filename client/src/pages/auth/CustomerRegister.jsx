// import { useState } from "react"
// import {Link,useNavigate} from 'react-router-dom'
// import bannerImage from '../../assets/bannerRegisterPharma.png'
// import logo from '../../assets/logo.png'
// import api from "../../services/api";
// import {User} from 'lucide-react'
// export function CustomerRegister(){

//     const navigate=useNavigate()

//     const [formData,setFormData]=useState({
//         name:"",
//         emai:"",
//         phone:"",
//         password:"",
//     })
//     const [loading,setLoading]=useState(false)
//     const [error,setError]=useState("")

//     const handleChange=(e)=>{
//         setFormData({
//             ...formData,
//             [e.target.name]:e.target.value
//         })
//     }

//     const handleSubmit=async(e)=>{
//         e.preventDefault()
//         setError("")
//         setLoading(true)

//         try{
//             const response=await api.post("/auth/register",formData)

//             if(response.data.success){
//                 navigate("/login")
//             }
//         }catch(error){
//             setError(error.response?.data?.message || "Registration failed. Please try again.")
//         }finally{
//             setLoading(false)
//         }
//     }
//     return(
//         <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
//             <div  className="w-full max-w-[730px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden flex">
//                 <div className="w-[42%] bg-[#effcf4] flex items-center justify-center p-6">
//                   <div className="text-center">
//                      <img
//               src={bannerImage}
//               alt="PharmaCare"
//               className="w-[220px] object-contain"
//             />

//                   </div>

//                 </div>
//                  <div className="w-[58%] px-8 py-7">

//           {/* Heading */}
//           <div className="mb-5">

//             <div className="flex items-center gap-2 mb-3">
//               <img src={logo}    alt="PharmaCare"  className="w-[22px] h-[22px] object-contain"/>

//               <span className="text-[16px] font-semibold text-[#102a43]">
//                 Pharma<span className="text-[#0aa678]">Care</span>
//               </span>
//             </div>

//             <h1 className="text-[20px] font-bold text-gray-800">
//               Create your account
//             </h1>

//             <p className="text-[10px] text-gray-500 mt-1">
//               Sign up & start your journey
//               <br />
//               towards better health.
//             </p>

//           </div>

//           {/* Error */}
//           {error && (
//             <div className="bg-red-50 text-red-500 text-[11px] px-3 py-2 rounded mb-3">
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-2.5">

//             {/* Name */}
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px]">
//                 👤
//               </span>

//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Full name"
//                 required
//                 className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
//               />
//             </div>

//             {/* Email */}
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
//                 ✉
//               </span>

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email address"
//                 required
//                 className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
//               />
//             </div>

//             {/* Phone */}
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
//                 ☎
//               </span>

//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone number"
//                 required
//                 className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
//                 🔒
//               </span>

//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//                 className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
//               />
//             </div>

//             {/* Confirm Password - UI only */}
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
//                 🔒
//               </span>

//               <input
//                 type="password"
//                 placeholder="Confirm password"
//                 required
//                 className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
//               />
//             </div>

//             {/* Register */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-8 mt-1 bg-[#10a878] hover:bg-[#0d966a] text-white text-[10px] font-medium rounded transition disabled:opacity-50"
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>

//           </form>

//           {/* Login */}
//           <p className="text-center text-[9px] text-gray-500 mt-4">
//             Already have an account?{" "}

//             <Link
//               to="/login"
//               className="text-green-600 font-semibold hover:underline"
//             >
//               Login
//             </Link>
//           </p>

//         </div>

               

                
//             </div>
           
//         </div>
//     )
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  HeartPulse,
  UserRound,
  Phone,
} from "lucide-react";

import api from "../../services/api";
import logo from "../../assets/logo.png";
import registerImage from "../../assets/bannerRegisterPharma.png";

export function CustomerRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: "customer",
      });

      if (!response.data?.success) {
        setError(response.data?.message || "Registration failed.");
        return;
      }

      setSuccess("Account created successfully. You can now log in.");
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] md:min-h-[668px] md:grid-cols-2">
        {/* Image panel */}
        <div className="relative hidden items-center justify-center bg-emerald-50 p-10 md:flex lg:p-12">
          <Link
            to="/"
            aria-label="PharmaCare home"
            className="absolute left-12 top-12 flex items-center gap-2"
          >
            <img src={logo} alt="PharmaCare" className="h-9 w-auto" />
             <span className="text-[17px] font-bold tracking-tight text-gray-800">
    Pharma<span className="text-emerald-600">Care</span>
  </span>
          </Link>

          <img
            src={registerImage}
            alt="PharmaCare products"
            className="max-h-[440px] w-full max-w-[480px] object-contain"
          />
          
         
        </div>

        {/* Form panel */}
        <div className="flex items-center justify-center px-6 py-8 sm:px-10 md:px-12 lg:px-[72px]">
          <div className="w-full max-w-[470px]">
        

            <header className="mb-7">
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Sign up to get started with PharmaCare.
              </p>
            </header>

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              >
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="relative block">
                <span className="sr-only">Full name</span>
                <UserRound
                  size={18}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  autoComplete="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className={inputClass}
                />
              </label>

              <label className="relative block">
                <span className="sr-only">Email address</span>
                <Mail
                  size={18}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  autoComplete="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={inputClass}
                />
              </label>

              <label className="relative block">
                <span className="sr-only">Phone number</span>
                <Phone
                  size={18}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  autoComplete="tel"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className={inputClass}
                />
              </label>

              <label className="relative block">
                <span className="sr-only">Password</span>
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  autoComplete="new-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </label>

              <label className="relative block">
                <span className="sr-only">Confirm password</span>
                <LockKeyhole
                  size={18}
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  autoComplete="new-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  aria-invalid={
                    formData.confirmPassword.length > 0 &&
                    formData.password !== formData.confirmPassword
                  }
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((visible) => !visible)
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}