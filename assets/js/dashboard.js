import { supabase } from "./supabase.js";
import { requireAuth } from "./auth-guard.js";

// protect page
requireAuth();

// logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "/html/sign-in.html";

});
