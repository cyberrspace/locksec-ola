"use client";

import BackArrow from "../RegisterPage/LoginBack";

export default function AccessHero(){
  return(
    <section className="h-[219px] bg-[#0D0D1B] w-[375px] flex flex-col justify-center px-4 space-y-10">
      <div className="">
        <BackArrow/>
        <div className="text-[#FFFFFF] font-bold text-[32px]">
          <p>Generate</p>
          <p>Access Code</p>
        </div>
      </div>
    
      
    </section>
  )
}