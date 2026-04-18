document.getElementById("signupForm").addEventListener("submit", signup);

function signup(e){
    e.preventDefault();

    const userData = {
        name: document.getElementById("Name_of_Student").value,
        enrollment: document.getElementById("Enrollment_Number").value,
        semester: document.getElementById("Semester").value,
        branch: document.getElementById("Branch").value,
        email: document.getElementById("College_Email").value,
        password: document.getElementById("Password").value
    };

    console.log(userData);

    alert("Account Created Successfully 🎉");
}

function goToLogin(){
    window.location.href = "login.html";
}
