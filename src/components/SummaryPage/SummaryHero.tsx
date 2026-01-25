"use client";

import BackArrow from "../RegisterPage/LoginBack";

export default function SummaryHero() {
  return (
    <section className="min-h-[200px] bg-[#0D0D1B] w-full flex flex-col justify-center px-4 sm:px-6 md:px-10 py-10 sm:py-12">
      <div className="space-y-6 sm:space-y-8">
        {/* Back Arrow */}
        <div>
          <BackArrow to="/estate" />
        </div>

        {/* Title Text */}
        <div className="text-[#FFFFFF] font-bold text-[26px] sm:text-[32px] leading-tight">
          <p>Payment</p>
          <p>Summary</p>
        </div>
      </div>
    </section>
  );
}
