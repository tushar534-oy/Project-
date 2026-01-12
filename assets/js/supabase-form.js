// ===============================
// Supabase Configuration
// ===============================
const SUPABASE_URL = "https://hydtchbejefpsrcbcvta.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5ZHRjaGJlamVmcHNyY2JjdnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MjExNjAsImV4cCI6MjA4MzM5NzE2MH0.-02P-evbPRxhOyeRzJNU_QX5XkOOU91ofbM9U3GaK90";

const supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===============================
// Form Handling
// ===============================
const form = document.querySelector("form");
const submitButton = form.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector(".btn-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Prevent double submit
  submitButton.disabled = true;
  buttonText.textContent = "Submitting...";

  const formData = new FormData(form);

  const payload = {
    full_name: formData.get("full_name"),
    business_name: formData.get("business_name"),
    work_email: formData.get("work_email"),
    phone: formData.get("phone"),
    website: formData.get("website") || null,
    business_stage: formData.get("business_stage"),
    infrastructure: formData.get("infrastructure"),
    budget: formData.get("budget"),
    challenge: formData.get("challenge"),
  };

  try {
    const { error } = await supabase
      .from("infrastructure_leads")
      .insert([payload]);

    if (error) {
      console.error("Supabase error:", error);
      alert("Something went wrong. Please try again.");
      return;
    }

    // Success
    alert("Thank you! Our team will contact you within 24 business hours.");
    form.reset();
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Unexpected error. Please refresh and try again.");
  } finally {
    submitButton.disabled = false;
    buttonText.textContent = "Book Infrastructure Call";
  }
});
