"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccessButton from "./AccessButton";
import AccessCard from "./AccessCard";

export default function AccessForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    visitorType: "",
    firstName: "",
    lastName: "",
    phone: "",
    vehicles: "",
    plate: "",
    noOfPersons: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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
      // simulate API/database call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccessMsg("Access code generated successfully!");

      // build query params
      const queryParams = new URLSearchParams({
        visitorType: formData.visitorType || "Guest",
        visitorsCount: formData.noOfPersons || "1",
        plateNumber: formData.plate,
        name: `${formData.firstName} ${formData.lastName}`,
      });

      setTimeout(() => {
        router.push(`/code?${queryParams.toString()}`);
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen justify-center px-4 py-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[327px]">
        <AccessCard />

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
              required
              placeholder="First Name"
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-bold"
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
              required
              placeholder="Last Name"
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-bold"
            />
          </label>
        </div>

        {/* Phone */}
        <label className="block text-[12px]">
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
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-bold"
          />
        </label>

        {/* Number of persons */}
        <label className="block text-[12px]">
          <span className="block mb-1">
            No. of persons <span className="text-red-500">*</span>
          </span>
          <input
            type="number"
            name="noOfPersons"
            value={formData.noOfPersons}
            onChange={handleChange}
            required
            placeholder="0"
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-bold"
          />
        </label>

        {/* Visitor Type */}
        <label className="block text-[12px]">
          <span className="block mb-1">
            Visitor Type <span className="text-red-500">*</span>
          </span>
          <select
            name="visitorType"
            value={formData.visitorType}
            onChange={handleChange}
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select</option>
            <option value="Guest">Guest</option>
            <option value="Dispatch">Dispatch</option>
            <option value="Cab">Cab</option>
            <option value="Artisan">Artisan</option>
          </select>
        </label>

        {/* Vehicles */}
        <label className="block text-[12px]">
          <span className="block mb-1">
            Coming Vehicles <span className="text-red-500">*</span>
          </span>
          <select
            name="vehicles"
            value={formData.vehicles}
            onChange={handleChange}
            required
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        {/* Plate Number */}
        <label className="block text-[12px]">
          <span className="block mb-1">
            Plate number <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            pattern="[A-Za-z0-9]+"
            name="plate"
            value={formData.plate}
            onChange={handleChange}
            required
            placeholder="Plate Number"
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-bold"
          />
        </label>

        {/* Submit button */}
        <AccessButton
          label={loading ? "Generating..." : "Generate access code"}
          disabled={loading}
        />

        {/* Success message */}
        {successMsg && (
          <p className="text-green-600 text-center mt-2 w-[327px] font-medium">
            {successMsg}
          </p>
        )}
      </form>
    </div>
  );
}
