"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import HistoryDetails from "@/components/HistoryPage/HistoryDetails";
import HistoryHero from "@/components/HistoryPage/HistoryHero";



export default function CodePage() {
  return (
    <ContentWrapper>
      <main className="h-[863px]">
        <section>
         <HistoryHero/>
        </section>
        <section className="px-4">
        <HistoryDetails />
        </section>
        
        
        
      </main>
    </ContentWrapper>
  );
}
