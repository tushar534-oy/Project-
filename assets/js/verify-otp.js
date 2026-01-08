import { supabase } from "./supabase.js";

const form = document.getElementById("otp-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = localStorage.getItem("auth_email");
  const token = document.getElementById("otp").value;

  if (!email) {
    alert("Email missing. Please sign in again.");
    window.location.href = "../html/sign-in.html";
    return;
  }

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email"   // 🔥 THIS IS CRITICAL
  });

  if (error) {
    alert("Invalid or expired OTP");
    return;
  }

  localStorage.removeItem("auth_email");
  window.location.href = "../html/dashboard.html";
});
