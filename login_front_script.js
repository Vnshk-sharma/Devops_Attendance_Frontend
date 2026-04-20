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
            enrolment: parseInt(document.getElementById("Enrollment_Number").value),
            localStorage.setItem("Enrollment_Number", Enrollment_Number);
            password: document.getElementById("Password").value
        })
    })
    .then(response => response.json())
    .then(data => {
    if (data.message.toLowerCase().includes("success")) {
        // Save token or enrollment number for dashboard to use
        localStorage.setItem("enrolment", document.getElementById("Enrollment_Number").value);
        // If backend returns a token: localStorage.setItem("token", data.token);
        
        window.location.href = "dashboard.html";
    } else {
        alert(data.message);
    }
})
    .catch(error => {
        alert("Server Error ❌");
        console.log(error);
    });
}
