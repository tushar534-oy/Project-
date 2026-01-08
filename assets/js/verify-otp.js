import { supabase } from "./supabase.js";

const otpForm = document.getElementById("otp-form");

if (otpForm) {
  otpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = document.getElementById("otp").value.trim();
    const email = localStorage.getItem("auth_email");

    if (!email) {
      alert("Email not found. Please login again.");
      window.location.href = "../html/sign-in.html";
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email"
    });

    if (error) {
      alert("Invalid or expired OTP");
      return;
    }

    // ✅ OTP VERIFIED → CLEANUP
    localStorage.removeItem("auth_email");

    // ✅ REDIRECT TO DASHBOARD
    window.location.href = "../html/dashboard.html";
  });
}
