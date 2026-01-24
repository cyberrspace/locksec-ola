"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import RadioButton from "./RadioButton";
import IndustrySelect from "./IndusrtrySelect";

// src/components/RegisterForm.tsx
import { registerUser, RegisterPayload } from "@/src/services/auth";
import { getAxiosErrorMessage } from "@/lib/getAxiosError";


export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    moveInDate: "",
    address: "",
    password: "",
    userType: "",
    businessName: "",
    industryType: "",
    estateId: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Trim last name and add code if business owner
      let lastName = formData.lastName.trim();
      if (formData.userType === "Business Owner"){
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        lastName = `${lastName}-${code}`;
      }

      // Build payload to match backend requirements
      const payload: RegisterPayload & { estateId: string } = {
        firstName: formData.firstName.trim(),
        lastName,
        email: formData.email.trim().toLowerCase(), // ✅ FIXED
        address: formData.address.trim(),
        password: formData.password.trim(), // ✅ FIXED
        role:
          formData.userType === "Business Owner"
            ? "businessOwner"
            : "resident",
        phoneNumber: formData.phoneNumber.trim(),
        moveInDate: new Date(formData.moveInDate).toISOString(),
        estateId: "69340ee5effdc922c7c156ea",

        ...(formData.userType === "Business Owner" && {
          businessName: formData.businessName.trim(),
          industryType: formData.industryType,
        }),
      };



      await registerUser(payload);
      setSuccessMsg("Registration successful! Redirecting...");
      setTimeout(() => router.push("/Email"), 1500);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(getAxiosErrorMessage(err, "Registration failed"));
    } finally {
      setLoading(false);
    }

   

  };

  return (
    <div className="flex items-center min-h-screen justify-center px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-[380px] sm:max-w-[420px]"
      >
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}

        {/* First & Last Name */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <label className="block text-[12px] w-full sm:w-1/2">
            First Name *
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block text-[12px] w-full sm:w-1/2">
            Last Name *
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        {/* Email */}
        <label className="block text-[12px]">
          Email Address *
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Phone */}
        <label className="block text-[12px]">
          Phone Number *
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label>
          Estate *
          <select
            name="estateId"
            value={formData.estateId}
            onChange={handleChange}
            required
          >
            <option value="">Select estate</option>
            <option value="estate_1_id">Lakeshore Estate</option>
            <option value="estate_2_id">Riverside Estate</option>
          </select>
        </label>


         {/* Move-in Date */}
        <label className="block text-[12px]">
          Move-in Date *
          <input
            type="date"
            name="moveInDate"
            value={formData.moveInDate}
            onChange={handleChange}
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Address */}
        <label className="block text-[12px]">
          Address *
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* User Type */}
        <RadioButton
          value={formData.userType}
          onChange={(val) => setFormData((p) => ({ ...p, userType: val }))}
        />

        {/* Business Fields */}
        {formData.userType === "Business Owner" && (
          <>
            <label className="block text-[12px]">
              Business Name *
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <IndustrySelect
              value={formData.industryType}
              onChange={(val: string) =>
                setFormData((p) => ({ ...p, industryType: val }))
              }
            />
          </>
        )}

        {/* Password */}
        <label className="block text-[12px] relative">
          Set Password *
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[47px] bg-blue-600 text-white rounded-md font-medium disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
