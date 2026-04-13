let isLogin = true;

function toggleMode() {
  isLogin = !isLogin;

  document.getElementById("title").innerText = isLogin ? "Login" : "Create Account";
  document.getElementById("submitBtn").innerText = isLogin ? "Login" : "Sign Up";

  // Toggle required attribute on email field when switching modes
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.required = !isLogin;
  }

  document.getElementById("extraFields").classList.toggle("hidden");

  document.getElementById("toggleText").innerText = isLogin
    ? "Don't have an account?"
    : "Already have an account?";

  document.getElementById("toggleBtn").innerText = isLogin ? "Sign Up" : "Login";
}

function handleSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const enrollment = document.getElementById("enrollment").value.trim();
  const batch = document.getElementById("batch").value;

  if (!name || !enrollment || !batch) {
    showError("Please fill in all required fields.");
    return;
  }

  if (!isLogin) {
    const email = document.getElementById("email").value.trim();
    if (!email) {
      showError("Please enter your email to sign up.");
      return;
    }

    // TODO: Replace with real sign-up API call
    // fetch('/api/signup', { method: 'POST', body: JSON.stringify({ name, enrollment, batch, email }) })
    //   .then(res => res.json())
    //   .then(data => { if (data.success) toggleMode(); else showError(data.message); })
    //   .catch(() => showError("Sign up failed. Please try again."));

    // Temporary: simulate sign up then switch to login
    showSuccess(`Account created for ${name}! Please log in.`);
    setTimeout(() => {
      clearMessage();
      toggleMode();
    }, 1500);
    return;
  }

  // TODO: Replace with real login API call
  // fetch('/api/login', { method: 'POST', body: JSON.stringify({ enrollment, batch }) })
  //   .then(res => res.json())
  //   .then(data => { if (data.success) window.location.href = 'dashboard.html'; else showError(data.message); })
  //   .catch(() => showError("Login failed. Please try again."));

  // Temporary redirect to dashboard (remove when real API is connected)
  showSuccess(`Welcome ${name} 🚀`);
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 800);
}

// FIX: Use inline messages instead of alert() so they work on all browsers/CSP environments
function showError(msg) {
  let el = document.getElementById("formMessage");
  if (!el) {
    el = document.createElement("p");
    el.id = "formMessage";
    el.style.cssText = "margin-top:12px;font-size:13px;border-radius:8px;padding:10px 14px;";
    document.querySelector("form").after(el);
  }
  el.style.background = "rgba(239,68,68,0.15)";
  el.style.color = "#fca5a5";
  el.textContent = msg;
}

function showSuccess(msg) {
  let el = document.getElementById("formMessage");
  if (!el) {
    el = document.createElement("p");
    el.id = "formMessage";
    el.style.cssText = "margin-top:12px;font-size:13px;border-radius:8px;padding:10px 14px;";
    document.querySelector("form").after(el);
  }
  el.style.background = "rgba(34,197,94,0.15)";
  el.style.color = "#86efac";
  el.textContent = msg;
}

function clearMessage() {
  const el = document.getElementById("formMessage");
  if (el) el.remove();
}
