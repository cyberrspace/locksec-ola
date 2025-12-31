"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import EmailVerificationPage from "@/components/EmailPage/Email";

export default function EmailPage() {
  return (
    <ContentWrapper>
      <main
        className="
          flex flex-col 
          w-full 
          min-h-screen 
          bg-white 
          overflow-x-hidden 
          overflow-y-auto 
          py-4 sm:py-6 
          px-2 sm:px-4
        "
      >
        {/* Hero Section */}
        <section className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
          
        </section>

        {/* Details Section */}
        <section className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto mt-4 sm:mt-6">
        <EmailVerificationPage/>
        </section>
      </main>
    </ContentWrapper>
  );
}
