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

export interface GetAccessCodeResponse {
  success: boolean;
  status: number;
  message: string;
  data: AccessCode;
}

export interface CreateAccessCodeResponse {
  success: boolean;
  status: number;
  message: string;
  data: AccessCode;
}


/* ================= API ================= */

export async function createAccessCode(payload: CreateAccessCodePayload) {
  const res = await axiosInstance.post<CreateAccessCodeResponse>(
    "/access-codes/",
    payload
  );
  return res.data;
}

export function getAccessCodeById(id: string) {
  return axiosInstance.get<GetAccessCodeResponse>(
    `/access-codes/${id}`
  );
}
