"use client";
import { useState, useEffect } from "react";

export default function HistoryDetails() {
  const [activeTab, setActiveTab] = useState<"access" | "payment">("access");
  interface AccessDataItem {
    name: string;
    type: string;
    code: string;
  }
  const [accessData, setAccessData] = useState<AccessDataItem[]>([]);
  interface PaymentDataItem {
    ref: string;
    date: string;
    amount: string;
    months: number;
  }
  const [paymentData, setPaymentData] = useState<PaymentDataItem[]>([]);

  // Simulate fetching data
  useEffect(() => {
    // Example: fetch from an API or database
    setAccessData([
      { name: "Lois", type: "Guest", code: "7828803" },
      { name: "John", type: "Cab", code: "9842310" },
      { name: "Sarah", type: "Artisan", code: "1928374" },
    ]);

    setPaymentData([
      { ref: "782803", date: "Jan 28th", amount: "#84,000", months: 3 },
      { ref: "782804", date: "Feb 14th", amount: "#56,000", months: 2 },
      { ref: "782805", date: "Mar 10th", amount: "#112,000", months: 4 },
    ]);
  }, []);

  return (
    <section className="min-h-screen bg-white text-[#1A1C1E] px-4 py-10 flex flex-col items-center">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("access")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "access"
              ? "bg-[#1A1C1E] text-white"
              : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          Access Code
        </button>
        <button
          onClick={() => setActiveTab("payment")}
          className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "payment"
              ? "bg-[#1A1C1E] text-white"
              : "bg-gray-100 hover:bg-gray-200"
            }`}
        >
          Payment
        </button>
      </div>

      {/* Access Table */}
      {activeTab === "access" && (
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-between font-semibold border-b border-gray-300 pb-2">
            <p>Name</p>
            <p>Type</p>
            <p>Code</p>
          </div>

          {accessData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 py-2 text-sm"
            >
              <p>{item.name}</p>
              <p>{item.type}</p>
              <p>{item.code}</p>
            </div>
          ))}
        </div>
      )}

      {/* Payment Table */}
      {activeTab === "payment" && (
        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-between font-semibold border-b border-gray-300 pb-2">
            <p>Reference</p>
            <p>Date</p>
            <p>Amount</p>
            <p>Months</p>
          </div>

          {paymentData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-200 py-2 text-sm"
            >
              <p>{item.ref}</p>
              <p>{item.date}</p>
              <p>{item.amount}</p>
              <p>{item.months}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
