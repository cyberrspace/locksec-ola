"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import ForgotPasswordLink from "./ForgotPass";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="flex flex-col gap-6 w-full max-w-[327px] mx-auto ">
      {/* ===== Email Input ===== */}
     <label htmlFor="">Email:
        <input
          type="email"
          placeholder="Email"
          className="w-[327px] h-[46px] rounded-[10px] border border-[#EDF1F3] 
                   px-[14px] text-sm outline-none"
        />
     </label>
      

      {/* ===== Password Input with Eye Icon ===== */}
      <label htmlFor="">Password:
        <div
          className="relative w-[327px] h-[46px] rounded-[10px] border border-[#EDF1F3] 
                   flex items-center px-[14px]">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="flex-1 h-full text-sm outline-none bg-transparent"
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
      

      {/* ===== Remember Me + Checkbox ===== */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded focus:ring-0 text-[12px]"
          />
          Remember me
        </label>
        <ForgotPasswordLink/>
      </div>
     
    </form>
  );
}
