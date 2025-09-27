"use client";

import ContentWrapper from "@/components/common/ContentWrapper";

import RegisterForm from "@/components/RegisterPage/RegisterForm";
import RegisterHero from "@/components/RegisterPage/RegisterHero";



export default function RegisterPage(){
  return(
    <ContentWrapper>
      <main className=" min-h-screen" >
       
        <section className="bg-[#0D0D1B] h-[219px]">
         
         <RegisterHero/>
        </section>
        <RegisterForm/>
      </main>
    </ContentWrapper>
  

  )
}