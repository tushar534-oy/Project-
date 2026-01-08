import { supabase } from "./supabase.js";

export async function requireAuth() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.replace("sign-in.html"); // remove back history
  }
}

export async function redirectIfLoggedIn() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    window.location.replace("dashboard.html");
  }
}
