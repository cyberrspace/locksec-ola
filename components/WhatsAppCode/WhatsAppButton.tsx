"use client";

import html2canvas from "html2canvas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  message: string;
}

export default function WhatsAppButton({ targetRef, message }: WhatsAppButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!targetRef?.current) {
      alert("Visitor card not found.");
      return;
    }

    try {
      setLoading(true);

      // Capture visitor card as image
      const canvas = await html2canvas(targetRef.current, {
        useCORS: true,
        scale: 2,
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );

      if (!blob) {
        alert("Could not create image.");
        setLoading(false);
        return;
      }

      const file = new File([blob], "visitor-card.png", { type: "image/png" });

      // ✅ Check if Web Share API (with files) is supported
      const canShareFiles =
        typeof navigator !== "undefined" &&
        !!navigator.canShare &&
        navigator.canShare({ files: [file] });

      if (canShareFiles) {
        // ✅ Works on Android/iOS
        await navigator.share({
          files: [file],
          text: message,
          title: "Visitor Code",
        });
      } else {
        // ✅ Fallback for desktop browsers (WhatsApp Web)
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");

        // Trigger a download of the visitor card image
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "visitor-card.png";
        link.click();
      }
    } catch (err) {
      console.error("Error sharing to WhatsApp:", err);
      // ⚙️ Don’t block the user with alert — gracefully fallback
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleShare}
      className="bg-[#25D366] hover:bg-[#1DA955] text-white flex items-center justify-center space-x-2 w-full rounded-lg"
      disabled={loading}
    >
      <MessageCircle size={18} />
      <span>{loading ? "Preparing..." : "Share on WhatsApp"}</span>
    </Button>
  );
}
