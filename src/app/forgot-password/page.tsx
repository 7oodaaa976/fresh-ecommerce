"use client";
import React, { useState } from "react";
import { sendResetCode, verifyResetCode, resetPassword } from "@/services/authServ";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter(); 

  const handleSendCode = async () => {
    const res = await sendResetCode(email);
    if (res?.status === "Success" || res?.statusMsg === "success") {
      setStep(2);
    }
  };

  const handleVerifyCode = async () => {
    const res = await verifyResetCode(code);
    if (res?.status === "Success" || res?.statusMsg === "success") {
      setStep(3);
    }
  };

  const handleResetPassword = async () => {
    const res = await resetPassword(email, newPassword);
    if (res?.token) {
      router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>

      {step === 1 && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSendCode}
            className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer"
          >
            Send Reset Code
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Enter the code"
            className="border p-2 w-full mb-4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={handleVerifyCode}
            className="w-full bg-green-600 text-white p-2 rounded cursor-pointer"
          >
            Verify Code
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            className="border p-2 w-full mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handleResetPassword}
            className="w-full bg-purple-600 text-white p-2 rounded cursor-pointer"
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}
