"use client";
import Image from "next/image";
import SignUpLink from "./SignUp";

export default function LoginHero() {
  return (
    <section className="w-full md:w-[375px]  h-[265px] space-y-[7rem]">
      
      <div className="flex flex-row flex-1 gap-2 -mt-8"> 
        <Image
          src="/icons/lock-logo.png"
          alt="Locksec"
          width={44}
          height={44}
          className="mb-2"  
          priority
        />

        <h2 className="font-bold text-2xl md:text-[32px] text-[#FFFFFF] w-[95.65px] h-[35.78px]">
          Lock<span className="text-[#375DFB]">Sec</span>
        </h2>
      </div>

      <div className="w-[327px] h-[84px] opacity-100 rotate-0 space-y-2">
        <p className="font-inter font-bold text-[32px] leading-[130%] tracking-[-0.02em] align-middle text-[#FFFFFF]">
          Sign in to your 
        </p>
        <p className="font-inter font-bold text-[32px] leading-[130%] tracking-[-0.02em] align-middle text-[#FFFFFF]">account</p>
        <div className="flex flex-row items-center mt-0 gap-2 mb-2">
          <p className="font-inter font-medium text-[12px] leading-[130%] tracking-[-0.02em] text-[#FFFFFF]">
            Dont have an account?
          </p>
          <SignUpLink />
        </div>
      </div>
    </section>
  );
}
