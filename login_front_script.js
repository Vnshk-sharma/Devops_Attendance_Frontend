let isLogin = true;

function toggleMode() {
  isLogin = !isLogin;

  document.getElementById("title").innerText = isLogin ? "Login" : "Create Account";
  document.getElementById("submitBtn").innerText = isLogin ? "Login" : "Sign Up";

  // FIX: Toggle required attribute on email field when switching modes
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

  // FIX: Basic validation before proceeding
  if (!name || !enrollment || !batch) {
    alert("Please fill in all required fields.");
    return;
  }

  if (!isLogin) {
    const email = document.getElementById("email").value.trim();
    if (!email) {
      alert("Please enter your email to sign up.");
      return;
    }
    // TODO: Replace with real sign-up API call
    // fetch('/api/signup', { method: 'POST', body: JSON.stringify({ name, enrollment, batch, email }) })
    alert(`Account created for ${name}! Please log in.`);
    toggleMode(); // Switch back to login after sign up
    return;
  }

  // TODO: Replace with real login API call
  // fetch('/api/login', { method: 'POST', body: JSON.stringify({ enrollment, batch }) })
  //   .then(res => res.json())
  //   .then(data => { if (data.success) window.location.href = 'dashboard.html'; })
  //   .catch(err => alert('Login failed. Please try again.'));

  // Temporary redirect to dashboard (remove when real API is connected)
  alert(`Welcome ${name} 🚀\nBatch: ${batch}`);
  window.location.href = "dashboard.html";
}
