"use client";

import AccessForm from "@/components/AccessPage/AccessForm";
import AccessHero from "@/components/AccessPage/AccessHero";
import ContentWrapper from "@/components/common/ContentWrapper";

export default function AccessPage(){
  return(
    <ContentWrapper>
      <section className="">
        <AccessHero />
       
      </section>
      <section className="">
        <AccessForm />
      </section>
    </ContentWrapper>
   
  )

}