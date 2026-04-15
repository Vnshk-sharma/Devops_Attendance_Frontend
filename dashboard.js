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



function initChart() {
  const ctx = document.getElementById("attendanceChart");
  if (!ctx) {
    console.error("Canvas #attendanceChart not found in DOM.");
    return;
  }

