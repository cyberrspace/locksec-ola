"use client";

import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div
      className="
        w-full 
        md:w-[375px] 
        min-h-screen 
        bg-white 
        shadow-md 
        mx-auto 
        rounded-none md:rounded-[9px]
        px-0 sm:px-0
      "
      style={{ transform: "rotate(0deg)" }}
    >
      {children}
    </div>
  );
}
