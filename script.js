// Clock Update
const clock = document.getElementById("clock");
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  clock.textContent = timeString;
  clock.style.animation = "none"; // Reset animation
  void clock.offsetWidth; // Trigger reflow
  clock.style.animation = "pageTurn 1s ease-in-out"; // Reapply animation
}
setInterval(updateClock, 60000); // Update every minute
updateClock();

// Sidebar Toggle
const sidebar = document.getElementById("sidebar");
document.getElementById("toggleSidebar").onclick = () => {
  sidebar.style.width = "300px";
};
document.getElementById("closeSidebar").onclick = () => {
  sidebar.style.width = "0";
};

// Save Notes with Timestamp
const logList = document.getElementById("logList");
document.getElementById("saveNote").onclick = () => {
  const note = document.getElementById("studyNotes").value.trim();
  if (!note) return;
  const timestamp = new Date().toLocaleString();
  const entry = `${timestamp} - ${note}`;
  
  // Save in localStorage
  let logs = JSON.parse(localStorage.getItem("studyLogs") || "[]");
  logs.push(entry);
  localStorage.setItem("studyLogs", JSON.stringify(logs));
  
  addLogToUI(entry);
  document.getElementById("studyNotes").value = "";
};

function addLogToUI(entry) {
  const li = document.createElement("li");
  li.textContent = entry;
  logList.appendChild(li);
}

// Load existing logs
(JSON.parse(localStorage.getItem("studyLogs") || "[]")).forEach(addLogToUI);

// Save Due Dates
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

// Load existing dates
(JSON.parse(localStorage.getItem("dueDates") || "[]")).forEach(addDateToUI);
