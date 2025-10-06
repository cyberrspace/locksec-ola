"use client";

import BackArrow from "../RegisterPage/LoginBack";

export default function SuccessHero() {
  return (
    <section className="h-[219px] bg-[#0D0D1B] w-[375px] flex flex-col items-center justify-center relative">
      {/* Back Arrow positioned at the top-left */}
      <div className="absolute top-4 left-4">
        <BackArrow to="/estate" />
      </div>

      {/* Centered text */}
      <div className="text-[#FFFFFF] font-bold text-[32px] flex flex-col items-center justify-center">
        <p>Payment</p>
        <p>Successful!</p>
      </div>
    </section>
  );
}
