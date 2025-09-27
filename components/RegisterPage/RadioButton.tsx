"use client";

import React from "react";

interface RadioButtonProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RadioButton({ value, onChange }: RadioButtonProps) {
  return (
    <div className="w-[327px] flex flex-col gap-2">
      <span className="text-[12px] font-semibold">I am a</span>

      <div className="flex gap-6">
        {/* Resident Radio */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="userType"
            value="Resident"
            checked={value === "Resident"}
            onChange={() => onChange("Resident")}
            className="w-4 h-4 accent-blue-600"
          />
          <span>Resident</span>
        </label>

        {/* Business Owner Radio */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="userType"
            value="Business Owner"
            checked={value === "Business Owner"}
            onChange={() => onChange("Business Owner")}
            className="w-4 h-4 accent-blue-600"
          />
          <span>Business Owner</span>
        </label>
      </div>
    </div>
  );
}
