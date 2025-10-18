"use client";

import { useEffect, useRef, useState } from "react";
import { Copy } from "lucide-react";
import VisitorCodeCard from "@/components/VisitorCodePage/VisitorCodeCard";
import WhatsAppButton from "@/components/WhatsAppCode/WhatsAppButton";
import { useSearchParams } from "next/navigation";

export default function CodeDetails() {
  const params = useSearchParams();
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [visitorData, setVisitorData] = useState({
    visitorType: "Guest",
    visitorsCount: "1",
    visitorName: "John Doe",
    plateNumber: "ABC-123",
    validFrom: "",
    validUntil: "",
    address: "",
  });

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const now = new Date();
    const until = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    const format = (d: Date) =>
      `${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ${d.toLocaleDateString()}`;

    const storedUser = JSON.parse(localStorage.getItem("userData") || "{}");

    setCode(generatedCode);
    setVisitorData({
      visitorType: params.get("visitorType") || "Guest",
      visitorsCount: params.get("visitorsCount") || "1",
      visitorName: params.get("visitorName") || "John Doe",
      plateNumber: params.get("plateNumber") || "N/A",
      validFrom: format(now),
      validUntil: format(until),
      address: storedUser.address || "Not available",
    });
  }, [params]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappText = `Hello, your access code is ${code}. Valid from ${visitorData.validFrom} to ${visitorData.validUntil}. Powered by http://Locsec.africa`;

  return (
    <section
      className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-[375px] sm:max-w-md mx-auto 
                 overflow-hidden break-words"
    >
      {/* Code + Copy */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] break-all">
          {code}
        </h2>
        <button
          onClick={handleCopy}
          className="flex items-center text-sm text-[#375DFB] hover:underline"
        >
          <Copy size={16} className="mr-1" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Visitor Details */}
      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <p className="flex justify-between flex-wrap">
          <strong>Visitor Type:</strong>
          <span>{visitorData.visitorType} ({visitorData.visitorsCount})</span>
        </p>
        <p className="flex justify-between flex-wrap">
          <strong>Visitor Name:</strong>
          <span>{visitorData.visitorName}</span>
        </p>
        <p className="flex justify-between flex-wrap">
          <strong>Plate Number:</strong>
          <span>{visitorData.plateNumber}</span>
        </p>
        <p className="flex justify-between flex-wrap">
          <strong>Valid From:</strong>
          <span>{visitorData.validFrom}</span>
        </p>
        <p className="flex justify-between flex-wrap">
          <strong>Until:</strong>
          <span>{visitorData.validUntil}</span>
        </p>
        <p className="flex justify-between flex-wrap">
          <strong>Address:</strong>
          <span className="max-w-[200px] text-right break-words">
            {visitorData.address}
          </span>
        </p>
      </div>

      {/* WhatsApp Button */}
      <div className="mt-6">
        <WhatsAppButton
          targetRef={cardRef}
          code={code}
          validFrom={visitorData.validFrom}
          validUntil={visitorData.validUntil}
        />
      </div>

      {/* Visitor Code Card (shareable image) */}
      <div className="mt-6" ref={cardRef}>
        <VisitorCodeCard
          code={code}
          validFrom={visitorData.validFrom}
          validUntil={visitorData.validUntil}
          address={visitorData.address}
          visitorType={visitorData.visitorType}
          visitorsCount={visitorData.visitorsCount}
          visitorName={visitorData.visitorName}
          plateNumber={visitorData.plateNumber}
        />
      </div>

      {/* Copyable WhatsApp message */}
      <div className="mt-4 border-t pt-3">
        <p className="text-xs text-gray-600">Message (copyable):</p>
        <textarea
          readOnly
          value={whatsappText}
          className="w-full text-xs border rounded-md p-2 mt-1 text-gray-700 resize-none"
        />
      </div>
    </section>
  );
}
