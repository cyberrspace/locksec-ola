"use client";

import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import BackArrow from "../RegisterPage/LoginBack";

export default function ProfileHero() {
  const router = useRouter();

  return (
    <section
      className="h-[219px] bg-[#0D0D1B] w-full max-w-[375px] sm:max-w-md md:max-w-lg 
                 flex flex-col justify-center px-3 sm:px-6 md:px-8 space-y-8 sm:space-y-10 mx-auto"
    >
      {/* Top Row: BackArrow + Edit Icon */}
      <div className="flex justify-between items-center">
        <BackArrow to="/user" />
        <button
          onClick={() => router.push("/edit")}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Edit Profile"
        >
          <Pencil size={22} className="w-[20px] sm:w-[22px]" />
        </button>
      </div>

      {/* Title */}
      <div className="text-white font-bold text-[26px] sm:text-[32px] leading-tight">
        <p>Profile</p>
        <p>Settings</p>
      </div>
    </section>
  );
}
