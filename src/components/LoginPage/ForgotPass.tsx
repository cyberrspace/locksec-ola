"use client";



import Link from "next/link";

export default function ForgotPasswordLink() {
  return (
    <Link
      href="/Emailbox"
      className="w-[150px] text-right font-inter font-semibold text-[12px] 
                 leading-[140%] tracking-[-0.01em] align-middle
                 text-[#4D81E7] py-2 px-4 rounded-md
                 hover:opacity-90 transition"
    >
      Forgot Password?
    </Link>
  );
}



