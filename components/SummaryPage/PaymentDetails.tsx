"use client";

import { useSearchParams, useRouter } from "next/navigation";
import PayLine from "./PayLine";
import { useState } from "react";

export default function PaymentDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");

  const bills = searchParams.get("bills") || "";
  const apartment = searchParams.get("apartment") || "";
  const months = Number(searchParams.get("months")) || 0;

  const monthlyRate = 28000;
  const serviceCharge = 100;
  const monthsAmt = months * monthlyRate;
  const totalAmt = monthsAmt + serviceCharge;

  const handlePayment = () => {
    if (!bills || !apartment || months <= 0) {
      setError("Please fill all payment details correctly before proceeding.");
      return;
    }

    // Proceed to success page
    router.push(`/success?amount=${totalAmt}`);
  };

  return (
    <section className="min-h-screen bg-[#FFFFFF] flex flex-col justify-between px-4 py-10">
      {/* Top content */}
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">Type of Bill</p>
            <p className="text-[#1A1C1E]">{bills || "N/A"}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">Apartment</p>
            <p className="text-[#1A1C1E]">{apartment || "N/A"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">NO. of Month(s)</p>
            <p className="text-[#1A1C1E]">{months || "N/A"}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">{months} Months Amt.</p>
            <p className="text-[#1A1C1E]">₦{monthsAmt.toLocaleString()}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">Service Charge</p>
            <p className="text-[#1A1C1E]">₦{serviceCharge.toLocaleString()}</p>
          </div>
        </div>

        <PayLine />

        <div className="flex justify-between items-center mt-10">
          <p className="text-[#6C7278]">Total Amt.</p>
          <p className="text-[#1A1C1E]">₦{totalAmt.toLocaleString()}</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>

      {/* Bottom content (button + line) */}
      <div>
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white rounded-md w-[327px] h-[46px] hover:bg-blue-700"
        >
          Make Payment
        </button>

        <div className="flex justify-center mt-4">
          <div className="w-[148px] h-[3px] bg-[#000000]" />
        </div>
      </div>
    </section>
  );
}
