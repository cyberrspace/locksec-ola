"use client";

import { useRouter } from "next/navigation";

export default function SignUpLink() {
  const router = useRouter();

  return (
    <span
      onClick={() => router.push("/register")}
      className="cursor-pointer underline text-[#4D81E7] underline-offset-2 hover:opacity-80 transition"
    >
      Sign Up
    </span>
  );
}
