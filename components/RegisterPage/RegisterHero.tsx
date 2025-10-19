"use client";

import BackArrow from "./LoginBack";
import LoginUser from "./LoginUser";

export default function RegisterHero() {
  return (
    <main className="h-[219px] px-3 sm:px-4 md:px-6 flex flex-col justify-end items-center bg-[#0D0D1B] w-full pb-4 sm:pb-2">
      <section className="w-full max-w-[375px] sm:max-w-[400px] md:max-w-[480px] h-auto space-y-4">
        {/* Back button */}
        <div>
          <BackArrow to="/login" />
        </div>

        {/* Register text and login link */}
        <div>
          <p className="text-white font-bold text-[28px] sm:text-[32px] leading-tight">
            Register
          </p>

          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <p className="text-white">Already have an account?</p>
            <LoginUser />
          </div>
        </div>
      </section>
    </main>
  );
}
