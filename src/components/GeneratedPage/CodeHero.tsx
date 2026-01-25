"use client";

import BackArrow from "../RegisterPage/LoginBack";

export default function CodeHero() {
  return (
    <section className="h-[219px] bg-[#0D0D1B] w-full flex flex-col justify-center px-4 space-y-10 sm:space-y-8 md:space-y-6">
      <div className="-mt-10">
        <BackArrow to="/user" />
      </div>

      <div className="text-[#FFFFFF] font-bold text-[28px] sm:text-[32px] leading-tight">
        <p>Code Successfully</p>
        <p>Generated</p>
      </div>
    </section>
  );
}
