"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CodeDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // read from query params
  const visitorType = searchParams.get("visitorType") || "Visitor";
  const visitorsCount = searchParams.get("visitorsCount") || "1";
  const plateNumber = searchParams.get("plateNumber") || "N/A";
  const name = searchParams.get("name") || "Guest";

  const [code, setCode] = useState("");
  const [status, setStatus] = useState("Inactive");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(generatedCode);
    setStatus("Active");
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen bg-[#FFFFFF] text-white flex flex-col items-center px-6 py-10">
      <div className="bg-[#FFFFFF] w-full max-w-md rounded-xl p-6  space-y-6">
        {/* Code + Copy */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-[#1A1C1E] ">{code}</h2>
          <button
            onClick={handleCopy}
            className="flex items-center text-sm text-[#DF4F3A] hover:opacity-80"
          >
            <Copy size={18} className="mr-1" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Status */}
        <p className="text-sm font-normal text-[16px] text-[#6C7278] flex justify-between">
          Status: <span className="text-green-400 font-semibold">{status}</span>
        </p>

        {/* Required Info only */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Number of Visitors</span>
            <span>
              {visitorType} ({visitorsCount} people)
            </span>
          </div>

          <div className="flex justify-between">
            <span>Visitor Name</span>
            <span>{name}</span>
          </div>

          <div className="flex justify-between">
            <span>Plate Number</span>
            <span>{plateNumber}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-[#DF4F3A] px-4 py-2 rounded-lg font-medium hover:bg-[#c94430]"
          >
            Generate New Code
          </button>
          <button
            onClick={() => router.push("/user")}
            className="bg-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-600"
          >
            Go to User Page
          </button>
        </div>
      </div>
    </section>
  );
}
