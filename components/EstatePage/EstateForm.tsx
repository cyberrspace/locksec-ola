"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EstatePaymentForm() {
  const router = useRouter();

  const [selectedBills, setSelectedBills] = useState<string[]>([]);
  const [months, setMonths] = useState("1");
  const [amount, setAmount] = useState(28000); // default for 1 month
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const monthlyRate = 28000; // fixed monthly subscription

  const handleCheckboxChange = (bill: string) => {
    setSelectedBills((prev) =>
      prev.includes(bill) ? prev.filter((item) => item !== bill) : [...prev, bill]
    );
  };

  const handleMonthsChange = (value: string) => {
    setMonths(value);
  };

  useEffect(() => {
    // Only depend on months now
    setAmount(Number(months) * monthlyRate);
  }, [months]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/summary?bills=${encodeURIComponent(
        selectedBills.join(", ")
      )}&months=${months}&amount=${amount}`
    );
  };

  return (
    <div className="flex justify-center items-center  ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4  flex flex-col gap-4 w-[350px]"
      >
        {/* Estate Bill Selection */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Estate Bill</label>
          <div
            className="border rounded-md px-3 flex items-center justify-between cursor-pointer w-[327px] h-[46px]"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>
              {selectedBills.length > 0
                ? selectedBills.join(", ")
                : "Select bills"}
            </span>
            <span className="text-gray-500">{dropdownOpen ? "▲" : "▼"}</span>
          </div>
          {dropdownOpen && (
            <div className="absolute bg-white border rounded-md shadow-md mt-1 w-[327px] p-2 z-10">
              {["Estate dues", "Utility (Water)", "Project", "Others"].map(
                (bill) => (
                  <label key={bill} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedBills.includes(bill)}
                      onChange={() => handleCheckboxChange(bill)}
                    />
                    <span>{bill}</span>
                  </label>
                )
              )}
            </div>
          )}
        </div>

        {/* Months Selection */}
        <div>
          <label className="block text-sm font-medium mb-1 ">Month(s)</label>
          <select
            value={months}
            onChange={(e) => handleMonthsChange(e.target.value)}
            className="border rounded-md px-4 w-[327px] h-[46px] pr-8"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Amount Payable */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Amount Payable
          </label>
          <input
            type="text"
            value={`₦${amount.toLocaleString()}`}
            readOnly
            className="border rounded-md px-3 w-[327px] h-[46px] bg-gray-100 font-bold"
          />
        </div>

        {/* Submit */}

        <div className="mt-[8rem]">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md w-[327px] h-[46px] hover:bg-blue-700 "
          >
            Make Payment
          </button>

          <div className=" flex justify-center mt-4">
            <div className="w-[148px] h-[5px] bg-[#000000]" />
          </div>
        </div>
        
      </form>
    </div>
  );
}
