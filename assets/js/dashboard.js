import { supabase } from "./supabase.js";
import { requireAuth } from "./auth-guard.js";

// Protect page
requireAuth();

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "../html/sign-in.html";
  });
}
