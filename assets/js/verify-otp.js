import { supabase } from "./supabase.js";

// get email stored during signup/login
const email = localStorage.getItem("auth_email");

const form = document.getElementById("otp-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = document.getElementById("otp").value;

  const { error } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "email"
  });

  if (error) {
    alert(error.message || "Invalid or expired OTP");
  } else {
    localStorage.removeItem("auth_email");
    window.location.href = "../html/dashboard.html";
  }
});
