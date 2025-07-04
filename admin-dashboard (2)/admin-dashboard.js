import { Chart } from "@/components/ui/chart"
// Admin Dashboard JavaScript

// Sample students with the names you specified
const students = [
  { id: "STU001", name: "Gokul G", class: "10A" },
  { id: "STU002", name: "Rogini P", class: "10A" },
  { id: "STU003", name: "Saravana R", class: "10B" },
  { id: "STU004", name: "Hari B", class: "11A" },
  { id: "STU005", name: "Varsha S", class: "11A" },
  { id: "STU006", name: "Arsha P", class: "11B" },
  { id: "STU007", name: "Vaishavi F", class: "12A" },
  { id: "STU008", name: "Sharmila S", class: "12A" },
  { id: "STU009", name: "Prasanth VK", class: "12B" },
]

// Sample recent activities
const recentActivities = [
  {
    student: "Gokul G",
    activity: "Quiz Completed",
    subject: "Mathematics",
    score: "85%",
    date: "2024-01-20",
  },
  {
    student: "Rogini P",
    activity: "Assignment Submitted",
    subject: "Physics",
    score: "Submitted",
    date: "2024-01-20",
  },
  {
    student: "Vaishavi F",
    activity: "Quiz Completed",
    subject: "Chemistry",
    score: "98%",
    date: "2024-01-19",
  },
  {
    student: "Hari B",
    activity: "Project Submitted",
    subject: "Biology",
    score: "Submitted",
    date: "2024-01-19",
  },
  {
    student: "Varsha S",
    activity: "Quiz Completed",
    subject: "English",
    score: "92%",
    date: "2024-01-18",
  },
]

// Top performing students
const topStudents = [
  { name: "Vaishavi F", class: "12A", score: 96.8, improvement: "+7.2%" },
  { name: "Varsha S", class: "11A", score: 94.2, improvement: "+6.3%" },
  { name: "Rogini P", class: "10A", score: 91.5, improvement: "+3.8%" },
  { name: "Sharmila S", class: "12A", score: 89.3, improvement: "+3.5%" },
  { name: "Hari B", class: "11A", score: 88.4, improvement: "+4.7%" },
]

document.addEventListener("DOMContentLoaded", () => {
  initializeDashboard()
  setupEventListeners()
})

function initializeDashboard() {
  populateRecentActivities()
  populateTopStudents()
  initializeCharts()
  updateDashboardStats()
}

function setupEventListeners() {
  // Sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.querySelector(".main-content")

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")
    mainContent.classList.toggle("expanded")
  })
}

function populateRecentActivities() {
  const tableBody = document.getElementById("recentActivitiesTable")

  tableBody.innerHTML = recentActivities
    .map(
      (activity) => `
        <tr>
            <td><strong>${activity.student}</strong></td>
            <td>${activity.activity}</td>
            <td>${activity.subject}</td>
            <td>
                ${
                  activity.score.includes("%")
                    ? `<span class="badge bg-${getScoreColor(Number.parseInt(activity.score))}">${activity.score}</span>`
                    : `<span class="badge bg-primary">${activity.score}</span>`
                }
            </td>
            <td>${formatDate(activity.date)}</td>
        </tr>
    `,
    )
    .join("")
}

function populateTopStudents() {
  const container = document.getElementById("topStudentsList")

  container.innerHTML = topStudents
    .map(
      (student, index) => `
        <div class="d-flex align-items-center mb-3 p-2 rounded ${index === 0 ? "bg-light" : ""}">
            <div class="me-3">
                <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                     style="width: 40px; height: 40px; font-weight: bold;">
                    ${index + 1}
                </div>
            </div>
            <div class="flex-grow-1">
                <h6 class="mb-1">${student.name}</h6>
                <small class="text-muted">${student.class}</small>
            </div>
            <div class="text-end">
                <div class="fw-bold text-success">${student.score}%</div>
                <small class="text-success">${student.improvement}</small>
            </div>
        </div>
    `,
    )
    .join("")
}

function initializeCharts() {
  // Attendance Chart
  const attendanceCtx = document.getElementById("attendanceChart").getContext("2d")
  new Chart(attendanceCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Attendance Rate",
          data: [92, 94, 91, 95, 93, 96],
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  })

  // Task Chart
  const taskCtx = document.getElementById("taskChart").getContext("2d")
  new Chart(taskCtx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "In Progress", "Overdue"],
      datasets: [
        {
          data: [65, 25, 10],
          backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  })
}

function updateDashboardStats() {
  // Update stats with actual data
  document.getElementById("totalStudents").textContent = students.length

  // Calculate present today (simulate 8 out of 9 present)
  const presentToday = Math.floor(students.length * 0.89)
  document.getElementById("presentToday").textContent = presentToday

  // Tasks submitted (simulate data)
  document.getElementById("tasksSubmitted").textContent = "15"

  // Average quiz score
  document.getElementById("avgQuizScore").textContent = "85.2%"
}

// Utility functions
function getScoreColor(score) {
  if (score >= 90) return "success"
  if (score >= 80) return "primary"
  if (score >= 70) return "warning"
  return "danger"
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `

  document.body.appendChild(alertDiv)

  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.parentNode.removeChild(alertDiv)
    }
  }, 3000)
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    alert("Logged out successfully!")
    window.location.href = "admin-login.html"
  }
}
