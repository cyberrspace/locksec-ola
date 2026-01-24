"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PayLine from "./PayLine";



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

  // Load Paystack script when component mounts
  useEffect(() => {
    if (!document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]')) {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = () => {
    if (!bills || !apartment || months <= 0) {
      setError("Please fill all payment details correctly before proceeding.");
      return;
    }

    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!key) {
      alert("Paystack key missing! Please check your environment variable.");
      return;
    }

    if (!window.PaystackPop || !window.PaystackPop.setup) {
      alert("Payment system not ready. Please reload the page.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key,
      email: "user@example.com",
      amount: totalAmt * 100,
      currency: "NGN",
      ref: "REF_" + Date.now(),
      onClose: () => {
        alert("Transaction was cancelled.");
      },
      callback: (response) => {
        console.log("Payment successful:", response);
        router.push(
          `/success?bills=${bills}&apartment=${apartment}&months=${months}`
        );
      },
    });

    handler.openIframe();
  };

  return (
    <section className="min-h-screen bg-[#FFFFFF] flex flex-col justify-between px-4 sm:px-6 md:px-8 py-8 sm:py-10">
      <div className="space-y-6 max-w-md mx-auto w-full">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <p className="text-[#6C7278]">Type of Bill</p>
            <p className="text-[#1A1C1E]">{bills || "N/A"}</p>
          </div>

          <div className="flex justify-between items-center text-sm sm:text-base">
            <p className="text-[#6C7278]">Apartment</p>
            <p className="text-[#1A1C1E]">{apartment || "N/A"}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <p className="text-[#6C7278]">No. of Month(s)</p>
            <p className="text-[#1A1C1E]">{months || "N/A"}</p>
          </div>

          <div className="flex justify-between items-center text-sm sm:text-base">
            <p className="text-[#6C7278]">{months} Months Amt.</p>
            <p className="text-[#1A1C1E]">₦{monthsAmt.toLocaleString()}</p>
          </div>

          <div className="flex justify-between items-center text-sm sm:text-base">
            <p className="text-[#6C7278]">Service Charge</p>
            <p className="text-[#1A1C1E]">₦{serviceCharge.toLocaleString()}</p>
          </div>
        </div>

        <PayLine />

        <div className="flex justify-between items-center mt-10 text-sm sm:text-base">
          <p className="text-[#6C7278]">Total Amt.</p>
          <p className="text-[#1A1C1E] font-semibold">
            ₦{totalAmt.toLocaleString()}
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center break-words px-2">{error}</p>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center w-full max-w-md mx-auto">
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white rounded-md w-full sm:w-[327px] h-[46px] hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Complete Payment
        </button>

        <div className="flex justify-center mt-4">
          <div className="w-[100px] sm:w-[148px] h-[3px] bg-[#000000]" />
        </div>
      </div>
    </section>
  );
}
