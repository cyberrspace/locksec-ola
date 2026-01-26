"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import HistoryDetails from "@/components/HistoryPage/HistoryDetails";
import HistoryHero from "@/components/HistoryPage/HistoryHero";

export default function CodePage() {
  return (
    <ContentWrapper>
      <main className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
        <section className="w-full">
          <HistoryHero />
        </section>

        <section className="w-full px-4 sm:px-6">
          <HistoryDetails />
        </section>
      </main>
    </ContentWrapper>
  );
}
