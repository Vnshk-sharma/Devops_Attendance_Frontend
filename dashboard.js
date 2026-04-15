// Update Cards
function updateCards(data) {
  document.getElementById("totalClasses").textContent = data.total;
  document.getElementById("attended").textContent = data.attended;
  document.getElementById("missed").textContent = data.missed;
  document.getElementById("percentage").textContent = data.percentage + "%";
}

// Alert Logic
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

// Chart Setup
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

// Load Data into UI
function loadDashboard(data) {
  updateCards({
    total: data.overview.total_classes,
    attended: data.overview.attended_classes,
    missed: data.overview.missed_classes,
    percentage: data.overview.attendance_percentage
  });

  updateAlert(data.overview.attendance_percentage);

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

// Fetch from backend
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

//Date & Attendance Logic
function getTodayDate() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

function isAttendanceMarkedToday() {
  const lastMarked = localStorage.getItem("attendanceDate");
  return lastMarked === getTodayDate();
}

//Button State Logic
function updateButtonState() {
  const markBtn = document.getElementById("markAttendanceBtn");

  if(!markBtn) return; // Safety check

  if (isAttendanceMarkedToday()) {
    markBtn.disabled = true;
    markBtn.textContent = "Marked ✅";

    markBtn.className =
      "bg-gray-400 text-white px-4 py-2 rounded-xl text-sm font-medium cursor-not-allowed";
  } else {
    markBtn.disabled = false;
    markBtn.textContent = "Mark Attendance";

    markBtn.className =
      "bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:scale-105 transition";
  }
}

//Button Click Logic
const markBtn = document.getElementById("markAttendanceBtn");

markBtn.addEventListener("click", () => {
  const today = getTodayDate();

  // Save in localStorage (temporary)
  localStorage.setItem("attendanceDate", today);

  // Update stats
  dummyData.total += 1;
  dummyData.attended += 1;
  dummyData.percentage = Math.round(
    (dummyData.attended / dummyData.total) * 100
  );

  // Update UI
  loadDashboard(dummyData);
  updateButtonState();
});

//Initial Button State
updateButtonState();

    loadDashboard(data);
    document.getElementById("welcomeText").textContent = `Welcome back, ${data.student.name}`;
document.getElementById("studentName").textContent = data.student.name;

  } catch (error) {
    console.error("Error fetching dashboard:", error);
    alert("Could not connect to backend");
  }
}

window.onload = fetchDashboard;
