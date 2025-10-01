"use client";

import * as React from "react";

export default function DropdownInput() {
  const [selected, setSelected] = React.useState("");   // value inside input
  const [open, setOpen] = React.useState(false);

  const options = ["Guest", "Dispatch", "Cab", "Artisan"];

  return (
    <div className="relative w-[327px] ">
     <span className="text-12px">Visitor Type:</span>
      <input
        type="text"
        value={selected}
        placeholder="Guest"
        readOnly
        onClick={() => setOpen(!open)}
        className="w-full
                   border border-[#EDF1F3]
                   rounded-[10px]
                   bg-white text-[#313F57]
                   text-base font-medium h-[46px]
                   px-[14px] py-[27px]
                   cursor-pointer"
      />

      {/* Arrow Icon */}
      <svg
        onClick={() => setOpen(!open)}
        className={`absolute right-4 top-2/3 -translate-y-1/2 h-5 w-5 text-[#000000] cursor-pointer transition-transform duration-200 ${open ? "rotate-180" : ""
          }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>

      {/* Dropdown List */}
      {open && (
        <div
          className="absolute mt-2 w-[327px]
                     bg-white rounded-[10px]
                     border border-[#EDF1F3]
                     shadow-md z-10
                     flex flex-col gap-[10px]
                     px-[14px] py-[19px]"
          style={{ height: "145px" }}
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="text-left text-[#313F57] text-base hover:text-[#DF4F3A] transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
