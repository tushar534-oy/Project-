import { supabase } from "./supabase.js";

/* =========================
   SIGNUP (OTP)
========================= */
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("full_name").value;
    const company_name = document.getElementById("company_name").value;
    const email = document.getElementById("email").value;
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
    } else {
      alert("OTP sent to your email. Please verify.");
      // redirect happens AFTER verification, not here
    }
  });
}

/* =========================
   LOGIN (OTP)
========================= */
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login_email").value;

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.message);
    } else {
      alert("OTP sent to your email. Please verify.");
    }
  });
}
