"use client";


import BackArrow from "../RegisterPage/LoginBack";

export default function CodeHero() {
  

  return (
    <section className="h-[219px] bg-[#0D0D1B] w-full md:w-[375px] flex flex-col justify-center px-4 space-y-10">
      <div className="-mt-10">
        
        <BackArrow to="/user" />
       
      </div>

      <div className="text-[#FFFFFF] font-bold text-[32px]">
        <p>Code Successfully</p>
        <p>Generated</p>
      </div>
    </section>
  );
}
