"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HistoryCard() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/history")} 
      className="bg-[#334B52] h-[163px] w-[163px] rounded-[15.38px] p-4 space-y-12
                 flex flex-col justify-between
                 cursor-pointer transition-transform duration-200
                 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#91C799]"
    >
      <Image
        src="/icons/history-bg.png"
        alt="History"
        width={23}
        height={23}
      />
      <div className="text-[#91C799] text-[16px] font-medium flex-1 flex items-end">
        <p>History</p>
      </div>
    </button>
  );
}
