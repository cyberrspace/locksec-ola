// services/accessCodes.ts
import axiosInstance from "@/lib/axios";

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

export interface AccessCode {
  _id: string;
  userId: string;
  code: string;
  victorType: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  numOfPeople: number;
  withVehicle: boolean;
  plateNum?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
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
    {
      withCredentials: true, // ✅ REQUIRED for auth cookies
    }
  );

  return res.data;
}

export async function getAccessCodeById(
  id: string
): Promise<ApiResponse<AccessCode>> {
  const res = await axiosInstance.get<ApiResponse<AccessCode>>(
    `/access-codes/${id}`,
    {
      withCredentials: true,
    }
  );

  return res.data;
}
