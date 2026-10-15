import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    Calendar,
    Camera
} from "lucide-react";
import api from "../../../services/api";

const PersonalInfo = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        bloodGroup: "",
        gender: "",
        preferredLanguage: "",
        profilePhoto: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);

    // =========================
    // FETCH PROFILE
    // =========================
    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/profile");

            const user = response.data.profile.user;

            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                dateOfBirth: user.dateOfBirth
                    ? user.dateOfBirth.substring(0, 10)
                    : "",
                bloodGroup: user.bloodGroup || "",
                gender: user.gender || "",
                preferredLanguage: user.preferredLanguage || "",
                profilePhoto: user.profilePhoto || ""
            });

        } catch (err) {

            console.error("Profile fetch error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load profile"
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let active = true;
        api.get("/profile").then((response) => {
            if (!active) return;
            const user = response.data.profile.user;
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : "",
                bloodGroup: user.bloodGroup || "",
                gender: user.gender || "",
                preferredLanguage: user.preferredLanguage || "",
                profilePhoto: user.profilePhoto || ""
            });
        }).catch((err) => {
            console.error("Profile fetch error:", err);
            if (active) setError(err.response?.data?.message || "Failed to load profile");
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, []);


    // =========================
    // INPUT CHANGE
    // =========================
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // =========================
    // SAVE PROFILE
    // =========================
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setMessage("");
            setError("");


            const data = new FormData();

            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);

            if (profilePhoto) {
                data.append("profilePhoto", profilePhoto);
            }

            const response = await api.patch(
                "/profile/customer",
                data
               
            );

            setMessage(
                response.data.message ||
                "Profile updated successfully"
            );

            window.dispatchEvent(
    new Event("profileUpdated")
);
        } catch (err) {

            console.error("Profile update error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to update profile"
            );

        } finally {
            setSaving(false);
        }
    };


    // =========================
    // CANCEL
    // =========================
    const handleCancel = () => {
        fetchProfile();
        setMessage("");
        setError("");
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }


    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6">

            <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
            </h2>


            {/* SUCCESS */}
            {message && (
                <div className="mb-5 p-3 rounded-lg bg-green-50 text-green-600 text-sm">
                    {message}
                </div>
            )}


            {/* ERROR */}
            {error && (
                <div className="mb-5 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                    {error}
                </div>
            )}


            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                    {/* FULL NAME */}
                    <div>

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Full Name
                        </label>

                        <div className="relative">

                            <User
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full h-11 border border-gray-200 rounded-lg pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
                                placeholder="Enter your name"
                            />

                        </div>

                    </div>


                    {/* DATE OF BIRTH */}
                    <div>

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Date of Birth
                        </label>

                        <div className="relative">

                            <Calendar
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="w-full h-11 border border-gray-200 rounded-lg pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
                            />

                        </div>

                    </div>


                    {/* EMAIL */}
                    <div>

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Email Address
                        </label>

                        <div className="relative">

                            <Mail
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}

                                className="w-full h-11 border border-gray-200 rounded-lg pl-10 pr-4 text-sm bg-gray-50 text-gray-500"
                            />

                        </div>

                    </div>


                    {/* BLOOD GROUP */}
                    <div>

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Blood Group
                        </label>

                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm outline-none focus:border-emerald-500"
                        >

                            <option value="">
                                Select Blood Group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>

                        </select>

                    </div>


                    {/* PHONE */}
                    <div>

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Phone Number
                        </label>

                        <div className="relative">

                            <Phone
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full h-11 border border-gray-200 rounded-lg pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
                                placeholder="Enter phone number"
                            />

                        </div>

                    </div>


                    {/* PROFILE PHOTO */}
                    <div>

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Profile Photo
                        </label>

                        <label className="h-11 border border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:border-emerald-500">

                            <Camera
                                size={17}
                                className="text-gray-400"
                            />

                            <span className="text-sm text-gray-500">
                                Upload Photo
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                 onChange={(e) => {
        setProfilePhoto(e.target.files[0]);
    }}
                            />

                        </label>

                    </div>


                    {/* GENDER */}
                    <div>

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Gender
                        </label>

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm outline-none focus:border-emerald-500"
                        >

                            <option value="">
                                Select Gender
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* LANGUAGE */}
                    <div>

                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Preferred Language
                        </label>

                        <select
                            name="preferredLanguage"
                            value={formData.preferredLanguage}
                            onChange={handleChange}
                            className="w-full h-11 border border-gray-200 rounded-lg px-4 text-sm outline-none focus:border-emerald-500"
                        >

                            <option value="">
                                Select Language
                            </option>

                            <option value="English">
                                English
                            </option>

                            <option value="Malayalam">
                                Malayalam
                            </option>

                            <option value="Hindi">
                                Hindi
                            </option>

                        </select>

                    </div>

                </div>


                {/* BUTTONS */}
                <div className="flex justify-center gap-3 mt-8">

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white px-8 py-2.5 rounded-lg text-sm font-medium"
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>


                    <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-gray-200 hover:bg-gray-50 px-8 py-2.5 rounded-lg text-sm font-medium"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
};

export default PersonalInfo;
