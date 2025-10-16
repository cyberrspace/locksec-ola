"use client";

import { useEffect, useState } from "react";
import { MapPin, Download } from "lucide-react";

// Type for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

// UserData interface
interface UserData {
  lastName: string;
  address: string;
}

export default function UserHero() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null); // store install event
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Retrieve stored user data
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUserData(JSON.parse(stored));
    }

    // Listen for the PWA install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // Prevent auto prompt
      setDeferredPrompt(e as BeforeInstallPromptEvent); // Save the event for later
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Handle install button click
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); // show install prompt

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    setDeferredPrompt(null);
    setIsInstallable(false);
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

          {/* Download (Install App) Button */}
          <button
            onClick={handleInstallClick}
            disabled={!isInstallable}
            className={`flex items-center justify-center
                        w-[37.29px] h-[37.29px]
                        rounded-full transition cursor-pointer
                        ${isInstallable ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-blue-500 cursor-not-allowed"}`}
            title={isInstallable ? "Install App" : "App already installed"}
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
