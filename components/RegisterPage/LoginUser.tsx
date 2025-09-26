"use client";

import { useRouter } from "next/navigation";

export default function LoginUser() {
  const router = useRouter();

  return (
    <div className="flex items-center ">
      {/* Login Text acting as a clickable link */}
      <p
        onClick={() => router.push("/")}
        className="text-blue-600 text-xl font-semibold cursor-pointer hover:underline"
      >
        Login
      </p>
    </div>
  );
}
