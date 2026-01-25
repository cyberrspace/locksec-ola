// src/lib/getAxiosError.ts
export function getAxiosErrorMessage(err: unknown, defaultMessage = "Something went wrong") {
  try {
    if (err instanceof Error) return err.message;
    if (err && typeof err === "object" && "response" in err) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      return errorObj.response?.data?.message || defaultMessage;
    }
    return defaultMessage;
  } catch {
    return defaultMessage;
  }
}
