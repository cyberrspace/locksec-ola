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
    <section className="min-h-screen bg-[#FFFFFF] flex flex-col justify-between px-4 py-10">
      {/* Success Header */}
      <div className="flex flex-col items-center mt-10 space-y-4">
        <div className="bg-[#2ECC71] w-[70px] h-[70px] rounded-full flex justify-center items-center">
          <Check className="text-white w-8 h-8" />
        </div>
        <p className="text-[#1A1C1E] font-[Rubik] font-[400] text-[20.09px] text-center">
          Payment Successful
        </p>
      </div>

      {/* Payment Details */}
      <div className="space-y-6 mt-10">
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
          <p className="text-[#1A1C1E] font-semibold">
            ₦{totalAmt.toLocaleString()}
          </p>
        </div>

        <PayLine />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => router.push("/estate")}
          className="text-[#375DFB] text-[14px] w-[140px] h-[40px] border border-[#375DFB] rounded-md"
        >
          Make New Payment
        </button>
        <button
          onClick={() => router.push("/user")}
          className="text-[#375DFB] text-[14px] w-[140px] h-[40px] border border-[#375DFB] rounded-md"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Bottom Line */}
      <div className="flex justify-center mt-6">
        <div className="w-[148px] h-[3px] bg-[#000000]" />
      </div>
    </section>
  );
}
