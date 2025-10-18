"use client";

import BackArrow from "../RegisterPage/LoginBack";

export default function EstateHero() {
  return (
    <section
      className="min-h-[219px] bg-[#0D0D1B] w-full max-w-[375px] 
                 flex flex-col justify-center px-4 space-y-10 
                 sm:max-w-full sm:px-6 md:px-8"
    >
      <div>
        <BackArrow to="/access" />
        <div className="text-[#FFFFFF] font-bold text-[28px] sm:text-[30px] md:text-[32px] leading-tight">
          <p>Make</p>
          <p>Estate Bills</p>
        </div>
      </div>
    </section>
  );
}
