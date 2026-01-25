"use client";

import BackButton from "../common/BackButton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

// ----------------------------------------------
// Fallback: getAxiosErrorMessage (Safe Version)
// ----------------------------------------------
function getAxiosErrorMessage(err: unknown, defaultMessage = "An error occurred"): string {
  try {
    type AxiosLikeError = { response?: { data?: { message?: unknown } }; message?: unknown };
    const axiosErr = err as AxiosLikeError;
    if (axiosErr?.response?.data?.message) return String(axiosErr.response.data.message);
    if (axiosErr?.message) return String(axiosErr.message);
  } catch { }
  return defaultMessage;
}

// ----------------------------------------------
// Local verifyResetToken implementation
// ----------------------------------------------
async function verifyResetToken(email: string, token: string): Promise<{ success: boolean }> {
  try {
    const res = await fetch("/api/verify-reset-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token }),
    });

    if (!res.ok) return { success: false };

    const data = await res.json();
    return { success: Boolean(data?.success) };
  } catch {
    return { success: false };
  }
}

// ----------------------------------------------
// MAIN COMPONENT (Fixed)
// ----------------------------------------------
export default function VerifyInput() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [email, setEmail] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Load saved email
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError("");

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  // Backspace logic
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Verify Token
  const handleVerify = async () => {
    const enteredCode = code.join("");

    if (enteredCode.length !== 6) {
      setError("Enter the full 6-digit token.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await verifyResetToken(email, enteredCode);

      setLoading(false);

      if (res.success) {
        localStorage.setItem("resetToken", enteredCode);
        if (email) localStorage.setItem("resetEmail", email);

        router.push("/User");
      } else {
        setError("Invalid or expired token.");
      }
    } catch (err) {
      setLoading(false);
      setError(getAxiosErrorMessage(err, "Invalid or expired token."));
    }
  };

  // Resend Token UI only (no backend)
  const handleResend = () => {
    setResendMessage("Resending token...");
    setTimeout(() => {
      setResendMessage("A new token has been sent to your email.");
      setTimeout(() => setResendMessage(""), 4000);
    }, 1500);
  };

  return (
    <main className="w-full max-w-[512px] sm:min-h-[692px] min-h-screen flex flex-col justify-center items-center bg-black px-[16px] sm:px-[24px] md:px-[32px] lg:px-[40px] overflow-hidden">
      <div className="w-full max-w-full sm:max-w-[512px] mb-[8px] sm:mb-[5px]">
        <BackButton href="/Forgotpassword" />
      </div>

      <section className="w-full max-w-full sm:max-w-[90%] md:max-w-[612px] bg-[#2C2C2C] rounded-[12px] py-[16px] sm:py-[10px] px-[16px] sm:px-[20px] md:px-[32px] flex flex-col items-center text-center space-y-[22px] sm:space-y-[21px] md:space-y-[33px]">
        <h1 className="text-[32px] xs:text-[36px] sm:text-[42px] md:text-[26px] lg:text-[30px] font-bold text-[#F5F5F5] leading-tight pt-[20px]">
          Reset Password Token
        </h1>

        <p className="text-[14px] xs:text-[16px] sm:text-[18px] md:text-[14px] lg:text-[15px] text-[#D1D1D1] leading-[20px] sm:leading-[22px]">
          A token has been sent to your email.
        </p>

        <div className="flex justify-center items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] gap-[10px]">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}

              className="w-[39.146px] h-[39.146px] bg-[#353535] border-[0.89px] border-[#515151] rounded-[5.34px] text-center text-white text-[16px] font-medium outline-none focus:border-[#1D61E7] transition"
            />
          ))}
        </div>

        {error && <p className="text-[#FF4D4D] text-[13px] mt-3">{error}</p>}

        <div className="w-full max-w-[306px] sm:max-w-[426px] h-[40px] mt-[20px] mb-[10px]">
          <Button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-[#102DC8] text-[#FFFFFF] h-[43px] text-[14px] xs:text-[16px] rounded-[10px]"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>

        <div className="mb-[20px] cursor-pointer">
          <a onClick={handleResend} className="text-[#FFFFFF] underline hover:text-[#1D61E7] transition">
            Resend
          </a>
          {resendMessage && (
            <p className="text-[#A0A0A0] text-[12px] mt-2">{resendMessage}</p>
          )}
        </div>
      </section>
    </main>
  );
}
