// services/accessCodes.ts

import axiosInstance from "../lib/axios";
import { AccessCode } from "@/types/AccessCode";


/* ================= TYPES ================= */

export interface CreateAccessCodePayload {
  victorType: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  numOfPeople: number;
  withVehicle: boolean;
  plateNum?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

/* ================= API ================= */

export async function createAccessCode(
  payload: CreateAccessCodePayload
): Promise<ApiResponse<AccessCode>> {
  const res = await axiosInstance.post<ApiResponse<AccessCode>>(
    "/access-codes",
    payload,
    { withCredentials: true }
  );

  return res.data;
}

export async function getAccessCodeById(
  id: string
): Promise<AccessCode> {
  const res = await axiosInstance.get<ApiResponse<AccessCode>>(
    `/access-codes/${id}`,
    { withCredentials: true }
  );

  // ✅ RETURN ONLY THE ACCESS CODE
  return res.data.data;
}
