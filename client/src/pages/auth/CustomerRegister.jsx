import { useState } from "react"
import {Link,useNavigate} from 'react-router-dom'
import bannerImage from '../../assets/bannerRegisterPharma.png'
import logo from '../../assets/logo.png'
import api from "../../services/api";
import {User} from 'lucide-react'
export function CustomerRegister(){

    const navigate=useNavigate()

    const [formData,setFormData]=useState({
        name:"",
        emai:"",
        phone:"",
        password:"",
    })
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState("")

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setError("")
        setLoading(true)

        try{
            const response=await api.post("/auth/register",formData)

            if(response.data.success){
                navigate("/login")
            }
        }catch(error){
            setError(error.response?.data?.message || "Registration failed. Please try again.")
        }finally{
            setLoading(false)
        }
    }
    return(
        <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
            <div  className="w-full max-w-[730px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden flex">
                <div className="w-[42%] bg-[#effcf4] flex items-center justify-center p-6">
                  <div className="text-center">
                     <img
              src={bannerImage}
              alt="PharmaCare"
              className="w-[220px] object-contain"
            />

                  </div>

                </div>
                 <div className="w-[58%] px-8 py-7">

          {/* Heading */}
          <div className="mb-5">

            <div className="flex items-center gap-2 mb-3">
              <img src={logo}    alt="PharmaCare"  className="w-[22px] h-[22px] object-contain"/>

              <span className="text-[16px] font-semibold text-[#102a43]">
                Pharma<span className="text-[#0aa678]">Care</span>
              </span>
            </div>

            <h1 className="text-[20px] font-bold text-gray-800">
              Create your account
            </h1>

            <p className="text-[10px] text-gray-500 mt-1">
              Sign up & start your journey
              <br />
              towards better health.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-500 text-[11px] px-3 py-2 rounded mb-3">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5">

            {/* Name */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px]">
                👤
              </span>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
                required
                className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                ✉
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                ☎
              </span>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                required
                className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                🔒
              </span>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
              />
            </div>

            {/* Confirm Password - UI only */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px]">
                🔒
              </span>

              <input
                type="password"
                placeholder="Confirm password"
                required
                className="w-full h-8 border border-gray-200 rounded px-8 text-[10px] text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-100"
              />
            </div>

            {/* Register */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-8 mt-1 bg-[#10a878] hover:bg-[#0d966a] text-white text-[10px] font-medium rounded transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-[9px] text-gray-500 mt-4">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

               

                
            </div>
           
        </div>
    )
}
