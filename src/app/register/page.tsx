"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import LoginTerms from "@/components/LoginPage/LoginTerms";
import RegisterForm from "@/components/RegisterPage/RegisterForm";
import RegisterHero from "@/components/RegisterPage/RegisterHero";

export default function RegisterPage() {
  return (
    <ContentWrapper>
      <main className="flex flex-col min-h-screen w-full bg-[#0D0D1B] overflow-x-hidden overflow-y-auto">
        {/* Hero Section */}
        <section className="w-full bg-[#0D0D1B] py-10 sm:py-12 md:py-16">
          <RegisterHero />
        </section>

        {/* Form Section */}
        <section className="w-full flex-1 bg-white px-4 sm:px-6 md:px-8 py-8">
          <RegisterForm />
          <LoginTerms />
        </section>
      </main>
    </ContentWrapper>
  );
}
