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

    if (data.error) {
      alert(data.error);
      return;
    }

    loadDashboard(data);
    document.getElementById("welcomeText").textContent = `Welcome back, ${data.student.name}`;
document.getElementById("studentName").textContent = data.student.name;

  } catch (error) {
    console.error("Error fetching dashboard:", error);
    alert("Could not connect to backend");
  }
}

window.onload = fetchDashboard;
