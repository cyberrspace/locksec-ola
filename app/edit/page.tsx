"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import EditDetails from "@/components/EditPage/EditDetails";
import EditHero from "@/components/EditPage/EditHero";




export default function CodePage() {
  return (
    <ContentWrapper>
      <main className="flex flex-col min-h-screen w-full ">
        <section>
        <EditHero/>
        </section>
        <section className="px-4">
       <EditDetails/>
        </section>
        
        
        
      </main>
    </ContentWrapper>
  );
}
