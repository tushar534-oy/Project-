import { supabase } from "./supabase.js";

const otpForm = document.getElementById("otp-form");

otpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const otp = document.getElementById("otp").value;
  const email = localStorage.getItem("otp_email");

  if (!email) {
    alert("Email not found. Please sign in again.");
    window.location.href = "../html/sign-in.html";
    return;
  }

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) {
    alert(error.message);
    return;
  }

  localStorage.removeItem("otp_email");
  window.location.href = "../html/dashboard.html";
});
