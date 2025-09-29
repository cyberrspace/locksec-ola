"use client";

import UserLine from "./UserLine";
import GenerateCode from "./GenerateCode";
import EstateBills from "./EstateBills";
import HistoryCard from "./HistoryCard";
import ProfileCard from "./ProfileCard";
import HorizontalLine from "./horizontalLine";

export default function UserBody(){
  return(
    <main className="  min-h-screen  px-4 py-6 space-y-6">
    <section className=" items-center  rounded-[15.38px] opacity-100
     w-[345px]  h-[163px] bg-[#313F57] space-y-12 p-4 "
        >
        <div className="flex flex-row  justify-between gap-6 text-[14px] font-medium text-[#92B2F2]" >
          <div> <p >Active code</p></div>
          <div> <p>Amount Due</p></div>
         
        </div>
        <div className="flex text-[42.77px] font-bold text-[#92B2F2] justify-between items-center">
          <p>0</p>
         <UserLine/>
          <p>₦28,000</p>
        </div>
      </section>

      <section className="flex items-center justify-between ">
         <GenerateCode/>
         <EstateBills/>
        
      </section>

      <section className="flex items-center justify-between ">
      <HistoryCard/>
      <ProfileCard/>
      </section>
      <HorizontalLine/>
    </main>
  )
}