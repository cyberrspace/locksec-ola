"use client";

import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react"; // npm install lucide-react
import BackArrow from "../RegisterPage/LoginBack";

export default function ProfileHero() {
  const router = useRouter();

  return (
    <section className="h-[219px] bg-[#0D0D1B] w-[375px] flex flex-col justify-center px-4 space-y-10">
      {/* Top Row: BackArrow + Edit Icon */}
      <div className="flex justify-between items-center">
        <BackArrow />
        <button
          onClick={() => router.push("/edit")}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Edit Profile"
        >
          <Pencil size={22} />
        </button>
      </div>

      {/* Title */}
      <div className="text-[#FFFFFF] font-bold text-[32px] leading-tight">
        <p>Profile</p>
        <p>Settings</p>
      </div>
    </section>
  );
}
