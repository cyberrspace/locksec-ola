"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import NavBar from "@/components/LoginPage/NavBar";
import UserHero from "@/components/UserPage/UserHero";



export default function UserPage() {
 

  return (
      <ContentWrapper>
      <main className=" min-h-screen" >

        <section className="bg-[#0D0D1B] h-[182px]">
          <NavBar />
          <UserHero/>
        </section>

      </main>
      </ContentWrapper>
          
       
  );
}
