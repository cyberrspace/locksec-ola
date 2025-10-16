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
    <section className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-[#1A1C1E]">{code}</h2>
        <button
          onClick={handleCopy}
          className="flex items-center text-sm text-[#375DFB] hover:underline"
        >
          <Copy size={16} className="mr-1" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-700 space-y-1">
        <p className="flex justify-between">
          <strong>Visitor Type:</strong>
          <p>{visitorData.visitorType} ({visitorData.visitorsCount})</p>
        </p>
        <p className="flex justify-between">
          <strong>Visitor Name:</strong>
          <p>{visitorData.visitorName}</p>
        </p>
        <p className="flex justify-between">
          <strong>Plate Number:</strong>
          <p>{visitorData.plateNumber}</p>
        </p>
        <p className="flex justify-between">
          <strong>Valid From:</strong>
          <p>{visitorData.validFrom}</p>
        </p>
        <p className="flex justify-between">
          <strong>Until:</strong>
          <p>{visitorData.validUntil}</p>
        </p>
        <p className="flex justify-between">
          <strong>Address:</strong>
          <p>{visitorData.address}</p>
        </p>
      </div>

      {/* WhatsApp share button */}
      <div className="mt-6">
        {/* WhatsApp share button */}
        <div className="mt-6">
          <WhatsAppButton
            targetRef={cardRef}
            code={code}
            validFrom={visitorData.validFrom}
            validUntil={visitorData.validUntil}
          />
        </div>



      </div>

      {/* Hidden/visible card */}
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

      {/* Copyable message text */}
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
