import { supabase } from "./supabase.js";

/* =========================
   SIGNUP (EMAIL OTP)
========================= */
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const full_name = document.getElementById("full_name").value;
    const company_name = document.getElementById("company_name").value;
    const phone = document.getElementById("phone").value;
    const whatsapp = document.getElementById("whatsapp").value;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          full_name,
          company_name,
          phone,
          whatsapp,
          role: "client"
        }
      }
    });

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem("auth_email", email);
    window.location.href = "../html/verify-otp.html";
  });
}

/* =========================
   LOGIN (EMAIL OTP)
========================= */
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login_email").value;

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem("auth_email", email);
    window.location.href = "../html/verify-otp.html";
  });
}
