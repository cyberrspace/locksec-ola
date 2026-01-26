"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import UserBody from "@/components/UserPage/UserBody";
import UserHero from "@/components/UserPage/UserHero";

export default function UserPage() {
  return (
    <ContentWrapper>
      <main className="min-h-screen w-full bg-[#363636] flex flex-col space-y-6 overflow-x-hidden overflow-y-auto">

        {/* Hero Section */}
        <section className="bg-[#0D0D1B] w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
          <UserHero />
        </section>

        {/* User Body Section */}
        <section className="w-full flex-1 px-4 sm:px-6 md:px-8 pb-8">
          <UserBody />
        </section>

      </main>
    </ContentWrapper>
  );
}
