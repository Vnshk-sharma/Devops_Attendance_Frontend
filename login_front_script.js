// Show Signup Page
function goToSignup() {
    window.location.href = "/signup.html";
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
            enrolment: parseInt(document.getElementById("Enrollment_Number").value),
            password: document.getElementById("Password").value
        })
    })
    .then(response => response.json())
    .then(data => {
    // If login successful
    if (data.message.toLowerCase().includes("success")) {
        window.location.href = "dashboard.html"; // ✅ uncomment this
    } else {
        alert(data.message); // show error only on failure
    }
})
    .catch(error => {
        alert("Server Error ❌");
        console.log(error);
    });
}
