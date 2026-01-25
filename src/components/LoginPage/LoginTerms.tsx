"use client";

import Link from "next/link";

export default function LoginTerms() {
  return (
    <section className="flex flex-col items-center justify-center space-y-5">
      <div className="w-[297px] font-inter font-normal text-[12px] text-center">
        <p>
          By signing up, you agree to the{" "}
          <Link
            href="/terms"
            className="font-bold text-[#000000] underline hover:text-[#DF4F3A] transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and
        </p>
        <p>
          <Link
            href="/agreement"
            className="font-bold text-[#000000] underline hover:text-[#DF4F3A] transition-colors"
          >
            Data Processing Agreement
          </Link>
        </p>
      </div>
    </section>
  );
}
