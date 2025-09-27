"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import LoginHero from "@/components/LoginPage/LoginHero";
import LoginTwo from "@/components/LoginPage/LoginTwo";
import LoginButton from "@/components/LoginPage/LoginButton";
import LoginTerms from "@/components/LoginPage/LoginTerms";


export default function LoginPage(){
  return(
   <ContentWrapper>
   
    <main>
        <section className="bg-[#0D0D1B] h-[342px]">
        
    <LoginHero/>
   </section>
   <section className="flex flex-col items-center justify-center gap-10 mt-10">
     <LoginTwo />
     <LoginButton/>
          <LoginTerms />
   </section>
   
      </main>
   </ContentWrapper>


  )
}