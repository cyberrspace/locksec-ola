"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import CodeDetails from "@/components/GeneratedPage/CodeDetails";
import CodeHero from "@/components/GeneratedPage/CodeHero";



export default function CodePage(){
  return(
    <ContentWrapper>
     <section>
      <CodeHero/>
     </section>
     <section>
      <CodeDetails/>
     </section>
     
    
    </ContentWrapper>
 

  )
}