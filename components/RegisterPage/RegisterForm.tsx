"use client";

import { useState } from "react";
import { Calendar, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import RadioButton from "./RadioButton";
import RegisterButton from "./RegisterButton";

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
    userType: "",
    businessName: "",
    industry: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Registration successful!");
    router.push("/user");
  };

  return (
    <div className="flex items-center  min-h-screen justify-center px-4 py-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[327px]">
        {/* First & Last Name */}
        <div className="flex gap-4 w-full">
          <label className="block text-[12px] w-[155px]">
            <span className="block mb-1">
              First Name <span className="text-red-500">*</span>
            </span>
          
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block text-[12px] w-[155px]">
            <span className="block mb-1">
              Last Name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <label className="block text-[12px]">
          <span className="block mb-1">
            Email Address <span className="text-red-500">*</span>
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block text-[12px]">
          <span className="block mb-1">
            Phone Number: <span className="text-red-500">*</span>
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Move-in Date */}
        <div className="relative w-full">
          <label className="block text-[12px]">
            <span className="block mb-1">
            Move-in-date: <span className="text-red-500">*</span>
            </span>
            <input
              type="date"
              name="moveInDate"
              value={formData.moveInDate}
              onChange={handleChange}
              required
              className="w-full h-[47px] border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <Calendar className="absolute right-3 top-10 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>

        <label className="block text-[12px]">
          <span className="block mb-1">
           Address: <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Radio Buttons */}
        <RadioButton
          value={formData.userType}
          onChange={(value) => setFormData((p) => ({ ...p, userType: value }))}
        />

        {/* Conditional Business Inputs */}
        {formData.userType === "Business Owner" && (
          <>
            <label className="block text-[12px]">
              <span className="block mb-1">
                Bussiness Name: <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                required
                className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block text-[12px]">
              <span className="block mb-1">
                Industry: <span className="text-red-500">*</span>
              </span>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Industry</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Food">Food</option>
              </select>
            </label>
          </>
        )}

        {/* Password with Eye Icon */}
        <label className="block text-[12px] relative">
          <span className="block mb-1">
           Set password: <span className="text-red-500">*</span>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Set Password"
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>

        <RegisterButton label="Register" />
      </form>
    </div>
  );
}
