"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import UserBody from "@/components/UserPage/UserBody";
import UserHero from "@/components/UserPage/UserHero";

export default function UserPage() {
  return (
    <ContentWrapper>
      
    <main className="min-h-screen w-full bg-[#363636] flex flex-col space-y-6">
     <section className="bg-[#0D0D1B] w-full">
          <UserHero />
        </section>
       <section className="w-full flex-1">
          <UserBody />
        </section>
    </main>
    </ContentWrapper>
  );
}
