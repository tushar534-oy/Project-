import { supabase } from "./supabase.js";

const form = document.getElementById("otp-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = document.getElementById("otp").value;

  const { error } = await supabase.auth.verifyOtp({
    email: null,
    token,
    type: "email"
  });

  if (error) {
    alert("Invalid or expired OTP");
  } else {
    window.location.href = "../html/dashboard.html";
  }
});
