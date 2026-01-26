"use client";

import { Suspense } from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import PaymentDetails from "@/components/SummaryPage/PaymentDetails";
import SummaryHero from "@/components/SummaryPage/SummaryHero";

export default function SummaryPage() {
  return (
    <ContentWrapper>
      <main className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
        <section className="w-full">
          <SummaryHero />
        </section>

        <section className="w-full px-4 sm:px-6">
          <Suspense fallback={<div className="text-center py-4">Loading payment details...</div>}>
            <PaymentDetails />
          </Suspense>
        </section>
      </main>
    </ContentWrapper>
  );
}
