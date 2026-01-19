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
    const text = await res.text();
    throw new Error(`Registration failed (${res.status}): ${text}`);
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got:\n${text}`);
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
    const text = await res.text();
    throw new Error(`Login failed (${res.status}): ${text}`);
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got:\n${text}`);
  }

  return (await res.json()) as LoginResponse;
}

/* ===================== VERIFY EMAIL ===================== */
/**
 * POST /auth/verify-email
 * Body: { verificationToken: string }
 */

export interface VerifyEmailResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    _id: string;
    email: string;
    isVerified: boolean;
    verificationToken: string;
    verificationTokenExpiresAt: string;
    role: string;
    status: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function verifyEmail(
  verificationToken: string
): Promise<VerifyEmailResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/verify-email`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verificationToken }),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.message || "Invalid or expired verification code");
    }
    const text = await res.text();
    throw new Error(`Verification failed (${res.status}): ${text}`);
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got:\n${text}`);
  }

  return (await res.json()) as VerifyEmailResponse;
}

/* ===================== RESEND VERIFICATION ===================== */
/**
 * POST /auth/resend-verification
 * Body: { email: string }
 */

export interface ResendVerificationResponse {
  success: boolean;
  status: number;
  message: string;
  data: string; // verification code
}

export async function resendVerification(
  email: string
): Promise<ResendVerificationResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/resend-verification`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.message || "Failed to resend verification code");
    }
    const text = await res.text();
    throw new Error(`Resend failed (${res.status}): ${text}`);
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got:\n${text}`);
  }

  return (await res.json()) as ResendVerificationResponse;
}

/* ===================== FORGOT PASSWORD ===================== */

export interface ForgotPasswordResponse {
  success: boolean;
  status: number;
  message: string;
  data: string;
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

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.message || "Failed to send reset code");
    }
    const text = await res.text();
    throw new Error(`Failed (${res.status}): ${text}`);
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got:\n${text}`);
  }

  return (await res.json()) as ForgotPasswordResponse;
}

/* ===================== RESET PASSWORD ===================== */

export interface ResetPasswordResponse {
  success: boolean;
  status: number;
  message: string;
  data: object;
}

export async function resetPassword(
  userId: string,
  newPassword: string
): Promise<ResetPasswordResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/reset-password/${userId}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPassword }),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.message || "Password reset failed");
    }
    throw new Error("Password reset failed");
  }

  return (await res.json()) as ResetPasswordResponse;
}
