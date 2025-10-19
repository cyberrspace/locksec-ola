"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileCard() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/profile")}
      className="bg-[#713BB580] h-[min(40vw,163px)] w-[min(40vw,163px)] rounded-[min(3.85vw,15.38px)] p-[min(4vw,16px)] space-y-[min(12vw,48px)]
                 flex flex-col justify-between
                 cursor-pointer transition-transform duration-200
                 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#91C799]
                 sm:h-[163px] sm:w-[163px] sm:rounded-[15.38px] sm:p-4 sm:space-y-12"
    >
      <Image
        src="/icons/profile-bg.png"
        alt="Generate"
        width={23}
        height={23}
        className="w-[min(6vw,23px)] h-[min(6vw,23px)] sm:w-[23px] sm:h-[23px]"
      />
      <div className="text-[#91C799] text-[min(4vw,16px)] font-medium flex-1 flex items-end sm:text-[16px]">
        <p>Profile</p>
      </div>
    </button>
  );
}