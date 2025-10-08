"use client";

import Image from "next/image";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContentWrapper from "@/components/common/ContentWrapper";

const LoadingPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /login after 2 seconds
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <ContentWrapper>
     
      <section
        className=" bg-cover bg-center bg-no-repeat w-full h-[812px] flex flex-col justify-between items-center px-4 py-6"
        style={{ backgroundImage: "url('/icon/locksecbg.jpg')" }}
      >

        {/* ===== Center Content ===== */}
        <div className="flex flex-col items-center justify-center flex-1">
          <Image
            src="/icons/lock-logo.png"
            alt="Locksec"
            width={44}
            height={44}
            className="mb-4"
            priority
          />

          <h2 className="font-bold text-2xl md:text-[32px] text-[#FFFFFF]">
            Lock<span className="text-[#375DFB]">Sec</span>
          </h2>
        </div>

        {/* ===== Bottom Content ===== */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-[#EEEEEE]">
            Powered By <span className="text-[#FFFFFF]">int+</span>
          </p>
          <div className="w-[148px] h-[5px] bg-[#FFFFFF]" />
        </div>
      </section>
    </ContentWrapper>
  );
};

export default LoadingPage;


