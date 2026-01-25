"use client";

import { useSearchParams, useRouter } from "next/navigation";
import PayLine from "../SummaryPage/PayLine";
import { Check } from "lucide-react";

export default function SuccessDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bills = searchParams.get("bills") || "";
  const apartment = searchParams.get("apartment") || "";
  const months = Number(searchParams.get("months")) || 0;

  const monthlyRate = 28000;
  const serviceCharge = 100;
  const monthsAmt = months * monthlyRate;
  const totalAmt = monthsAmt + serviceCharge;

  return (
    <section className="min-h-screen bg-white flex flex-col justify-between px-4 py-10 sm:px-6 md:px-8">
      {/* ✅ Success Header */}
      <div className="flex flex-col items-center mt-8 space-y-4">
        <div className="bg-[#2ECC71] w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] rounded-full flex justify-center items-center shadow-md">
          <Check className="text-white w-8 h-8 sm:w-9 sm:h-9" />
        </div>
        <p className="text-[#1A1C1E] font-[Rubik] font-medium text-[20px] sm:text-[22px] text-center">
          Payment Successful
        </p>
      </div>

      {/* ✅ Payment Details */}
      <div className="space-y-6 mt-10 text-[14px] sm:text-[15px]">
        {/* Bill & Apartment Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">Type of Bill</p>
            <p className="text-[#1A1C1E] font-medium">{bills || "N/A"}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">Apartment</p>
            <p className="text-[#1A1C1E] font-medium">{apartment || "N/A"}</p>
          </div>
        </div>

        {/* Month & Charges */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">NO. of Month(s)</p>
            <p className="text-[#1A1C1E]">{months || "N/A"}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">{months} Month(s) Amt.</p>
            <p className="text-[#1A1C1E]">₦{monthsAmt.toLocaleString()}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[#6C7278]">Service Charge</p>
            <p className="text-[#1A1C1E]">₦{serviceCharge.toLocaleString()}</p>
          </div>
        </div>

        <PayLine />

        {/* ✅ Total */}
        <div className="flex justify-between items-center mt-8 sm:mt-10">
          <p className="text-[#6C7278]">Total Amt.</p>
          <p className="text-[#1A1C1E] font-semibold text-[16px] sm:text-[17px]">
            ₦{totalAmt.toLocaleString()}
          </p>
        </div>

        <PayLine />
      </div>

      {/* ✅ Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
        <button
          onClick={() => router.push("/estate")}
          className="text-[#375DFB] border border-[#375DFB] rounded-md w-full sm:w-[160px] h-[44px] text-[14px] font-medium hover:bg-[#375DFB] hover:text-white transition"
        >
          Make New Payment
        </button>

        <button
          onClick={() => router.push("/user")}
          className="text-[#375DFB] border border-[#375DFB] rounded-md w-full sm:w-[160px] h-[44px] text-[14px] font-medium hover:bg-[#375DFB] hover:text-white transition"
        >
          Back to Dashboard
        </button>
      </div>
    </section>
  );
}
