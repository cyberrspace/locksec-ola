"use client";

import React from "react";

interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function SubmitButton({
  label,
  onClick,
  className,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-[327px] h-[46px] bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold  ${className}`}
    >
      {label}
    </button>
  );
}
