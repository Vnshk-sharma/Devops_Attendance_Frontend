
function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

// 🔐 LOGIN
function login() {
    fetch("https://devops-attendance-backend-8pri.onrender.com/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            enrolment: document.getElementById("loginEnroll").value,
            password: document.getElementById("loginPassword").value
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}

// 📝 SIGNUP
function signup() {
    fetch("https://devops-attendance-backend-8pri.onrender.com/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            enrolment: document.getElementById("enrolment").value,
            branch: document.getElementById("branch").value,
            email: document.getElementById("email").value,
            semester: document.getElementById("semester").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}
