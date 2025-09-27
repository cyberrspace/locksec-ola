"use client";

import ContentWrapper from "@/components/common/ContentWrapper";

import UserBody from "@/components/UserPage/UserBody";
import UserHero from "@/components/UserPage/UserHero";



export default function UserPage() {
 

  return (
      <ContentWrapper>
      <main className=" min-h-screen bg-[#363636]" >

        <section className="bg-[#0D0D1B] h-[182px]">
       
          <UserHero/>
        </section>
         <UserBody/>
         <div className="pb-10 flex justify-center ">
          <div className="w-[148px] h-[5px] bg-[#000000]" />
         </div>
        
      </main>
      </ContentWrapper>
          
       
  );
}
