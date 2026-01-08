// assets/js/dashboard.js
import { supabase } from "./supabase.js";
import { requireAuth } from "./auth-guard.js";

// 1️⃣ Protect page
await requireAuth();

// 2️⃣ Auto-logout on tab close / back / switch
window.addEventListener("beforeunload", async () => {
  await supabase.auth.signOut();
});

// 3️⃣ Force logout when page becomes hidden (tab switch)
document.addEventListener("visibilitychange", async () => {
  if (document.hidden) {
    await supabase.auth.signOut();
    window.location.replace("sign-in.html");
  }
});

// 4️⃣ Logout button
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.replace("sign-in.html");
});
