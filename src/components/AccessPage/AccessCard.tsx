"use client";

import * as React from "react";

export default function DropdownInput({ onSelect }: { onSelect: (val: string) => void }) {
  const [selected, setSelected] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const options = ["Guest", "Dispatch", "Cab", "Artisan"];

  return (
    <div className="w-full max-w-[327px] sm:w-[327px] mb-2 px-2 sm:px-0">
      {/* Label */}
      <span className="text-[12px] sm:text-[13px] block mb-1">
        Visitor Type <span className="text-red-500">*</span>
      </span>

      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={selected}
          placeholder="Select visitor type"
          readOnly
          onClick={() => setOpen(!open)}
          className="w-full border border-[#EDF1F3] rounded-[10px]
                     bg-white text-[#313F57] text-sm sm:text-base font-medium
                     h-[42px] sm:h-[46px] px-[12px] sm:px-[14px] cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Arrow Icon */}
        <svg
          onClick={() => setOpen(!open)}
          className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 
                      text-[#000000] cursor-pointer transition-transform duration-200
                      ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`transition-all duration-300 overflow-hidden ${open ? "max-h-48 mt-2 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        {open && (
          <div
            className="border border-[#EDF1F3] rounded-[10px] bg-white 
                       shadow-md flex flex-col gap-[8px] sm:gap-[10px] 
                       px-[12px] sm:px-[14px] py-[15px] sm:py-[19px]"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSelected(option);
                  onSelect(option);
                  setOpen(false);
                }}
                className="text-left text-[#313F57] text-sm sm:text-base 
                           hover:text-[#b19a96] transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
