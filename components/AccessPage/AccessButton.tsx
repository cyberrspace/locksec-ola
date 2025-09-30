"use client";

import React from "react";

interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function AccessButton({
  label,
  onClick,
  className,
  disabled,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`w-[327px] h-[46px] bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
}
