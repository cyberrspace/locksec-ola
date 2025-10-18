"use client";

import { Suspense } from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import SuccessHero from "@/components/SuccessPage/SuccessHero";
import SuccessDetails from "@/components/SuccessPage/SuccessDetails";

export default function SuccessPage() {
  return (
    <ContentWrapper>
      <main className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
        <section className="w-full">
          <SuccessHero />
        </section>

        <section className="w-full px-4 sm:px-6">
          <Suspense fallback={<div className="text-center py-4">Loading payment details...</div>}>
            <SuccessDetails />
          </Suspense>
        </section>
      </main>
    </ContentWrapper>
  );
}
