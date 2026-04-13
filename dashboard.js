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
  const iconBox = title.closest("aside")?.querySelector(".rounded-2xl");

  if (percentage < 75) {
    title.textContent = "⚠️ Attendance below 75%";
    desc.textContent = "Your attendance needs attention. Please attend more classes to stay eligible.";
    if (iconBox) {
      iconBox.classList.remove("bg-green-100");
      iconBox.classList.add("bg-rose-100");
    }
  } else {
    title.textContent = "✅ Good Attendance";
    desc.textContent = "You're maintaining a safe attendance level. Keep it up!";
    if (iconBox) {
      iconBox.classList.remove("bg-rose-100");
      iconBox.classList.add("bg-green-100");
    }
  }
}

// FIX: Initialise chart only after DOM is ready (DOMContentLoaded)
let chart = null;

function initChart() {
  const ctx = document.getElementById("attendanceChart");
  if (!ctx) {
    console.error("Canvas #attendanceChart not found in DOM.");
    return;
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Attendance %",
        data: [],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: { callback: val => val + "%" }
        }
      }
    }
  });
}

// Load Data
function loadDashboard(data) {
  updateCards(data);
  updateAlert(data.percentage);

  if (!chart) {
    console.error("Chart not initialised.");
    return;
  }
  chart.data.labels = data.labels;
  chart.data.datasets[0].data = data.values;
  chart.update();
}

// Show loading state
function showLoadingState() {
  ["totalClasses", "attended", "missed", "percentage"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = "…";
  });
  const alertTitle = document.getElementById("alertTitle");
  const alertDesc = document.getElementById("alertDesc");
  if (alertTitle) alertTitle.textContent = "Loading…";
  if (alertDesc) alertDesc.textContent = "";
}

function showError(message) {
  const alertTitle = document.getElementById("alertTitle");
  const alertDesc = document.getElementById("alertDesc");
  if (alertTitle) alertTitle.textContent = "⚠️ Error";
  if (alertDesc) alertDesc.textContent = message;
}

// Logout handler — redirects to login
function handleLogout(e) {
  e.preventDefault();
  // TODO: Call logout API if needed
  // fetch('/api/logout', { method: 'POST' });
  window.location.href = "login_front.html";
}

// FIX: Wait for DOM before initialising chart and loading data
document.addEventListener("DOMContentLoaded", function () {
  initChart();

  // --- TEMPORARY: Dummy data (REMOVE when real API is connected) ---
  const dummyData = {
    total: 40,
    attended: 32,
    missed: 8,
    percentage: 80,
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    values: [80, 72, 85, 90, 78]
  };
  loadDashboard(dummyData);
  // --- END TEMPORARY ---

  // TODO: Uncomment below and remove dummy data when backend is ready
  // showLoadingState();
  // fetch('/api/dashboard')
  //   .then(res => {
  //     if (!res.ok) throw new Error("Server error: " + res.status);
  //     return res.json();
  //   })
  //   .then(data => loadDashboard(data))
  //   .catch(err => {
  //     console.error("Dashboard load failed:", err);
  //     showError("Failed to load attendance data. Please refresh or try again later.");
  //   });
});
