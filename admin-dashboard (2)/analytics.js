import { Chart } from "@/components/ui/chart"
// Analytics JavaScript

let analyticsData = []

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

// Sample analytics data
const sampleAnalyticsData = [
  {
    studentId: "STU001",
    name: "Gokul G",
    class: "10A",
    attendance: 94.5,
    avgGrade: 85.2,
    tasksCompleted: 8,
    totalTasks: 10,
    quizAverage: 87.3,
    improvement: 5.2,
    status: "Excellent",
  },
  {
    studentId: "STU002",
    name: "Rogini P",
    class: "10A",
    attendance: 96.8,
    avgGrade: 91.5,
    tasksCompleted: 9,
    totalTasks: 10,
    quizAverage: 92.0,
    improvement: 3.8,
    status: "Outstanding",
  },
  {
    studentId: "STU003",
    name: "Saravana R",
    class: "10B",
    attendance: 89.2,
    avgGrade: 78.6,
    tasksCompleted: 7,
    totalTasks: 10,
    quizAverage: 78.0,
    improvement: 2.1,
    status: "Good",
  },
  {
    studentId: "STU004",
    name: "Hari B",
    class: "11A",
    attendance: 92.1,
    avgGrade: 88.4,
    tasksCompleted: 8,
    totalTasks: 9,
    quizAverage: 88.0,
    improvement: 4.7,
    status: "Excellent",
  },
  {
    studentId: "STU005",
    name: "Varsha S",
    class: "11A",
    attendance: 97.8,
    avgGrade: 94.2,
    tasksCompleted: 9,
    totalTasks: 9,
    quizAverage: 95.0,
    improvement: 6.3,
    status: "Outstanding",
  },
  {
    studentId: "STU006",
    name: "Arsha P",
    class: "11B",
    attendance: 91.5,
    avgGrade: 82.7,
    tasksCompleted: 7,
    totalTasks: 9,
    quizAverage: 82.0,
    improvement: 1.9,
    status: "Good",
  },
  {
    studentId: "STU007",
    name: "Vaishavi F",
    class: "12A",
    attendance: 98.5,
    avgGrade: 96.8,
    tasksCompleted: 8,
    totalTasks: 8,
    quizAverage: 98.0,
    improvement: 7.2,
    status: "Outstanding",
  },
  {
    studentId: "STU008",
    name: "Sharmila S",
    class: "12A",
    attendance: 95.2,
    avgGrade: 89.3,
    tasksCompleted: 7,
    totalTasks: 8,
    quizAverage: 89.0,
    improvement: 3.5,
    status: "Excellent",
  },
  {
    studentId: "STU009",
    name: "Prasanth VK",
    class: "12B",
    attendance: 87.6,
    avgGrade: 76.4,
    tasksCompleted: 6,
    totalTasks: 8,
    quizAverage: 76.0,
    improvement: -1.2,
    status: "Needs Improvement",
  },
]

document.addEventListener("DOMContentLoaded", () => {
  initializeAnalytics()
  setupEventListeners()
})

