"use client";
import { useRouter } from "next/navigation";
import BackButton from "../common/BackButton";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { getAxiosErrorMessage } from "@/lib/getAxiosError";
import { useEffect } from "react";
import { resetPassword } from "@/services/auth";


export default function ResetPassword() {
  const router = useRouter();


  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const userId = localStorage.getItem("resetUserId");

    if (!userId) {
      router.push("/User");
    }
  }, [router]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: ""
    };

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userId = localStorage.getItem("resetUserId");

    if (!userId) {
      setErrors((p) => ({
        ...p,
        password: "Missing reset session. Please restart password reset."
      }));
      return;
    }

    try {
      setLoading(true);

      await resetPassword(userId, formData.password);

      localStorage.removeItem("resetUserId");
      localStorage.removeItem("resetEmail");

      router.push("/login");
    } catch (err: unknown) {
      setErrors((p) => ({
        ...p,
        password: getAxiosErrorMessage(err, "Failed to reset password")
      }));
    } finally {
      setLoading(false);
    }

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main className="w-full max-w-[512px] sm:min-h-[692px] min-h-screen flex flex-col justify-center items-center bg-black px-[16px] sm:px-[24px] md:px-[32px] lg:px-[40px]">
      {/* Back Button */}
      <div className="w-full max-w-full sm:max-w-[512px] mb-[8px] sm:mb-[5px]">
        <BackButton href="/signup" />
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="w-full max-w-full sm:max-w-[90%] md:max-w-[612px] bg-[#2C2C2C] rounded-[12px] py-[16px] sm:py-[10px] px-[16px] sm:px-[20px] md:px-[32px] flex flex-col items-center text-center space-y-[22px] sm:space-y-[21px] md:space-y-[33px]">

        {/* Title */}
        <h1 className="text-[32px] xs:text-[36px] sm:text-[42px] md:text-[26px] lg:text-[30px] font-bold text-[#F5F5F5] leading-tight pt-[10px]">
          Reset password
        </h1>

        {/* Subtitle */}
        <p className="text-[14px] xs:text-[16px] sm:text-[18px] md:text-[14px] lg:text-[15px] text-[#D1D1D1] leading-[20px] sm:leading-[22px]">
          Create a new password
        </p>

        {/* New Password Input */}
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-[426px] sm:max-w-[426px] text-left">
            <label
              htmlFor="password"
              className="block mb-[4px] sm:mb-[4px] text-[#BDBDBD] text-[12px] xs:text-[13px] sm:text-[14px]"
            >
              New Password
            </label>

            <div className="relative w-full flex justify-center">
              <Lock
                className="absolute left-[16px] xs:left-[18px] sm:left-[20px] top-1/2 -translate-y-1/2 text-[#BDBDBD] pointer-events-none"
                width={14}
                height={14}
                style={{ width: 'clamp(14px, 4vw, 16px)', height: 'clamp(14px, 4vw, 16px)' }}
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={formData.password}
                onChange={handleInputChange}
                className="
                  w-full max-w-[426px]
                  h-[35px] xs:h-[37px] sm:h-[39px]
                  bg-[#2C2C2C]
                  border-[0.89px] border-[#515151]
                  rounded-[5.34px]
                  py-[8px] xs:py-[10.68px]
                  pl-[40px] xs:pl-[42px] sm:pl-[44px]
                  pr-[40px]
                  text-[#BDBDBD] placeholder:text-[#BDBDBD]
                  text-[14px] xs:text-[16px]
                  outline-none focus:border-[#1D61E7]
                  transition
                "
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-[8px] xs:right-3 sm:right-[12px] top-1/2 -translate-y-1/2 text-[#FFFFFF] bg-transparent border-none cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff width={16} height={16} style={{ width: 'clamp(16px, 4vw, 18px)', height: 'clamp(16px, 4vw, 18px)' }} />
                ) : (
                  <Eye width={16} height={16} style={{ width: 'clamp(16px, 4vw, 18px)', height: 'clamp(16px, 4vw, 18px)' }} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-[426px] sm:max-w-[426px] text-left">
            <label
              htmlFor="confirmPassword"
              className="block mb-[4px] sm:mb-[4px] text-[#BDBDBD] text-[12px] xs:text-[13px] sm:text-[14px]"
            >
              Re-enter Password
            </label>

            <div className="relative w-full flex justify-center">
              <Lock
                className="absolute left-[16px] xs:left-[18px] sm:left-[20px] top-1/2 -translate-y-1/2 text-[#BDBDBD] pointer-events-none"
                width={14}
                height={14}
                style={{ width: 'clamp(14px, 4vw, 16px)', height: 'clamp(14px, 4vw, 16px)' }}
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="
                  w-full max-w-[426px]
                  h-[35px] xs:h-[37px] sm:h-[39px]
                  bg-[#2C2C2C]
                  border-[0.89px] border-[#515151]
                  rounded-[5.34px]
                  py-[8px] xs:py-[10.68px]
                  pl-[40px] xs:pl-[42px] sm:pl-[44px]
                  pr-[40px]
                  text-[#BDBDBD] placeholder:text-[#BDBDBD]
                  text-[14px] xs:text-[16px]
                  outline-none focus:border-[#1D61E7]
                  transition
                "
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-[8px] xs:right-3 sm:right-[12px] top-1/2 -translate-y-1/2 text-[#FFFFFF] bg-transparent border-none cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff width={16} height={16} style={{ width: 'clamp(16px, 4vw, 18px)', height: 'clamp(16px, 4vw, 18px)' }} />
                ) : (
                  <Eye width={16} height={16} style={{ width: 'clamp(16px, 4vw, 18px)', height: 'clamp(16px, 4vw, 18px)' }} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[#FF4D4D] text-[12px] mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="w-full max-w-full sm:max-w-[426px] h-[40px] mt-[20px] mb-[20px]">
          <Button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full max-w-[426px] text-[#FFFFFF] bg-[#102DC8] h-[38px] xs:h-[40px] sm:h-[43px] text-[14px] xs:text-[16px] rounded-[10px] hover:bg-[#0d24a6] transition-colors"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>

      </form>
    </main>
  );
}