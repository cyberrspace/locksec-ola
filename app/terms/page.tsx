"use client";

import ContentWrapper from "@/components/common/ContentWrapper";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Terms() {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastUpdated(formattedDate);
  }, []);

  return (
    <ContentWrapper>
      <main className="min-h-screen w-full overflow-x-hidden overflow-y-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 bg-white">

        {/* Header */}
        <section className="flex items-center justify-between">
          <h1 className="text-black text-lg sm:text-xl font-bold">
            Terms of Service
          </h1>

          {/* Cancel / Close Button */}
          <button
            onClick={() => router.push("/register")}
            className="text-black text-sm font-semibold hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </section>

        {/* Last Updated */}
        <section>
          <h3 className="text-black text-base sm:text-lg font-bold">Terms of Service</h3>
          <p className="text-gray-500 text-xs sm:text-sm">
            Last Updated {lastUpdated}.
          </p>
        </section>

        {/* Introduction */}
        <section className="space-y-2">
          <h2 className="text-black text-base sm:text-lg font-semibold">Introduction</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Vulputate odio turpis mattis porttitor. Risus scelerisque sit sagittis urna. At sem est aenean scelerisque velit id odio urna. Amet urna sociis sed tincidunt ut. Dui posuere mattis diam convallis nullam dictum. Morbi velit feugiat nibh viverra ornare aliquam libero. Accumsan condimentum nulla donec vel tortor. Orci nisi commodo massa at. Lobortis etiam nulla diam cursus elit id consequat ut.
          </p>
        </section>

        {/* Service Provider */}
        <section className="space-y-2">
          <h2 className="text-black text-base sm:text-lg font-semibold">Service Provider</h2>
          <p className="text-gray-700 text-sm leading-relaxed">Nulla morbi auctor lorem tempus elementum rhoncus. Augue tortor habitant suspendisse ultricies ac feugiat amet cursus mattis.</p>
          <p className="text-gray-700 text-sm leading-relaxed">Orci nisi commodo massa at. Lobortis etiam nulla diam cursus elit id consequat ut.</p>
          <p className="text-gray-700 text-sm leading-relaxed">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu.</p>
        </section>

        {/* Age requirement */}
        <section className="space-y-2">
          <h2 className="text-black text-base sm:text-lg font-semibold">Age Requirement</h2>
          <p className="text-gray-700 text-sm leading-relaxed">Sed egestas mauris lacus dignissim aenean vel. Imperdiet eu blandit gravida elementum hendrerit felis aliquet et hac. Non mi fringilla duis in non. Mi eros a quam suspendisse. Nibh tortor tincidunt in nulla convallis hendrerit mauris eleifend.</p>
          <p className="text-gray-700 text-sm leading-relaxed">Lectus eget sapien nisl egestas tincidunt nunc diam. Turpis vel ipsum vestibulum amet nibh. In nunc elementum accumsan interdum eu commodo suspendisse. Viverra egestas nisl ac porttitor. Nullam pretium duis lacus at. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.</p>
        </section>

      </main>
    </ContentWrapper>
  );
}
