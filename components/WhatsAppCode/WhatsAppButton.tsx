"use client";

import { useEffect, useState, RefObject } from "react";
import * as htmlToImage from "html-to-image";
import { Loader2 } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  // ✅ Load user address from localStorage
  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsed = JSON.parse(data);
      setAddress(parsed.address || "");
    }
  }, []);

  // ✅ This is the text that will appear inside WhatsApp
  const message = `Hello, your access code is ${code}.
Valid from ${validFrom} to ${validUntil}.
Address: ${address}
Powered by http://Locsec.africa`;

  // ✅ Main share handler
  const handleShare = async () => {
    if (!targetRef.current) {
      alert("Card not ready yet, please wait a moment.");
      return;
    }

    setLoading(true);

    try {
      // Capture the card as an image
      const dataUrl = await htmlToImage.toPng(targetRef.current, {
        backgroundColor: "#ffffff",
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], "visitor-card.png", { type: "image/png" });

      // ✅ Native mobile share (works on Android Chrome, iOS Safari)
      if (navigator.canShare && navigator.canShare({ files: [file], text: message })) {
        await navigator.share({
          files: [file], // the captured image
          text: message, // the message (appears with image)
          title: "Visitor Code", // optional title
        });
        console.log("✅ Shared successfully via navigator.share()");
      } else {
        // ✅ Fallback: open WhatsApp Web with text only
        const encoded = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encoded}`, "_blank");
        console.warn("⚠️ navigator.share not supported. Used fallback to WhatsApp Web.");
      }
    } catch (err) {
      console.error("❌ Error sharing:", err);
      alert("Failed to share. Try again or check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <button
        onClick={handleShare}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : "Share on WhatsApp"}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Tap to share image + text directly to WhatsApp.
      </p>
    </div>
  );
}
