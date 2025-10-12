"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackArrowProps {
  to?: string; // optional prop
}


export default function BackArrow({ to = "/" }: BackArrowProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(to)}
      className="flex items-center  text-[#FFFFFF] hover:text-[#FFFFFF] transition -mt-10 mb-8"
    >
      <ArrowLeft className="w-5 h-5" />
      
    </button>
  );
}
