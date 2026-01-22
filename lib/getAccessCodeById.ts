// lib/getAccessCodeById.ts

import { AccessCode } from "@/types/accessCode";

export async function getAccessCodeById(id: string): Promise<AccessCode> {
  const res = await fetch(`/api/access/${id}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch access code");
  }

  const json = await res.json();

  // ✅ Return ONLY what the component needs
  return json.data.data as AccessCode;
}
