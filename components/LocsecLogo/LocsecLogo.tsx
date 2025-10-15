"use client";
import Image from "next/image"

export default function LocsecLogo() {
  return(

     <div className="flex flex-row items-center justify-center flex-1 mt-2">
              <Image
                src="/icons/lock-logo.png"
                alt="Locksec"
                width={44}
                height={44}
                className="mb-4"
                priority
              />
    
              <h2 className="font-bold text-2xl md:text-[32px] text-[#FFFFFF] pb-2">
                Lock<span className="text-[#375DFB]">Sec</span>
              </h2>
            </div>
  )
}