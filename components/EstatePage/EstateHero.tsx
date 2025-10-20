"use client";

import BackArrow from "../RegisterPage/LoginBack";

export default function EstateHero() {
  return (
    <section
      className="min-h-[219px] bg-[#0D0D1B] w-full 
                 flex flex-col justify-center space-y-8 sm:space-y-10 
                 px-4 sm:px-6 md:px-8"
    >
      <div className="w-full">
        <BackArrow to="/access" />
        <div className="text-[#FFFFFF] font-bold text-[26px] sm:text-[30px] md:text-[32px] leading-tight">
          <p>Make</p>
          <p>Estate Bills</p>
        </div>
      </div>
    </section>
  );
}
