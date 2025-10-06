"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import PaymentDetails from "@/components/SummaryPage/PaymentDetails";
import SummaryHero from "@/components/SummaryPage/SummaryHero";



export default function CodePage(){
  return(
    <ContentWrapper>
      <main className="h-[863px]">
        <section>
         <SummaryHero/>
        </section>
        <section>
         <PaymentDetails/>
        </section>
 
      </main>
     
    
    </ContentWrapper>
 

  )
}