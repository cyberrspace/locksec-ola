"use client";

import { useEffect, useState } from "react";
import { MapPin, Download } from "lucide-react";

// Define the BeforeInstallPromptEvent type
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

interface UserData {
  lastName: string;
  address: string;
}

export default function UserHero() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUserData(JSON.parse(stored));
    }

    // Listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("Install prompt not available yet. Try refreshing the page.");
      return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("✅ User accepted the install prompt");
    } else {
      console.log("❌ User dismissed the install prompt");
    }

    setDeferredPrompt(null);
  };

  return (
    <main className="h-[219px] w-full flex items-center justify-center -mt-4">
      <section className="w-full px-2 sm:px-4 pb-4">
        <div className="flex justify-between items-center">
          {/* Address Section */}
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

          {/* Install App Button */}
          <button
            onClick={handleInstallClick}
            className="flex items-center justify-center
                       w-[37.29px] h-[37.29px]
                       rounded-full bg-blue-600
                       hover:bg-blue-700 cursor-pointer transition"
          >
            <Download className="text-white w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Greeting */}
        <div className="pt-4">
          <p className="text-[#FFFFFF] font-bold text-[20.51px]">
            Hello, {userData?.lastName || "User"}.
          </p>
        </div>
      </section>
    </main>
  );
}
