"use client";
import Image from "next/image"

export default function LocsecVcode() {
  return(

     <div className="flex flex-row items-center  flex-1 ">
              <Image
                src="/icons/lock-logo.png"
                alt="Locksec"
                width={24}
                height={24}
                className="mb-4"
                priority
              />
    
              <h2 className="font-bold text-2xl md:text-[16px] text-[#FFFFFF] pb-2">
                Lock<span className="text-[#375DFB]">Sec</span>
              </h2>
            </div>
  )
}