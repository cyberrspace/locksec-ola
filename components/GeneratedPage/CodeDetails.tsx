"use client";

import { useEffect, useState } from "react";
import { Copy, } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { useRouter, useSearchParams } from "next/navigation";
import HorizontalLine from "../UserPage/horizontalLine";

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

  const whatsappMessage = `Visitor Access Code: ${code}
  Status: ${status}
Visitor Type: ${visitorType} (${visitorsCount} people)
Visitor Name: ${name}
Plate Number: ${plateNumber}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="min-h-screen bg-[#FFFFFF] text-white flex flex-col items-center px-4 py-10">
      <div className="bg-[#FFFFFF] w-full max-w-md rounded-xl p-4  space-y-6">
        {/* Code + Copy */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-[#1A1C1E] ">{code}</h2>
          <button
            onClick={handleCopy}
            className="flex items-center text-sm text-[#ACB5BB] hover:opacity-80"
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
            <span className="font-normal text-[16px] text-[#6C7278]">Number of Visitors</span>
            <span className="font-normal text-[16px] text-[#1A1C1E]">
              {visitorType} ({visitorsCount} people)
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-normal text-[16px] text-[#6C7278]">Visitor Name</span>
            <span className="font-normal text-[16px] text-[#1A1C1E]">{name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-normal text-[16px] text-[#6C7278]">Plate Number</span>
            <span className="font-normal text-[16px] text-[#1A1C1E]">{plateNumber}</span>
          </div>
        </div>


        <div className="space-y-4">
          <p className="font-normal text-[16px] text-[#6C7278]">For:</p>
          <div className="flex justify-between">
            <p className="font-normal text-[16px] text-[#6C7278]">Mr Adebayo</p>
            <p className="font-normal text-[16px] text-[#1A1C1E]">Apt 12B Road M</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => window.location.reload()}
            className=" px-4 py-2 font-medium text-[14px] text-[#375DFB] w-[105px] h-[40px]"
          >
            Generate New Code
          </button>
          <button
            onClick={() => router.push("/user")}
            className=" px-4 py-2  font-medium text-[14px] text-[#375DFB]  w-[105px] h-[40px]"
          >
            Go to User Page
          </button>

          
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2  hover:bg-green-500 px-4 py-2 mt-8 font-normal text-[16px] text-[#6C7278]"
        >
          < FaWhatsapp size={20} />
          Share via WhatsApp
        </a>
      </div>

      <HorizontalLine/>
    </section>
  );
}
