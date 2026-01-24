"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AccessButton from "./AccessButton";
import AccessCard from "./AccessCard";
import { ChevronDown } from "lucide-react";

import { createAccessCode } from "@/src/services/AccessCodes";

import axios from "axios";

export default function AccessForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    victorType: "",
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
      const payload = {
        victorType: formData.victorType || "Guest",
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phoneNumber: formData.phone.trim(),
        numOfPeople: Number(formData.noOfPersons),
        withVehicle: formData.vehicles === "Yes",
        plateNum:
          formData.vehicles === "Yes" ? formData.plate.trim() : undefined,
      };

      const result = await createAccessCode(payload);

      // ✅ persist for code page
      sessionStorage.setItem(
        "generatedAccessCode",
        JSON.stringify(result.data)
      );

      setSuccessMsg("Access code generated successfully!");

      router.push(`/code/${result.data._id}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to generate access code");
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center px-4 sm:px-6 md:px-8 py-6 w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm sm:max-w-md"
      >
        <AccessCard onSelect={(val) => handleChange("victorType", val)} />

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
              onChange={(e) => handleChange("firstName", e.target.value)}
              required
              placeholder="First Name"
              className="w-full h-[47px] px-3 border rounded-md focus:ring-2 focus:ring-blue-500 font-bold"
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

        {/* Coming Vehicles Dropdown */}
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
              <span>{formData.vehicles || "Select"}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${openDropdown === "vehicles" ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Dropdown menu */}
            <div
              className={`transition-all duration-300 overflow-hidden ${openDropdown === "vehicles"
                ? "max-h-32 mt-2 opacity-100"
                : "max-h-0 opacity-0"
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

        {/* Plate Number (only if Yes) */}
        {
          formData.vehicles === "Yes" && (
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
          )
        }


        <AccessButton
          label={loading ? "Generating..." : "Generate access code"}
          disabled={loading}
        />

        {successMsg && (
          <p className="text-green-600 text-center mt-2 font-medium">
            {successMsg}
          </p>
        )}
      </form>
    </div>
  );
}


// enter

