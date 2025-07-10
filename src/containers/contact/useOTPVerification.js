import { useState, useEffect, useCallback } from "react";

// For demo: replace with backend call in production!
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function useOTPVerification({ validate, label }) {
  const [otp, setOTP] = useState("");
  const [userOTP, setUserOTP] = useState("");
  const [otpSent, setOTPSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  // Cooldown timer
  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Request OTP
  const requestOTP = useCallback((value) => {
    if (!validate(value) || cooldown > 0) return;
    const newOTP = generateOTP();
    setOTP(newOTP);
    setShowOTPInput(true);
    setOTPSent(true);
    setCooldown(30);
    setError("");
    setAttempts(0);
    setUserOTP("");
    setVerified(false);
    alert(`For demo purposes, your ${label} OTP is: ${newOTP}`);
  }, [cooldown, validate, label]);

  // Verify OTP
  const verifyOTP = useCallback(() => {
    if (userOTP === otp) {
      setVerified(true);
      setShowOTPInput(false);
      setUserOTP("");
      setError("");
      setOTPSent(false);
      setAttempts(0);
      return true;
    } else {
      setAttempts(a => a + 1);
      if (attempts + 1 >= 3) {
        setShowOTPInput(false);
        setError("❌ Too many failed attempts. Please request a new OTP.");
        setOTPSent(false);
        setUserOTP("");
      } else {
        setError("Invalid OTP. Please try again.");
      }
      return false;
    }
  }, [userOTP, otp, attempts]);

  // Reset on field value change
  const reset = useCallback(() => {
    setOTP("");
    setUserOTP("");
    setOTPSent(false);
    setCooldown(0);
    setShowOTPInput(false);
    setVerified(false);
    setError("");
    setAttempts(0);
  }, []);

  return {
    otpSent,
    cooldown,
    showOTPInput,
    verified,
    error,
    userOTP,
    setUserOTP,
    requestOTP,
    verifyOTP,
    reset
  };
}
