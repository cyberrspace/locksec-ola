"use client";

import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div
      className="w-[375px]  min-h-screen rounded-[9px] opacity-100 bg-white shadow-md mx-auto"
      style={{ transform: "rotate(0deg)" }}>
      {children}
    </div>
  );
}
