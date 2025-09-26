"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackArrow() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/login")}
      className="flex items-center gap-2 text-[#FFFFFF] hover:text-[#FFFFFF] transition"
    >
      <ArrowLeft className="w-5 h-5" />
      
    </button>
  );
}
