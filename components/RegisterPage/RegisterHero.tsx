"use client";

import BackArrow from "./LoginBack";
import LoginUser from "./LoginUser";

export default function RegisterHero(){
  return(
    <main className="h-[219px] px-2 sm:px-4 flex flex-col items-center ">
      <section className="w-[327px] h-[119px] space-y-4">
        <div>
          <BackArrow />
        </div>
        <div>
          <p className="text-white font-bold text-[32px]">Register</p>
          <div className="flex items-center gap-2">
            <p className="text-white">Already have an account?</p>
            <LoginUser />
          </div>
        </div>
        
        
      </section>
    </main>
   


  )
}