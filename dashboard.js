document.addEventListener("DOMContentLoaded", () => {
  // your whole JS code here

//Update Cards
function updateCards(data) {
  document.getElementById("totalClasses").textContent = data.total;
  document.getElementById("attended").textContent = data.attended;
  document.getElementById("missed").textContent = data.missed;
  document.getElementById("percentage").textContent = data.percentage + "%";
}


//Alert Logic
function updateAlert(percentage) {
  const title = document.getElementById("alertTitle");
  const desc = document.getElementById("alertDesc");

  if (percentage < 75) {
    title.textContent = "⚠️ Attendance below 75%";
    desc.textContent = "Your attendance needs attention.";
  } else {
    title.textContent = "✅ Good Attendance";
    desc.textContent = "You're maintaining a safe attendance level.";
  }
}

//Chart Setup
const ctx = document.getElementById("attendanceChart");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Attendance %",
      data: [],
      borderWidth: 2,
      tension: 0.4
    }]
  },
  options: {
    responsive: true
  }
});


//Date Logic
function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function isAttendanceMarkedToday() {
  const lastMarked = localStorage.getItem("attendanceDate");
  return lastMarked === getTodayDate();
}


function updateButtonState(isMarked) {
  const markBtn = document.getElementById("markAttendanceBtn");

  if (!markBtn) return;

  if (isMarked) {
    markBtn.disabled = true;
    markBtn.textContent = "Marked ✅";
    markBtn.className = "bg-gray-400 text-white px-4 py-2 rounded-xl text-sm font-medium cursor-not-allowed";
  } else {
    markBtn.disabled = false;
    markBtn.innerHTML = "Mark Attendance";
    markBtn.className =
      "bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition";
  }
}

//Load Dashboard
function loadDashboard(data) {
  updateCards({
    total: data.overview.total_classes,
    attended: data.overview.attended_classes,
    missed: data.overview.missed_classes,
    percentage: data.overview.attendance_percentage
  });

  updateAlert(data.overview.attendance_percentage);

  // TEMP graph (backend later replace karega)
  const labels = ["Mon", "Tue", "Wed", "Thu"];
  const values = [
    data.overview.attendance_percentage,
    data.overview.attendance_percentage - 5,
    data.overview.attendance_percentage + 3,
    data.overview.attendance_percentage + 10
  ];

  chart.data.labels = labels;
  chart.data.datasets[0].data = values;
  chart.update();
}

const markBtn = document.getElementById("markAttendanceBtn");

if (markBtn) {
  markBtn.addEventListener("click", async () => {
    const enrolmentNumber = localStorage.getItem("enrolment_number");

    try {
      markBtn.disabled = true;
      markBtn.textContent = "Marking...";

      const response = await fetch("http://127.0.0.1:8000/mark-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ enrolment_number: enrolmentNumber })
      });

      const result = await response.json();

      if (result.success) {
        showToast("Attendance marked ✅");

        // ✅ reload fresh data from backend
        fetchDashboard();

      } else {
        showToast(result.message || "Already marked today", "error");
        updateButtonState(true); // already marked
      }

    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
      updateButtonState(false);
    }
  });
}

//Fetch Dashboard
async function fetchDashboard() {
  const enrolmentNumber = localStorage.getItem("enrolment_number");

  if (!enrolmentNumber) {
    alert("No student logged in");
    window.location.href = "login_front.html";
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/student-dashboard/${enrolmentNumber}`);
    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    loadDashboard(data);

    // ✅ IMPORTANT
    updateButtonState(true); // disable by default, backend will confirm if already marked
// JSON Ensure backend se ye aa raha ho:   Agar nahi aa raha → button kabhi disable nahi hoga
//{
//  "is_marked_today": true
//}


    document.getElementById("welcomeText").textContent = `Welcome back, ${data.student.name}`;
    document.getElementById("studentName").textContent = data.student.name;

  } catch (error) {
    console.error("Error fetching dashboard:", error);
    alert("Could not connect to backend");
  }
}

window.onload = () => {
  fetchDashboard();
  
};


//Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("attendanceDate");
    window.location.href = "login.html";
  });
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  if (type === "success") {
    toast.className = "fixed bottom-5 right-5 px-4 py-3 rounded-xl text-white bg-green-500 shadow-lg";
  } else {
    toast.className = "fixed bottom-5 right-5 px-4 py-3 rounded-xl text-white bg-red-500 shadow-lg";
  }

  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

});
