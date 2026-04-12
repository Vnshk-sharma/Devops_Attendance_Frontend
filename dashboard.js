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

//Chart Setup (EMPTY initially)
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


// Load Data (Backend Ready)
function loadDashboard(data) {
  updateCards(data);
  updateAlert(data.percentage);

  chart.data.labels = data.labels;
  chart.data.datasets[0].data = data.values;
  chart.update();
}


//Dummy Data (REMOVE LATER)
const dummyData = {
  total: 40,
  attended: 32,
  missed: 8,
  percentage: 80,
  labels: ["Mon", "Tue", "Wed", "Thu"],
  values: [80, 72, 85, 90]
};

loadDashboard(dummyData);


//Future API Call
// fetch('/api/dashboard')
//   .then(res => res.json())
//   .then(data => loadDashboard(data));