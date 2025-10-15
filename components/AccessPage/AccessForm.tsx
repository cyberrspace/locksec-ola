"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccessButton from "./AccessButton";
import AccessCard from "./AccessCard";
import { ChevronDown } from "lucide-react";


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

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMsg("Access code generated successfully!");

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
    <div className="flex items-start justify-center px-4 py-4 mt-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[327px]">
        

        {/* Visitor Type Dropdown (pushes down items below) */}
        <AccessCard onSelect={(val) => handleChange("visitorType", val)} />

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
              onChange={(e) => handleChange("firstName", e.target.value)}
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
              onChange={(e) => handleChange("lastName", e.target.value)}
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
            onChange={(e) => handleChange("phone", e.target.value)}
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
            onChange={(e) => handleChange("noOfPersons", e.target.value)}
            required
            placeholder="0"
            className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-bold"
          />
        </label>

        {/* Coming Vehicles */}
        <div className="block text-[12px]">
          <span className="block mb-1">
            Coming Vehicles <span className="text-red-500">*</span>
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenDropdown(openDropdown === "vehicles" ? null : "vehicles")
              }
              className="w-full h-[47px] px-3 pr-10 border rounded-md text-left 
                         flex justify-between items-center focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <span>{formData.vehicles ? formData.vehicles : "Select"}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${openDropdown === "vehicles" ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown pushes down below items */}
            <div
              className={`transition-all duration-300 overflow-hidden ${openDropdown === "vehicles" ? "max-h-32 mt-2 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              {openDropdown === "vehicles" && (
                <div className="border rounded-md bg-white shadow-md">
                  {["Yes", "No"].map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        handleChange("vehicles", option);
                        setOpenDropdown(null);
                      }}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plate Number (shows only if "Yes") */}
        {formData.vehicles === "Yes" && (
          <label className="block text-[12px]">
            <span className="block mb-1">
              Plate number <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              pattern="[A-Za-z0-9]+"
              name="plate"
              value={formData.plate}
              onChange={(e) => handleChange("plate", e.target.value)}
              required
              placeholder="Plate Number"
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-bold"
            />
          </label>
        )}

        {/* Submit Button */}
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
