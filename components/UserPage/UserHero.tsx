"use client";

import { useEffect, useState } from "react";
import { MapPin, Download } from "lucide-react";

interface UserData {
  lastName: string;
  address: string;
}

export default function UserHero() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  return (
    <main >
      <section className="px-2 sm:px-4 mt-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center
                         w-[37.29px] h-[37.29px]
                         rounded-[9.32px]
                         border-[0.93px] border-[#D8D8D80D]"
            >
              <MapPin className="text-white w-[20px] h-[20px]" />
            </div>
            <div>
              <p className="text-[#808493] text-[11.19px]">Address</p>
              <p className="text-[#FFFFFF] text-[14.92px] font-bold">
                {userData?.address || "No address saved"}
              </p>
            </div>
          </div>

          <div
            className="flex items-center justify-center
                       w-[37.29px] h-[37.29px]
                       rounded-full bg-blue-600
                       cursor-pointer hover:bg-blue-700 transition"
          >
            <Download className="text-white w-[20px] h-[20px]" />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[#FFFFFF] font-bold text-[20.51px]">
            Hello, {userData?.lastName || "User"}.
          </p>
        </div>
      </section>
    </main>
  );
}
