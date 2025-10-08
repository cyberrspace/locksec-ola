"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import ProfileDetails from "@/components/ProfilePage/ProfileDetails";
import ProfileHero from "@/components/ProfilePage/ProfileHero";




export default function CodePage() {
  return (
    <ContentWrapper>
      <main className="h-[863px]">
        <section>
          <ProfileHero/>
        </section>
        <section className="px-4">
        <ProfileDetails/>
        </section>
        
        
        
      </main>
    </ContentWrapper>
  );
}
