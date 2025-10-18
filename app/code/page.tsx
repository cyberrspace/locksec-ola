"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import CodeDetails from "@/components/GeneratedPage/CodeDetails";
import CodeHero from "@/components/GeneratedPage/CodeHero";
import { Suspense } from "react";

export default function CodePage() {
  return (
    <ContentWrapper>
      <main
        className="
          min-h-screen 
          flex 
          flex-col 
          justify-start 
          items-center 
          bg-white 
          overflow-x-hidden 
          overflow-y-auto 
          py-6 
          sm:py-8 
          px-4 
          sm:px-6
        "
      >
        <section className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <CodeHero />
        </section>

        <section className="w-full max-w-md sm:max-w-lg md:max-w-xl mt-6">
          <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
            <CodeDetails />
          </Suspense>
        </section>
      </main>
    </ContentWrapper>
  );
}
