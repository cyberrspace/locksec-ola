"use client";

import BackButton from "../common/BackButton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { requestResetCode } from "@/services/auth";
import { getAxiosErrorMessage } from "@/lib/getAxiosError";
import { forgotPassword } from "@/services/auth";



// TEMP FIX: Remove broken imports and replace with safe local functions




export default function ForgotPassEmail() {
  const router = useRouter();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState<string>("");

  // Load email from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resetEmail");
    if (saved) setEmail(saved);
  }, []);


  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle 6-digit code input
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError("");

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      } else if (!value && index > 0) {
        document.getElementById(`code-${index - 1}`)?.focus();
      }
    }
  };

  // Verify the code
  const handleVerify = async () => {
    const codeEntered = code.join("");

    if (codeEntered.length !== 6) {
      setError("Enter the 6-digit code sent to your email");
      return;
    }

    try {
      setLoading(true);

      const res = await requestResetCode(codeEntered);

      // Store verified reset token for next step
      localStorage.setItem("verifiedResetToken", res.data.resetToken);

      router.push("/reset-password");
    } catch (err: unknown) {
      setError(getAxiosErrorMessage(err, "Invalid or expired verification code"));
    } finally {
      setLoading(false);
    }
  };


  // Resend verification
  const handleResend = async () => {
    if (!email) {
      setError("Email not found. Please restart password recovery.");
      return;
    }

    try {
      setResendLoading(true);
      await forgotPassword(email);
      setTimer(30);
    } catch (err) {
      setError(getAxiosErrorMessage(err, "Failed to resend code"));
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

        <p className="text-[#D1D1D1] text-[15px]">A Token has been sent to your Email</p>
        
        {/* Email */}
        



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

        <div className="text-[#D1D1D1] text-[14px] mt-2">
          Didn’t get the code?
          {timer > 0 ? (
            <span className="ml-1 text-[#888]">Resend in {timer}s</span>
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
