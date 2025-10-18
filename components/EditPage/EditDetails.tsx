"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import RadioButton from "./RadioButton";
import IndustrySelect from "./IndusrtrySelect";
import UpdateButton from "./UpdateButton";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    moveInDate: "",
    address: "",
    password: "",
    userType: "Resident",
    businessName: "",
    industry: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setFormData((prev) => ({
        ...prev,
        ...parsed,
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      let savedLastName = formData.lastName.trim();
      let code = "";

      if (formData.userType === "Business Owner") {
        code = Math.floor(100000 + Math.random() * 900000).toString();
        savedLastName = `${savedLastName}-${code}`;
      }

      const updatedUser = {
        ...formData,
        lastName: savedLastName,
      };

      localStorage.setItem("userData", JSON.stringify(updatedUser));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMsg("Profile updated successfully!");

      setTimeout(() => {
        router.push("/user");
      }, 1500);
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-[327px] sm:max-w-md md:max-w-lg lg:max-w-xl 
                   px-0 sm:px-2 md:px-4 py-6 mx-auto"
      >
        {/* First & Last Name */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <label className="block text-[12px] flex-1">
            <span className="block mb-1">
              First Name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 
                         focus:ring-blue-500"
            />
          </label>

          <label className="block text-[12px] flex-1">
            <span className="block mb-1">
              Last Name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 
                         focus:ring-blue-500"
            />
          </label>
        </div>

        {/* Email */}
        <label className="block text-[12px] w-full">
          <span className="block mb-1">
            Email Address <span className="text-red-500">*</span>
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 
                       focus:ring-blue-500"
          />
        </label>

        {/* Phone */}
        <label className="block text-[12px] w-full">
          <span className="block mb-1">
            Phone Number <span className="text-red-500">*</span>
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 
                       focus:ring-blue-500"
          />
        </label>

        {/* Move-in Date */}
        <label htmlFor="moveInDate" className="block text-[12px] w-full">
          <span className="block mb-1">
            Move-in Date <span className="text-red-500">*</span>
          </span>
          <input
            id="moveInDate"
            type="date"
            name="moveInDate"
            value={formData.moveInDate}
            onChange={handleChange}
            required
            className="w-full h-[47px] px-3 pr-10 border rounded-md focus:ring-2 
                       focus:ring-blue-500"
          />
        </label>

        {/* Address */}
        <label className="block text-[12px] w-full">
          <span className="block mb-1">
            Address <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 
                       focus:ring-blue-500"
          />
        </label>

        {/* Radio Buttons */}
        <RadioButton
          value={formData.userType}
          onChange={(value) => setFormData((p) => ({ ...p, userType: value }))}
        />

        {formData.userType === "Business Owner" && (
          <>
            <label className="block text-[12px] w-full">
              <span className="block mb-1">
                Business Name <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                placeholder="Business Name"
                className="w-full h-[47px] px-3 border rounded-md focus:ring-2 
                           focus:ring-blue-500"
              />
            </label>

            <IndustrySelect
              value={formData.industry}
              onChange={(val: string) =>
                setFormData((p) => ({ ...p, industry: val }))
              }
            />
          </>
        )}

        {/* Password */}
        <label className="block text-[12px] relative w-full">
          <span className="block mb-1">
            Set password <span className="text-red-500">*</span>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Set Password"
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 
                       focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>

        {/* Update Button */}
        <UpdateButton
          label={loading ? "Updating..." : "Update"}
          disabled={loading}
        />

        {successMsg && (
          <p className="text-green-600 text-center mt-2 w-full font-medium">
            {successMsg}
          </p>
        )}
      </form>
    </div>
  );
}
