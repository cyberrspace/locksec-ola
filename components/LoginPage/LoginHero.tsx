"use client";
 import Image from "next/image";
import SignUpLink from "./SignUp";

export default function LoginHero(){
 return(
 <section className=" px-4 space-y-10">
    <div className="flex flex-row flex-1 gap-2 pt-16">
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
          <div className="w-[327px] h-[84px] opacity-100 rotate-0 space-y-4">
       <p className="font-inter font-bold text-[32px] leading-[130%] tracking-[-0.02em] align-middle text-[#FFFFFF]">Sign in to your account</p>
       <div className="flex flex-row items-center mt-0 gap-2">
         <p className="font-inter font-medium text-[12px] leading-[130%] tracking-[-0.02em]  text-[#FFFFFF]">Dont have an account? </p>
         <SignUpLink/>
       </div>
      
           </div>
 </section>

 )

}