"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LoginButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/user")}
      className="w-[327px] h-[48px] rounded-[10px] border border-[#1D61E7]
                  py-[10px] text-white font-inter font-semibold
                 flex items-center justify-center
                 bg-[linear-gradient(0deg,#1D61E7,#1D61E7),linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)]
                 hover:opacity-90 transition "
    >
      Login
    </Button>
  );
}
