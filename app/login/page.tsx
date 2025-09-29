"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import LoginHero from "@/components/LoginPage/LoginHero";
import LoginTwo from "@/components/LoginPage/LoginTwo";
import LoginButton from "@/components/LoginPage/LoginButton";
import LoginTerms from "@/components/LoginPage/LoginTerms";

export default function LoginPage() {
  return (
    <ContentWrapper>
      <main className="flex flex-col min-h-screen w-full space-y-6">
        {/* HERO SECTION */}
        <section className="w-full bg-[#0D0D1B] py-10 sm:py-12 md:py-16">
          <LoginHero />
        </section>

        {/* FORM SECTION */}
        <section className="flex flex-col items-center justify-center w-full flex-1 gap-8 px-4 sm:px-6 md:px-8 bg-transparent">
          <LoginTwo />
          <LoginButton />
          <LoginTerms />
        </section>
      </main>
    </ContentWrapper>
  );
}
