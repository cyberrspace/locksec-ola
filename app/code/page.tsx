"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import CodeDetails from "@/components/GeneratedPage/CodeDetails";
import CodeHero from "@/components/GeneratedPage/CodeHero";
import { Suspense } from "react";

export default function CodePage() {
  return (
    <ContentWrapper>
      <main className="h-[863px]">
        <section>
          <CodeHero />
        </section>

        {/* Wrap CodeDetails properly inside Suspense */}
        <Suspense fallback={<div className="text-center p-6">Loading...</div>}>
          <CodeDetails />
        </Suspense>
      </main>
    </ContentWrapper>
  );
}
