function signup(e) {
    e.preventDefault();

    const name = document.getElementById("Name_of_Student").value;
    const enrollment = document.getElementById("Enrollment_Number").value;
    const password = document.getElementById("Password").value;
    const branch = document.getElementById("Branch").value;
    const email = document.getElementById("College_Email").value;

    alert(
        "Account Created 🎉\n\n" +
        "Name: " + name + "\n" +
        "Enrollment: " + enrollment + "\n" +
        "Branch: " + branch + "\n" +
        "Email: " + email
    );
}

function goToLogin() {
    window.location.href = "login.html";
}