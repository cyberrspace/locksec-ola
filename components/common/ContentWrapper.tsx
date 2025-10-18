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
        max-w-md 
        min-h-screen 
        rounded-[9px] 
        bg-white 
        shadow-md 
        mx-auto 
        px-4 sm:px-6 md:px-8 
      "
      style={{ transform: "rotate(0deg)" }}
    >
      {children}
    </div>
  );
}
