"use client";

import BackArrow from "./LoginBack";
import LoginUser from "./LoginUser";

export default function RegisterHero(){
  return(
    <main className="h-[219px] px-2 sm:px-4 mt-6">
      <section className="w-[327px] h-[119px]">
        <BackArrow />
        <p className="text-white font-bold text-[32px] mt-4">register</p>
        <div className="flex items-center gap-2">
         <p className="text-white">Already have an account?</p>
          <LoginUser/>
        </div>
        
      </section>
    </main>
   


  )
}