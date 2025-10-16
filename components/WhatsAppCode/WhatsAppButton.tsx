"use client";

import { useEffect, useState, RefObject } from "react";
import * as htmlToImage from "html-to-image";

interface WhatsAppButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
  code: string;
  validFrom: string;
  validUntil: string;
}

export default function WhatsAppButton({
  targetRef,
  code,
  validFrom,
  validUntil,
}: WhatsAppButtonProps) {
  const [address, setAddress] = useState("");

  // 🔄 Fetch dynamic address from localStorage (saved in RegisterForm)
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsed = JSON.parse(data);
      setAddress(parsed.address || "");
    }
  }, []);

  const handleShare = async () => {
    if (!targetRef.current) return;

    // Define the message to be shared
    const message = `Hello, your access code is ${code}.
          Valid from ${validFrom} to ${validUntil}.
          Powered by http://Locsec.africa
          Address: ${address}`;

    try {
      const dataUrl = await htmlToImage.toPng(targetRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "visitor-card.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          text: message,
          title: "Visitor Code",
        });
      } else {
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, "_blank");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };


  return (
    <div className="flex flex-col items-center gap-3">
      {/* WhatsApp Share Button */}
      <button
        onClick={handleShare}
        className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
      >
        Share on WhatsApp
      </button>

      {/* Copyable message preview */}
      <textarea
        readOnly
        value={`Hello, your access code is ${code}.
          Valid from ${validFrom} to ${validUntil}.
          Powered by http://Locsec.africa
          Address: ${address}`}
        className="w-[320px] h-[100px] text-sm border rounded-md p-2 resize-none"
      />
    </div>
  );
}
