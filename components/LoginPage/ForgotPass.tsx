"use client";

import { useRouter } from "next/navigation";

export default function ForgotPasswordLink() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/reset-password")}
      className="w-[150px] text-right font-inter font-semibold text-[12px] 
                 leading-[140%] tracking-[-0.01em] align-middle
                  text-[#4D81E7] py-2 px-4 rounded-md
                 hover:opacity-90 transition"
    >
      Forgot Password?
    </button>
  );
}
