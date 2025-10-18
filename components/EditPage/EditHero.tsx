"use client";

import BackArrow from "../RegisterPage/LoginBack";

export default function EditHero() {
  return (
    <section
      className="min-h-[180px] sm:min-h-[200px] md:h-[219px] 
                 bg-[#0D0D1B] w-full flex flex-col justify-center 
                 px-4 sm:px-6 md:px-8 space-y-8 sm:space-y-10"
    >
      <div>
        <BackArrow to="/access" />
        <div className="text-[#FFFFFF] font-bold text-[28px] sm:text-[30px] md:text-[32px] leading-tight">
          <p>Edit</p>
          <p>Profile</p>
        </div>
      </div>
    </section>
  );
}
