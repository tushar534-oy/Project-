import { supabase } from "./supabase.js";

export async function requireAuth() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "../html/sign-in.html";
  }
}

export async function redirectIfLoggedIn() {
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    window.location.href = "../html/dashboard.html";
  }
}
