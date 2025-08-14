// Clock
const clock = document.getElementById("clock");
function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  clock.style.animation = "none";
  void clock.offsetWidth;
  clock.style.animation = "pageTurn 1s ease-in-out";
}
setInterval(updateClock, 60000);
updateClock();

// Sidebar toggle
const sidebar = document.getElementById("sidebar");
document.getElementById("toggleSidebar").onclick = () => sidebar.style.width = "300px";
document.getElementById("closeSidebar").onclick = () => sidebar.style.width = "0";

// Study session tracking
let startTime = null;
const studyBtn = document.getElementById("studyBtn");
const logList = document.getElementById("logList");

studyBtn.onclick = () => {
  if (!startTime) {
    // Start session
    startTime = new Date();
    studyBtn.textContent = "⏹";
  } else {
    // End session
    const endTime = new Date();
    const duration = Math.round((endTime - startTime) / 1000 / 60); // in minutes
    const note = prompt("What did you study?");
    if (note) {
      const entry = `${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()} (${duration} min) : ${note}`;
      saveLog(entry);
      addLogToUI(entry);
    }
    startTime = null;
    studyBtn.textContent = "▶";
  }
};

// Save log to localStorage
function saveLog(entry) {
  let logs = JSON.parse(localStorage.getItem("studyLogs") || "[]");
  logs.push(entry);
  localStorage.setItem("studyLogs", JSON.stringify(logs));
}

// Load logs on page load
function addLogToUI(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  logList.appendChild(li);
}
(JSON.parse(localStorage.getItem("studyLogs") || "[]")).forEach(addLogToUI);

// Due date saving
const dateList = document.getElementById("dateList");
document.getElementById("saveDate").onclick = () => {
  const date = document.getElementById("dueDate").value;
  if (!date) return;
  let dates = JSON.parse(localStorage.getItem("dueDates") || "[]");
  dates.push(date);
  localStorage.setItem("dueDates", JSON.stringify(dates));
  addDateToUI(date);
};
function addDateToUI(date) {
  const li = document.createElement("li");
  li.textContent = date;
  dateList.appendChild(li);
}
(JSON.parse(localStorage.getItem("dueDates") || "[]")).forEach(addDateToUI);
