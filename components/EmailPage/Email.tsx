"use client";

import BackButton from "../common/BackButton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  verifyEmail,
  resendVerification,
} from "@/services/auth";

import { getAxiosErrorMessage } from "@/lib/getAxiosError";

export default function EmailVerificationPage() {
  const router = useRouter();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState<string>("");

  /* ================= LOAD EMAIL ================= */
  useEffect(() => {
    const savedEmail = localStorage.getItem("pendingEmail");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  /* ================= COUNTDOWN ================= */
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  /* ================= INPUT HANDLER ================= */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...code];
    updated[index] = value;
    setCode(updated);
    setError("");

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    } else if (!value && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  /* ================= VERIFY EMAIL ================= */
  const handleVerify = async () => {
    const verificationToken = code.join("");

    if (verificationToken.length !== 6) {
      setError("Enter the 6-digit code sent to your email");
      return;
    }

    try {
      setLoading(true);

      await verifyEmail(verificationToken);

      // ✅ verification successful
      localStorage.removeItem("pendingEmail");
      router.push("/login");
    } catch (err) {
      setError(
        getAxiosErrorMessage(err, "Invalid or expired verification code")
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESEND CODE ================= */
  const handleResend = async () => {
    if (!email) {
      setError("Email not found. Please register again.");
      return;
    }

    try {
      setResendLoading(true);

      await resendVerification(email);

      setTimer(30);
      setError("");
    } catch (err) {
      setError(
        getAxiosErrorMessage(err, "Failed to resend verification code")
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <main className="w-full max-w-[512px] sm:min-h-[692px] min-h-screen flex flex-col justify-center items-center bg-black px-[16px] sm:px-[24px] md:px-[32px] lg:px-[40px] overflow-hidden">
      <div className="w-full max-w-full sm:max-w-[512px] mb-[8px] sm:mb-[5px]">
        <BackButton href="/" />
      </div>

      <section className="w-full max-w-full sm:max-w-[90%] md:max-w-[612px] bg-[#2C2C2C] rounded-[12px] p-[55px] py-[16px] sm:py-[10px] px-[16px] sm:px-[20px] md:px-[32px] flex flex-col items-center text-center space-y-[22px] sm:space-y-[21px] md:space-y-[33px]">
        <h1 className="text-[32px] xs:text-[36px] sm:text-[42px] md:text-[26px] lg:text-[30px] font-bold text-[#F5F5F5] pt-[20px]">
          Verify your Email
        </h1>

        <p className="text-[#D1D1D1] text-[15px]">
          A token has been sent to your email
        </p>

        {/* CODE INPUT */}
        <div className="flex justify-center items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] gap-[10px]">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-[39px] h-[39px] bg-[#353535] border border-[#515151] rounded-[5px] text-center text-[#F5F5F5] text-[16px] outline-none focus:border-[#1D61E7]"
            />
          ))}
        </div>

        {error && <p className="text-[#FF4D4D] text-[13px]">{error}</p>}

        {/* RESEND */}
        <div className="text-[#D1D1D1] text-[14px] mt-2">
          Didn’t get the code?
          {timer > 0 ? (
            <span className="ml-1 text-[#888]">
              Resend in {timer}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="ml-1 text-[#1D61E7] underline"
            >
              {resendLoading ? "Resending..." : "Resend Code"}
            </button>
          )}
        </div>

        {/* VERIFY BUTTON */}
        <div className="w-full max-w-[306px] h-[40px] mt-[20px] mb-[20px]">
          <Button
            disabled={loading}
            onClick={handleVerify}
            className="w-full bg-[#102DC8] text-white h-[40px] text-[16px] rounded-[10px]"
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </section>
    </main>
  );
}
