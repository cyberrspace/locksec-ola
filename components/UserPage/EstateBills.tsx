"use client";
import Image from "next/image";

export default function EstateBills(){
  return(
    <div className="bg-[#574B2F] h-[163px] w-[163px] rouded-[15.38px] p-4 space-y-12">
         <Image
         src="/icons/bill-bg.png"
         alt="Genarate"
         width={23}
         height={23}
         />
         <div className="text-[#F6D775] text-[16px] font-medium">
        <p>Make</p>
        <p>Estate Bills</p>
         </div>
         
        </div>

  )
}