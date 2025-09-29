"use client";

import LoginHorizontal from "./LoginHorizontal";



export default function LoginTerms(){
 return(
  <section className="flex flex-col items-center justify-center space-y-5">
     <div className="w-[297px] font-inter font-normal text-[12px]">
       <p>By signing up, you agree to the <span className="font-bold text-[#000000]">Terms of Service</span> and</p>
       <p className="flex flex-col items-center justify-center font-bold text-[#000000]">Data Processing Agreement</p>
     </div>
    <LoginHorizontal/>
 </section>
 
 )

}