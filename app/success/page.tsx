"use client";

import { Suspense } from "react";
import ContentWrapper from "@/components/common/ContentWrapper";
import SuccessHero from "@/components/SuccessPage/SuccessHero";
import SuccessDetails from "@/components/SuccessPage/SuccessDetails";




export default function CodePage(){
  return(
    <ContentWrapper>
      <main className="h-[863px]">
        <section>
        <SuccessHero/>
        </section>
       <Suspense fallback={<div>Loading payment details...</div>}>
       <SuccessDetails/>        
       </Suspense>
 
      </main>
     
    
    </ContentWrapper>
 

  )
}