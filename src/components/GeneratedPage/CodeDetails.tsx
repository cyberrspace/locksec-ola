"use client";

import { Copy } from "lucide-react";


import { useRef, useState } from "react";
import { AccessCode } from "@/types/AccessCode";
import WhatsAppButton from "../WhatsAppCode/WhatsAppButton";
import VisitorCodeCard from "../VisitorCodePage/VisitorCodeCard";

interface CodeDetailsProps {
  data: AccessCode;
}

export default function CodeDetails({ data }: CodeDetailsProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappText = `Hello, your access code is ${data.code}.
Valid from ${new Date(data.createdAt).toLocaleString()}.
Powered by https://locsec.africa`;

  return (
    <section className="bg-white rounded-lg shadow-md p-4 w-full max-w-md mx-auto">
      {/* Code */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold">{data.code}</h2>
        <button onClick={handleCopy} className="text-blue-600 flex items-center">
          <Copy size={16} className="mr-1" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Details */}
      <div className="mt-4 text-sm space-y-1">
        <p><strong>Visitor Type:</strong> {data.victorType}</p>

        <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
        <p><strong>Phone:</strong> {data.phoneNumber}</p>
        <p><strong>People:</strong> {data.numOfPeople}</p>
        <p><strong>Plate:</strong> {data.plateNum ?? "N/A"}</p>
        <p><strong>Status:</strong> {data.status}</p>
      </div>

      {/* WhatsApp */}
      <div className="mt-6">
        <WhatsAppButton
          targetRef={cardRef}
          code={data.code}
          validFrom={data.createdAt}
          validUntil={data.updatedAt}
        />
         </div>

      <div className="mt-6" ref={cardRef}>
     <VisitorCodeCard
      code={data.code}
          validFrom={data.createdAt}
          validUntil={data.updatedAt}
          address="Estate Address"
          visitorType={data.victorType}
          visitorsCount={String(data.numOfPeople)}
          visitorName={`${data.firstName} ${data.lastName}`}
          plateNumber={data.plateNum ?? "N/A"}
     
     
     />


       
      </div>

      <textarea
        readOnly
        value={whatsappText}
        className="w-full mt-4 text-xs border rounded-md p-2"
      />
    </section>
  );
}
