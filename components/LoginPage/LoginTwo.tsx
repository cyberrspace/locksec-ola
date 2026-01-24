"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ForgotPasswordLink from "./ForgotPass";
import { useRouter } from "next/navigation";
import LoginTerms from "./LoginTerms";
import { loginUser } from "@/src/services/auth";


export default function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await loginUser({ email, password });

      //  Save token & user safely
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      //  Redirect based on role (optional but recommended)
      router.push("/User");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-6 w-full max-w-[327px] mx-auto"
    >
      {errorMsg && (
        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
      )}

      {/* ===== Email Input ===== */}
      <label>
        Email:
        <input
          type="email"
          placeholder="Email"
          className="w-[327px] h-[46px] rounded-[10px] border border-[#EDF1F3] px-[14px] text-sm outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      {/* ===== Password Input ===== */}
      <label>
        Password:
        <div className="relative w-[327px] h-[46px] rounded-[10px] border border-[#EDF1F3] flex items-center px-[14px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="flex-1 h-full text-sm outline-none bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </label>

      {/* ===== Remember Me + Forgot Pass ===== */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          Remember me
        </label>
        <ForgotPasswordLink />
      </div>

      {/* ===== Submit Button ===== */}
      <button
        type="submit"
        className="w-[327px] h-[46px] bg-[#0D0D1B] text-white rounded-[10px]"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
     <div className="mt-[12px]">
        <LoginTerms />
     </div>
     
    </form>
  );
}
