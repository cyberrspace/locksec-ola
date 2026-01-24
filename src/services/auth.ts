// src/services/auth.ts

/* ===================== COMMON ===================== */

function getApiBase(): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_BASE_URL is not defined. Check your .env.local file."
    );
  }

  return base.replace(/\/+$/, "");
}

/* ===================== REGISTER ===================== */

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  role: "businessOwner" | "resident";
  phoneNumber: string;
  moveInDate: string;
  businessName?: string;
  industryType?: string;
  estateId: string;
}

export interface RegisterResponse {
  success: boolean;
  status: number;
  message: string;
  data: unknown;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/register`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.message || "Registration failed");
    }
    throw new Error(`Registration failed (${res.status})`);
  }

  return (await res.json()) as RegisterResponse;
}

/* ===================== LOGIN ===================== */

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    token: string;
    user: {
      _id: string;
      email: string;
      role: string;
      firstName: string;
      lastName: string;
      isVerified: boolean;
      status: "active" | "inactive";
      phoneNumber: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export async function loginUser(
  payload: LoginPayload
): Promise<LoginResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.message || "Login failed");
    }
    throw new Error(`Login failed (${res.status})`);
  }

  return (await res.json()) as LoginResponse;
}

/* ===================== VERIFY EMAIL ===================== */

export async function verifyEmail(verificationToken: string) {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/verify-email`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verificationToken }),
  });

  if (!res.ok) {
    throw new Error("Invalid or expired verification code");
  }

  return res.json();
}

/* ===================== RESEND VERIFICATION ===================== */

export async function resendVerification(email: string) {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/resend-verification`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Failed to resend verification code");
  }

  return res.json();
}

/* ===================== FORGOT PASSWORD ===================== */

export interface ForgotPasswordResponse {
  success: boolean;
  status: number;
  message: string;
 
  data: {
    resetToken: string;
  };
}

export async function forgotPassword(
  email: string
): Promise<ForgotPasswordResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/forgot-password`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Failed to send reset code");
  }

  return (await res.json()) as ForgotPasswordResponse;
}

/* ===================== RESET PASSWORD ===================== */

export async function resetPassword(
  userId: string,
  newPassword: string
) {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/reset-password/${userId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword }),
  });

  if (!res.ok) {
    throw new Error("Password reset failed");
  }

  return res.json();
}

/* ============================================================
   ✅ FIX #1 (IMPORTANT)
   We export an ALIAS so existing UI code can use requestResetCode
   without changing backend logic.
   ============================================================ */

export const requestResetCode = forgotPassword;
