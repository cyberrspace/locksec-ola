"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GenerateCode() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/access-code")} 
      className="bg-[#324438] h-[163px] w-[163px] rounded-[15.38px] p-4 space-y-12
                 flex flex-col justify-between
                 cursor-pointer transition-transform duration-200
                 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#91C799]"
    >
      <Image
        src="/icons/Generate.png"
        alt="Generate"
        width={23}
        height={23}
      />
      <div className="text-[#91C799] text-[16px] font-medium text-left">
        <p>Generate</p>
        <p>Access code</p>
      </div>
    </button>
  );
}
