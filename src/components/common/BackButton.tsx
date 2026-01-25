"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  text?: string;
}

export default function BackButton({ href = "/", text = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <a
      onClick={() => (href ? router.push(href) : router.back())}
      className="
        flex items-center gap-2 
        text-[#2C2C2C] hover:text-[#1D61E7]
        text-[14px] sm:text-[15px] 
        font-medium transition-all cursor-pointer
      "
    >
      <ArrowLeft className="w-[18px] h-[18px]" />
      <span>{text}</span>
    </a>
  );
}
