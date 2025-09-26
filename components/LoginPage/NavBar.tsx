"use client";

import { useEffect, useState } from "react";
import { Signal, Wifi, Battery } from "lucide-react";

export default function NavBar() {
  const [time, setTime] = useState<string>("");

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format like 12:45 or 09:03
      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formatted);
    };

    updateTime(); // run once immediately
    const timer = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="w-full h-10 flex items-center justify-between px-2 sm:px-4 bg-[#0D0D1B]">
      {/* ===== Left: Time ===== */}
      <span className="text-white text-xs sm:text-sm font-medium">{time}</span>

      {/* ===== Right: Icons ===== */}
      <div className="flex items-center space-x-2 sm:space-x-3 text-white">
        <Signal size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
        <Wifi size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
        <Battery size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
      </div>
    </nav>
  );
}
