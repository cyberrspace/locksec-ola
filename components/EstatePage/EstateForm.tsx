"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EstatePaymentForm() {
  const router = useRouter();

  const [selectedBills, setSelectedBills] = useState<string[]>([]);
  const [months, setMonths] = useState("1");
  const [amount, setAmount] = useState(28000); // default for 1 month
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [apartment, setApartment] = useState("Apt 12B Road M");

  const monthlyRate = 28000; // fixed monthly subscription

  const handleCheckboxChange = (bill: string) => {
    setSelectedBills((prev) =>
      prev.includes(bill)
        ? prev.filter((item) => item !== bill)
        : [...prev, bill]
    );
  };

  const handleMonthsChange = (value: string) => {
    setMonths(value);
  };

  useEffect(() => {
    setAmount(Number(months) * monthlyRate);
  }, [months]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/summary?bills=${encodeURIComponent(
        selectedBills.join(", ")
      )}&months=${months}&amount=${amount}&apartment=${encodeURIComponent(
        apartment
      )}`
    );
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-white px-4 sm:px-6 md:px-8 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-[95%] sm:max-w-[450px] md:max-w-[500px]
                   p-4 sm:p-6 flex flex-col gap-4 rounded-lg shadow-sm"
      >
        {/* Estate Bill Selection */}
        <div className="relative w-full">
          <label className="block text-sm sm:text-base font-medium mb-1">
            Estate Bill
          </label>
          <div
            className="border rounded-md px-3 flex items-center justify-between cursor-pointer w-full h-[46px] text-sm sm:text-base"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="truncate max-w-[80%] sm:max-w-full">
              {selectedBills.length > 0
                ? selectedBills.join(", ")
                : "Select bills"}
            </span>
            <span className="text-gray-500 text-xs sm:text-base">
              {dropdownOpen ? "▲" : "▼"}
            </span>
          </div>
          {dropdownOpen && (
            <div className="absolute bg-white border rounded-md shadow-md mt-1 w-full p-2 z-10 max-h-40 overflow-y-auto">
              {["Estate dues", "Utility (Water)", "Project", "Others"].map(
                (bill) => (
                  <label
                    key={bill}
                    className="flex items-center gap-2 mb-2 text-xs sm:text-sm md:text-base"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBills.includes(bill)}
                      onChange={() => handleCheckboxChange(bill)}
                    />
                    <span className="truncate">{bill}</span>
                  </label>
                )
              )}
            </div>
          )}
        </div>

        {/* Apartment Selection */}
        <div className="w-full">
          <label className="block text-sm sm:text-base font-medium mb-1">
            Apartment
          </label>
          <input
            type="text"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            className="border rounded-md px-3 w-full h-[46px] text-sm sm:text-base"
          />
        </div>

        {/* Months Selection */}
        <div className="w-full">
          <label className="block text-sm sm:text-base font-medium mb-1">
            Month(s)
          </label>
          <select
            value={months}
            onChange={(e) => handleMonthsChange(e.target.value)}
            className="border rounded-md px-3 w-full h-[46px] text-sm sm:text-base pr-8"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Payable */}
        <div className="w-full">
          <label className="block text-sm sm:text-base font-medium mb-1">
            Amount Payable
          </label>
          <input
            type="text"
            value={`₦${amount.toLocaleString()}`}
            readOnly
            className="border rounded-md px-3 w-full h-[46px] bg-gray-100 font-semibold text-sm sm:text-base"
          />
        </div>

        {/* Submit */}
        <div className="mt-12 sm:mt-16">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md w-full h-[46px] text-sm sm:text-base hover:bg-blue-700 transition-colors"
          >
            Make Payment
          </button>
        </div>
      </form>
    </div>
  );
}
