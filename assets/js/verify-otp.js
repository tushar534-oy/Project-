// assets/js/verify-otp.js
import { supabase } from "./supabase.js";

const otpForm = document.getElementById("otp-form");

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("auth_email");
  const token = document.getElementById("otp").value;

  if (!email) {
    alert("Session expired. Please login again.");
    window.location.href = "../html/sign-in.html";
    return;
  }

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email"
  });

  if (error) {
    alert("Invalid or expired OTP.");
    return;
  }

  localStorage.removeItem("auth_email");
  window.location.href = "../html/dashboard.html";
});
