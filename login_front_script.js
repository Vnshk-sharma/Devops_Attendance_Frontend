let isLogin = true;

function toggleMode() {
  isLogin = !isLogin;

  document.getElementById("title").innerText = isLogin ? "Login" : "Create Account";
  document.getElementById("submitBtn").innerText = isLogin ? "Login" : "Sign Up";
  document.getElementById("extraFields").classList.toggle("hidden");

  document.getElementById("toggleText").innerText = isLogin 
    ? "Don't have an account?" 
    : "Already have an account?";

  document.getElementById("toggleBtn").innerText = isLogin ? "Sign Up" : "Login";
}

function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const batch = document.getElementById("batch").value;

  alert(`Welcome ${name} 🚀\nBatch: ${batch}`);
}