function initializeAnalytics() {
  analyticsData = [...sampleAnalyticsData]
  displayStudentAnalytics()
  updateAnalyticsMetrics()
  initializeCharts()
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

function updateAnalytics() {
  const timePeriod = document.getElementById("timePeriod").value
  const selectedClass = document.getElementById("analyticsClass").value

  // Filter data based on selections
  let filteredData = [...analyticsData]
  if (selectedClass) {
    filteredData = analyticsData.filter((student) => student.class === selectedClass)
  }

  displayStudentAnalytics(filteredData)
  updateAnalyticsMetrics(filteredData)
  showAlert(`Analytics updated for ${timePeriod}`, "info")
}

function displayStudentAnalytics(dataToShow = analyticsData) {
  const tableBody = document.getElementById("studentAnalyticsTable")

  if (dataToShow.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4">
                    <i class="fas fa-chart-line fa-3x text-muted mb-3"></i>
                    <h5>No analytics data found</h5>
                    <p class="text-muted">No student data matches your current filters</p>
                </td>
            </tr>
        `
    return
  }

  tableBody.innerHTML = dataToShow
    .map(
      (student) => `
        <tr>
            <td><strong>${student.name}</strong></td>
            <td><span class="badge bg-primary">${student.class}</span></td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-2" style="height: 8px;">
                        <div class="progress-bar bg-${getAttendanceColor(student.attendance)}" 
                             style="width: ${student.attendance}%"></div>
                    </div>
                    <small>${student.attendance}%</small>
                </div>
            </td>
            <td>
                <span class="badge bg-${getGradeColor(student.avgGrade)}">${student.avgGrade}%</span>
            </td>
            <td>
                <span class="text-muted">${student.tasksCompleted}/${student.totalTasks}</span>
                <div class="progress mt-1" style="height: 4px;">
                    <div class="progress-bar bg-info" 
                         style="width: ${(student.tasksCompleted / student.totalTasks) * 100}%"></div>
                </div>
            </td>
            <td><span class="badge bg-${getGradeColor(student.quizAverage)}">${student.quizAverage}%</span></td>
            <td>
                <span class="badge bg-${getImprovementColor(student.improvement)}">
                    ${student.improvement > 0 ? "+" : ""}${student.improvement}%
                </span>
            </td>
            <td><span class="badge bg-${getStatusColor(student.status)}">${student.status}</span></td>
        </tr>
    `,
    )
    .join("")
}

function updateAnalyticsMetrics(dataToShow = analyticsData) {
  const totalStudents = dataToShow.length
  const avgAttendance =
    dataToShow.length > 0
      ? Math.round((dataToShow.reduce((sum, student) => sum + student.attendance, 0) / dataToShow.length) * 10) / 10
      : 0
  const avgGrade =
    dataToShow.length > 0
      ? Math.round((dataToShow.reduce((sum, student) => sum + student.avgGrade, 0) / dataToShow.length) * 10) / 10
      : 0
  const totalTasksCompleted = dataToShow.reduce((sum, student) => sum + student.tasksCompleted, 0)
  const totalTasks = dataToShow.reduce((sum, student) => sum + student.totalTasks, 0)
  const taskCompletion = totalTasks > 0 ? Math.round((totalTasksCompleted / totalTasks) * 100) : 0
  const avgQuizTime = "12.5m" // This would be calculated from actual quiz data
  const avgImprovement =
    dataToShow.length > 0
      ? Math.round((dataToShow.reduce((sum, student) => sum + student.improvement, 0) / dataToShow.length) * 10) / 10
      : 0

  document.getElementById("totalStudentsAnalytics").textContent = totalStudents
  document.getElementById("avgAttendance").textContent = avgAttendance + "%"
  document.getElementById("avgGrade").textContent = avgGrade + "%"
  document.getElementById("taskCompletion").textContent = taskCompletion + "%"
  document.getElementById("avgQuizTime").textContent = avgQuizTime
  document.getElementById("improvement").textContent = (avgImprovement > 0 ? "+" : "") + avgImprovement + "%"
}

function initializeCharts() {
  // Performance Trend Chart
  const performanceTrendCtx = document.getElementById("performanceTrendChart").getContext("2d")
  new Chart(performanceTrendCtx, {
    type: "line",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      datasets: [
        {
          label: "Average Grade",
          data: [82, 84, 86, 85, 87, 89],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Attendance Rate",
          data: [90, 92, 91, 93, 94, 95],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  })

  // Subject Performance Chart
  const subjectPerformanceCtx = document.getElementById("subjectPerformanceChart").getContext("2d")
  new Chart(subjectPerformanceCtx, {
    type: "radar",
    data: {
      labels: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
      datasets: [
        {
          label: "Average Performance",
          data: [85, 88, 92, 87, 83],
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "#3b82f6",
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#3b82f6",
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
        r: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  })

  // Attendance vs Performance Chart
  const attendancePerformanceCtx = document.getElementById("attendancePerformanceChart").getContext("2d")
  new Chart(attendancePerformanceCtx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Students",
          data: analyticsData.map((student) => ({
            x: student.attendance,
            y: student.avgGrade,
          })),
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "#3b82f6",
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
        x: {
          title: {
            display: true,
            text: "Attendance %",
          },
          min: 80,
          max: 100,
        },
        y: {
          title: {
            display: true,
            text: "Average Grade %",
          },
          min: 70,
          max: 100,
        },
      },
    },
  })

  // Task Timeline Chart
  const taskTimelineCtx = document.getElementById("taskTimelineChart").getContext("2d")
  new Chart(taskTimelineCtx, {
    type: "bar",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      datasets: [
        {
          label: "Tasks Assigned",
          data: [12, 15, 10, 18, 14, 16],
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          borderColor: "#3b82f6",
          borderWidth: 1,
        },
        {
          label: "Tasks Completed",
          data: [10, 13, 9, 15, 12, 14],
          backgroundColor: "rgba(16, 185, 129, 0.6)",
          borderColor: "#10b981",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

function exportAnalytics() {
  const wb = window.XLSX.utils.book_new()

  // Student Analytics Sheet
  const studentWs = window.XLSX.utils.json_to_sheet(
    analyticsData.map((student) => ({
      "Student Name": student.name,
      Class: student.class,
      "Attendance %": student.attendance,
      "Average Grade %": student.avgGrade,
      "Tasks Completed": student.tasksCompleted,
      "Total Tasks": student.totalTasks,
      "Quiz Average %": student.quizAverage,
      "Improvement %": student.improvement,
      Status: student.status,
    })),
  )

  window.XLSX.utils.book_append_sheet(wb, studentWs, "Student Analytics")

  // Summary Sheet
  const summaryData = [
    { Metric: "Total Students", Value: analyticsData.length },
    {
      Metric: "Average Attendance",
      Value:
        Math.round((analyticsData.reduce((sum, s) => sum + s.attendance, 0) / analyticsData.length) * 10) / 10 + "%",
    },
    {
      Metric: "Average Grade",
      Value: Math.round((analyticsData.reduce((sum, s) => sum + s.avgGrade, 0) / analyticsData.length) * 10) / 10 + "%",
    },
    {
      Metric: "Task Completion Rate",
      Value:
        Math.round(
          (analyticsData.reduce((sum, s) => sum + s.tasksCompleted, 0) /
            analyticsData.reduce((sum, s) => sum + s.totalTasks, 0)) *
            100,
        ) + "%",
    },
  ]

  const summaryWs = window.XLSX.utils.json_to_sheet(summaryData)
  window.XLSX.utils.book_append_sheet(wb, summaryWs, "Summary")

  const filename = `analytics_report_${new Date().toISOString().split("T")[0]}.xlsx`
  window.XLSX.writeFile(wb, filename)

  showAlert("Analytics report exported successfully!", "success")
}

// Utility functions
function getAttendanceColor(attendance) {
  if (attendance >= 95) return "success"
  if (attendance >= 90) return "primary"
  if (attendance >= 85) return "warning"
  return "danger"
}

function getGradeColor(grade) {
  if (grade >= 90) return "success"
  if (grade >= 80) return "primary"
  if (grade >= 70) return "warning"
  return "danger"
}

function getImprovementColor(improvement) {
  if (improvement > 3) return "success"
  if (improvement > 0) return "primary"
  if (improvement >= -2) return "warning"
  return "danger"
}

function getStatusColor(status) {
  switch (status) {
    case "Outstanding":
      return "success"
    case "Excellent":
      return "primary"
    case "Good":
      return "info"
    case "Needs Improvement":
      return "warning"
    default:
      return "secondary"
  }
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
