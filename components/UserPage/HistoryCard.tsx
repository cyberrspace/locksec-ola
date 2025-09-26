"use client";
import Image from "next/image";

export default function HistoryCard(){
  return(
<div className="bg-[#324438] h-[163px] w-[163px] rouded-[15.38px] p-4 space-y-12">
         <Image
         src="/icons/Generate.png"
         alt="Genarate"
         width={23}
         height={23}
         />
      <div className="text-[#91C799] text-[16px] font-medium">
            <p>Generate</p>
            <p>Access code</p>
         </div>
         
        </div>

  )
}