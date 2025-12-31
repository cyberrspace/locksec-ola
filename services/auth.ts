// src/services/auth.ts

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
}

export interface RegisterResponse {
  success: boolean;
  status: number;
  message: string;
  data: unknown;
}

function getApiBase(): string {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  if (!base) {
    throw new Error(
      "NEXT_PUBLIC_BASE_URL is not defined. Check your .env.local file."
    );
  }

  // remove trailing slash if any
  return base.replace(/\/+$/, "");
}

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/register`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type") || "";

  
  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const errJson = await res.json();
      throw new Error(errJson?.message || "Registration failed");
    } else {
      const text = await res.text();
      throw new Error(
        `Registration failed (status ${res.status}). Server returned HTML:\n${text}`
      );
    }
  }

  // ✅ success but must be JSON
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(
      `Expected JSON but backend returned non-JSON response:\n${text}`
    );
  }

  return (await res.json()) as RegisterResponse;
}

// src/services/auth.ts

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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const errJson = await res.json();
      throw new Error(errJson?.message || "Login failed");
    } else {
      const text = await res.text();
      throw new Error(`Login failed (${res.status}): ${text}`);
    }
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got:\n${text}`);
  }

  return (await res.json()) as LoginResponse;
}

// src/services/auth.ts

export interface ForgotPasswordResponse {
  success: boolean;
  status: number;
  message: string;
  data: string; // reset code
}


export async function forgotPassword(
  email: string
): Promise<ForgotPasswordResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/forgot-password`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const errJson = await res.json();
      throw new Error(errJson?.message || "Failed to send reset code");
    } else {
      const text = await res.text();
      throw new Error(`Failed (${res.status}): ${text}`);
    }
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON but got:\n${text}`);
  }

  return (await res.json()) as ForgotPasswordResponse;
}

// src/services/auth.ts

export interface RequestCodeResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    _id: string;
    email: string;
    resetToken: string;
    resetTokenExpiresAt: string;
  };
}

export async function requestResetCode(
  resetToken: string
): Promise<RequestCodeResponse> {
  const API_BASE = getApiBase();
  const url = `${API_BASE}/auth/request-code`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resetToken }),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const err = await res.json();
      throw new Error(err?.message || "Invalid or expired code");
    }
    throw new Error("Invalid or expired code");
  }

  return (await res.json()) as RequestCodeResponse;
}


// src/services/auth.ts

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
    headers: {
      "Content-Type": "application/json",
    },
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
