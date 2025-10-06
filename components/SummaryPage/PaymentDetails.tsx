"use client";

export default function PaymentDetails(){
  
  return(
    <section className="min-h-screen bg-[#FFFFFF] text-white  items-center px-4 py-10">
   
   <div className="">
    <div>
          <p className="text-[#6C7278]">Type of Bill</p>
          <p className="text-[#1A1C1E]">Estate Dues</p>
    </div>

        <div>
          <p className="text-[#6C7278]">Apartment</p>
          <p className="text-[#1A1C1E]">Apt 12B Road M</p>
        </div>
   </div>

      <div className="">
        <div>
          <p className="text-[#6C7278]">NO. of Month(s) </p>
          <p className="text-[#1A1C1E]">3</p>
        </div>

        <div>
          <p className="text-[#6C7278]">3 Months Amt.</p>
          <p className="text-[#1A1C1E]">#84,000</p>
        </div>

        <div>
          <p className="text-[#6C7278]">Service Charge</p>
          <p className="text-[#1A1C1E]">#100</p>
        </div>
      </div>


      <div className="">
        <p className="text-[#6C7278]">Total Amt.</p>
        <p className="text-[#1A1C1E]">#84100</p>
      </div>

  </section>

  )

}