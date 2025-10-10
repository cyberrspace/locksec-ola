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
      <main className="space-y-4 px-4 py-4">
        <section className="flex items-center justify-between w-full">
          <h1 className="text-[#000000] text-[19px] font-bold">
            Terms of Service
          </h1>

          {/* Cancel Toggle Button */}
          <button
            onClick={() => router.push("/register")}
            className="flex items-center justify-center px-4 py-1 text-[13px] font-semibold text-[#000000] transition-all duration-300"
          >
            X
          </button>
        </section>
         
        <section className="space-y-2" >
          <div>
            <h3 className="text-[#000000] text-[17px] font-bold">Terms of Service</h3>
            <p className="text-[#989898] text-[12px] font-normal">
              Last Updated {lastUpdated}.
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-[#000000] text-[17px] font-semibold">Introduction</h2>
          <p className="text-[#474747] text-[11.9px] font-normal">Vulputate odio turpis mattis porttitor. Risus scelerisque sit sagittis urna. At sem est aenean scelerisque velit id odio urna. Amet urna sociis sed tincidunt ut. Dui posuere mattis diam convallis nullam dictum. Morbi velit feugiat nibh viverra ornare aliquam libero. Accumsan condimentum nulla donec vel tortor. Orci nisi commodo massa at. Lobortis etiam nulla diam cursus elit id consequat ut.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[#000000] text-[17px] font-semibold">Service Provider</h2>
          <p className="text-[#474747] text-[11.9px] font-normal">Nulla morbi auctor lorem tempus elementum rhoncus. Augue tortor habitant suspendisse ultricies ac feugiat amet cursus mattis.</p>
          <p className="text-[#474747] text-[11.9px] font-normal">Orci nisi commodo massa at. Lobortis etiam nulla diam cursus elit id consequat ut.</p>
          <p className="text-[#474747] text-[11.9px] font-normal">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed qu.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[#000000] text-[17px] font-semibold">Age requirement</h2>
          <p>Sed egestas mauris lacus dignissim aenean vel. Imperdiet eu blandit gravida elementum hendrerit felis aliquet et hac. Non mi fringilla duis in non. Mi eros a quam suspendisse. Nibh tortor tincidunt in nulla convallis hendrerit mauris eleifend.</p>
          <p>Lectus eget sapien nisl egestas tincidunt nunc diam. Turpis vel ipsum vestibulum amet nibh. In nunc elementum accumsan interdum eu commodo suspendisse. Viverra egestas nisl ac porttitor. Nullam pretium duis lacus at. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-[#000000] text-[17px] font-semibold">Age requirement</h2>
          <p>Sed egestas mauris lacus dignissim aenean vel. Imperdiet eu blandit gravida elementum hendrerit felis aliquet et hac. Non mi fringilla duis in non. Mi eros a quam suspendisse. Nibh tortor tincidunt in nulla convallis hendrerit mauris eleifend.</p>
          <p>Lectus eget sapien nisl egestas tincidunt nunc diam. Turpis vel ipsum vestibulum amet nibh. In nunc elementum accumsan interdum eu commodo suspendisse. Viverra egestas nisl ac porttitor. Nullam pretium duis lacus at. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatu.</p>
        </section>
      </main>
   
    </ContentWrapper>
  );
}
