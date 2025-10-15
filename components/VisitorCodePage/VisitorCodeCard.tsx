"use client";

import QRCode from "react-qr-code";
import LocsecLogo from "../LocsecLogo/LocsecLogo";
import LocsecVcode from "./LocsecVcode";

interface VisitorCodeCardProps {
  code: string;
  validFrom: string;
  validUntil: string;
  address: string;
  visitorType: string;
  visitorsCount: string;
  visitorName: string;
  plateNumber: string;
}

export default function VisitorCodeCard({
  code,
  validFrom,
  validUntil,
  address,
 }: VisitorCodeCardProps) {
  return (
   
      <div className="w-[320px] bg-[#E9E8F2]  h-screen rounded-2xl shadow-lg overflow-hidden mx-auto">
        <div className="bg-[#122E28] text-center py-4 rounded-2xl mt-4">
          <p className="text-white text-sm">Your Visitor Code is</p>
          <h1 className="text-[#B8FF61] text-4xl font-extrabold tracking-widest">{code}</h1>
        </div>

        <div className="bg-[#FFFFFF] text-sm text-[#1C1C1C] px-2 rounded-b-2xl pb-2">
          <div >
            <div className="flex justify-between">
              <b>Valid from:</b>
              <p>{validFrom}</p>
            </div>

            <div className="flex justify-between">
              <b>Until:</b>
              <p>{validUntil}</p>
            </div>

            <div className="flex justify-between">
              <b>Address:</b>
              <p>{address}</p>
            </div>
          </div>

        </div>

        <div className="bg-[#E9E8F2] px-5 pb-2 mt-4 flex flex-row items-center">
          <div className="bg-white rounded-[8px] p-3 shadow-sm">
            <QRCode value={"https://venco.africa"} size={130} />
          </div>
          <p className="text-[#122E28] bg-lime-300 rounded-md px-3 py-1 mt-2 text-sm font-medium">
            Scan the QR Code for quicker access
          </p>

        </div>
        <LocsecLogo />

        <div className="flex items-center justify-center">
          <p className="text-black font-bold text-[16px]">Empowering execptional communities</p>
        </div>

        <div className="text-[12px] flex items-center gap-2 pb-4 pt-4 justify-center">
          <div className="bg-lime-300 w-[60px] flex flex-col items-center justify-center rounded-md">
            <p className="">Access</p>
          <p className="">Control</p>
          </div>

        <div className="bg-lime-300 w-[60px] flex flex-col items-center justify-center rounded-md">
          <p className="">Smart</p>
          <p className="">Meters</p>
        </div>

        <div className="bg-lime-300 w-[60px] flex flex-col items-center justify-center rounded-md">
          <p className="">Utilities</p>
          <p className="">Vending</p>
        </div>

        <div className="bg-lime-300 w-[60px] flex flex-col items-center justify-center rounded-md">
          <p className="">Dues</p>
          <p className="">Collection</p>
        </div>
        </div>

      <div className="flex items-center gap-2 px-4">
        <p className="flex ">Powered by: <LocsecVcode /></p> <a className="text-black text-[12px]" href="#">www.locsec.com.africa</a></div>
      </div>

   
    
  );
}
