"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import ProfileDetails from "@/components/ProfilePage/ProfileDetails";
import ProfileHero from "@/components/ProfilePage/ProfileHero";

export default function ProfilePage() {
  return (
    <ContentWrapper>
      <main className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
        <section className="w-full">
          <ProfileHero />
        </section>

        <section className="w-full px-4 sm:px-6">
          <ProfileDetails />
        </section>
      </main>
    </ContentWrapper>
  );
}
