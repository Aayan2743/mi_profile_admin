// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/forgot-password", {
        email: email.trim(),
      });

      if (response.data.success) {
        setStep(2);
      }
    } catch (error) {
      const data = error.response?.data;

      setError(data?.message || data?.errors || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/verify-otp", {
        email: email.trim(),
        otp: otp.trim(),
      });

      if (response.data.success) {
        setStep(3);
      }
    } catch (error) {
      const data = error.response?.data;

      setError(data?.message || data?.errors || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill both password fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/reset-password", {
        email: email.trim(),
        otp: otp.trim(),
        password: password,
      });

      if (response.data.success) {
        alert("Password reset successfully");
        navigate("/login");
      }
    } catch (error) {
      const data = error.response?.data;

      setError(data?.message || data?.errors || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-orange-950 px-4 py-12">
      <div className="w-full max-w-md bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-orange-900/30">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Reset Password
        </h1>

        {error && (
          <div className="bg-orange-900/40 border border-orange-700/50 text-orange-200 text-sm p-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <>
            <label className="text-gray-300 text-sm mb-2 block font-medium">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 
                         text-white placeholder-gray-500 focus:border-orange-500 
                         focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              disabled={loading}
            />

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all shadow-md
                ${
                  loading
                    ? "bg-orange-700/60 cursor-not-allowed opacity-70"
                    : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800"
                }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <label className="text-gray-300 text-sm mb-2 block font-medium">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 
                         text-white placeholder-gray-500 focus:border-orange-500 
                         focus:ring-2 focus:ring-orange-500/30 outline-none transition-all 
                         text-center tracking-widest text-lg font-medium"
              disabled={loading}
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all shadow-md
                ${
                  loading
                    ? "bg-orange-700/60 cursor-not-allowed opacity-70"
                    : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800"
                }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <>
            <label className="text-gray-300 text-sm mb-2 block font-medium">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 
                         text-white placeholder-gray-500 focus:border-orange-500 
                         focus:ring-2 focus:ring-orange-500/30 outline-none transition-all mb-5"
              disabled={loading}
            />

            <label className="text-gray-300 text-sm mb-2 block font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 
                         text-white placeholder-gray-500 focus:border-orange-500 
                         focus:ring-2 focus:ring-orange-500/30 outline-none transition-all"
              disabled={loading}
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-white transition-all shadow-md
                ${
                  loading
                    ? "bg-orange-700/60 cursor-not-allowed opacity-70"
                    : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800"
                }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        <p
          className="text-center text-gray-400 text-sm mt-8 cursor-pointer hover:text-orange-400 transition"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}
