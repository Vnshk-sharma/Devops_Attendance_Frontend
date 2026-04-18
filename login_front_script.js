// Show Signup Page
function goToSignup() {
    window.location.href = "signup.html";
}

// 🔐 LOGIN FUNCTION
function login(event) {
    event.preventDefault();

    fetch("https://devops-attendance-backend-8pri.onrender.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            enrolment: document.getElementById("Enrollment_Number").value,
            password: document.getElementById("Password").value
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);

        // If login successful
        if (data.message.toLowerCase().includes("success")) {
            // Redirect later if needed
            // window.location.href = "dashboard.html";
        }
    })
    .catch(error => {
        alert("Server Error ❌");
        console.log(error);
    });
}
