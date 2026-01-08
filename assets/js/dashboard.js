import { supabase } from "./supabase.js";
import { requireAuth } from "./auth-guard.js";

// Protect dashboard
requireAuth();

/* =========================
   MENU SECTION HANDLING
========================= */
document.querySelectorAll(".menu-link").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;

    document.querySelectorAll(".dashboard-section")
      .forEach(s => s.classList.add("d-none"));

    document.getElementById(`section-${section}`)
      .classList.remove("d-none");
  });
});

/* =========================
   LOGOUT MANUALLY
========================= */
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.replace("sign-in.html");
});

/* =========================
   AUTO LOGOUT ON TAB SWITCH
========================= */
document.addEventListener("visibilitychange", async () => {
  if (document.hidden) {
    await supabase.auth.signOut();
    window.location.replace("sign-in.html");
  }
});

/* =========================
   AUTO LOGOUT WHEN NAVIGATING AWAY
========================= */
window.addEventListener("beforeunload", async () => {
  await supabase.auth.signOut();
});
