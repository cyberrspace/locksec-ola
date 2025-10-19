"use client";

import UserLine from "./UserLine";
import GenerateCode from "./GenerateCode";
import EstateBills from "./EstateBills";
import HistoryCard from "./HistoryCard";
import ProfileCard from "./ProfileCard";

export default function UserBody() {
  return (
    <main className="min-h-screen w-full px-4 sm:px-6 md:px-10 py-6 space-y-6">
      {/* Active Code Section */}
      <section
        className="flex flex-col justify-between rounded-[15.38px] opacity-100
        w-full max-w-[500px] mx-auto h-auto bg-[#313F57] p-4 sm:p-6 space-y-6"
      >
        {/* Header Row */}
        <div className="flex justify-between text-[13px] sm:text-[14px] font-medium text-[#92B2F2]">
          <p>Active code</p>
          <p>Amount Due</p>
        </div>

        {/* Value Row */}
        <div className="flex justify-between items-center text-[#92B2F2]">
          <p className="text-[36px] sm:text-[42px] font-bold">0</p>
          <UserLine />
          <p className="text-[28px] sm:text-[36px] font-bold">₦28,000</p>
        </div>
      </section>

      {/* Generate Code + Estate Bills */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <GenerateCode />
        <EstateBills />
      </section>

      {/* History + Profile */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <HistoryCard />
        <ProfileCard />
      </section>
    </main>
  );
}
