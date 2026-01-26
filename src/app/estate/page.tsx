"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import EstateForm from "@/components/EstatePage/EstateForm";
import EstateHero from "@/components/EstatePage/EstateHero";

export default function EstatePage(){

  return(
    <ContentWrapper>
      <section>
      <EstateHero/>
      </section>
      <EstateForm/>
    </ContentWrapper>
 
    
  )
}