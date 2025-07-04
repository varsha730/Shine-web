/*import { Chart } from "@/components/ui/chart"
// Quiz Results JavaScript

let quizResults = []

// Sample students with the names you specified
const students = [
   { id: "STU001", name: "Gokul G", class: "BCA" },
  { id: "STU002", name: "Rogini P", class: "BCA" },
  { id: "STU003", name: "Saravana R", class: "BCA" },
  { id: "STU004", name: "Hari B", class: "BSc(CS)" },
  { id: "STU005", name: "Varsha S", class: "MSc(CS)" },
  { id: "STU006", name: "Arsha P", class: "MCA" },
  { id: "STU007", name: "Vaishavi F", class: "MCA" },
  { id: "STU008", name: "Sharmila S", class: "MCA" },
  { id: "STU009", name: "Prasanth VK", class: "BCA" },
]


// Sample quiz results
const sampleQuizResults = [
  {
    id: "QR001",
    studentId: "STU001",
    studentName: "Gokul G",
    quizId: "QUIZ001",
    quizTitle: "Numerical Ability",
    class: "BCA",
    dateTaken: "2024-01-20T10:30:00",
    score: 85,
    totalMarks: 100,
    timeTaken: "15:30",
    grade: "B+",
    correctAnswers: 17,
    totalQuestions: 20,
  },
  {
    id: "QR002",
    studentId: "STU002",
    studentName: "Rogini P",
    quizId: "QUIZ001",
    quizTitle: "Numerical Ability",
    class: "BCA",
    dateTaken: "2024-01-20T10:30:00",
    score: 92,
    totalMarks: 100,
    timeTaken: "12:45",
    grade: "A-",
    correctAnswers: 18,
    totalQuestions: 20,
  },
  {
    id: "QR003",
    studentId: "STU003",
    studentName: "Saravana R",
    quizId: "QUIZ001",
    quizTitle: "Numerical Ability",
    class: "BCA",
    dateTaken: "2024-01-20T11:00:00",
    score: 78,
    totalMarks: 100,
    timeTaken: "18:20",
    grade: "B",
    correctAnswers: 16,
    totalQuestions: 20,
  },
  {
    id: "QR004",
    studentId: "STU002",
    studentName: "Hari B",
    quizId: "QUIZ002",
    quizTitle: "Logical Reasoning",
    class: "BSC(CS)",
    dateTaken: "2024-01-21T14:00:00",
    score: 88,
    totalMarks: 100,
    timeTaken: "20:15",
    grade: "B+",
    correctAnswers: 22,
    totalQuestions: 25,
  },
  {
    id: "QR005",
    studentId: "STU005",
    studentName: "Varsha S",
    quizId: "QUIZ002",
    quizTitle: "Logical Reasoning",
    class: "MSC(CS)",
    dateTaken: "2024-01-21T14:00:00",
    score: 95,
    totalMarks: 100,
    timeTaken: "16:30",
    grade: "A",
    correctAnswers: 24,
    totalQuestions: 25,
  },
  {
    id: "QR006",
    studentId: "STU006",
    studentName: "Arsha P",
    quizId: "QUIZ002",
    quizTitle: "Logical Reasoning",
    class: "MCA",
    dateTaken: "2024-01-21T15:00:00",
    score: 82,
    totalMarks: 100,
    timeTaken: "19:45",
    grade: "B+",
    correctAnswers: 21,
    totalQuestions: 25,
  },
  {
    id: "QR007",
    studentId: "STU007",
    studentName: "Vaishavi F",
    quizId: "QUIZ003",
    quizTitle: "Programming",
    class: "MCA",
    dateTaken: "2024-01-22T09:30:00",
    score: 98,
    totalMarks: 100,
    timeTaken: "14:20",
    grade: "A+",
    correctAnswers: 19,
    totalQuestions: 20,
  },
  {
    id: "QR008",
    studentId: "STU008",
    studentName: "Sharmila S",
    quizId: "QUIZ003",
    quizTitle: "Programming",
    class: "MCA",
    dateTaken: "2024-01-22T09:30:00",
    score: 89,
    totalMarks: 100,
    timeTaken: "17:10",
    grade: "B+",
    correctAnswers: 18,
    totalQuestions: 20,
  },
  {
    id: "QR009",
    studentId: "STU009",
    studentName: "Prasanth VK",
    quizId: "QUIZ003",
    quizTitle: "Programming",
    class: "BCA",
    dateTaken: "2024-01-23T11:00:00",
    score: 76,
    totalMarks: 100,
    timeTaken: "22:30",
    grade: "B",
    correctAnswers: 15,
    totalQuestions: 20,
  },
]

document.addEventListener("DOMContentLoaded", () => {
  initializeQuizResults()
  setupEventListeners()
})

function initializeQuizResults() {
  quizResults = [...sampleQuizResults]
  displayQuizResults()
  updateQuizStats()
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

function filterQuizResults() {
  const quizFilter = document.getElementById("quizFilter").value
  const subjectFilter = document.getElementById("subjectFilterQuiz").value
  const classFilter = document.getElementById("classFilterQuiz").value

  let filtered = [...quizResults]

  if (quizFilter) {
    filtered = filtered.filter((result) => result.quizId === quizFilter)
  }

  if (subjectFilter) {
    filtered = filtered.filter((result) => result.subject === subjectFilter)
  }

  if (classFilter) {
    filtered = filtered.filter((result) => result.class === classFilter)
  }

  displayQuizResults(filtered)
}

function displayQuizResults(resultsToShow = quizResults) {
  const tableBody = document.getElementById("quizResultsTableBody")

  if (resultsToShow.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-4">
                    <i class="fas fa-chart-bar fa-3x text-muted mb-3"></i>
                    <h5>No quiz results found</h5>
                    <p class="text-muted">No quiz results match your current filters</p>
                </td>
            </tr>
        `
    return
  }

  tableBody.innerHTML = resultsToShow
    .map(
      (result) => `
        <tr>
            <td>${result.studentName}</td>
            <td>${result.quizTitle}</td>
            <td>${result.subject}</td>
            <td><span class="badge bg-primary">${result.class}</span></td>
            <td>${formatDateTime(result.dateTaken)}</td>
            <td>
                <span class="badge bg-${getScoreColor(result.score)}">${result.score}%</span>
                <small class="text-muted">(${result.correctAnswers}/${result.totalQuestions})</small>
            </td>
            <td><span class="badge bg-${getGradeColor(result.grade)}">${result.grade}</span></td>
            <td>${result.timeTaken}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewQuizDetails('${result.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="viewAnalytics('${result.id}')">
                    <i class="fas fa-chart-line"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")
}

function updateQuizStats() {
  const totalQuizzes = [...new Set(quizResults.map((result) => result.quizId))].length
  const avgScore =
    quizResults.length > 0
      ? Math.round((quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length) * 10) / 10
      : 0
  const highestScore = quizResults.length > 0 ? Math.max(...quizResults.map((result) => result.score)) : 0
  const totalStudents = students.length
  const participatedStudents = [...new Set(quizResults.map((result) => result.studentId))].length
  const participationRate = totalStudents > 0 ? Math.round((participatedStudents / totalStudents) * 100) : 0

  document.getElementById("totalQuizzes").textContent = totalQuizzes
  document.getElementById("avgScore").textContent = avgScore + "%"
  document.getElementById("highestScore").textContent = highestScore + "%"
  document.getElementById("participationRate").textContent = participationRate + "%"
}

function initializeCharts() {
  // Performance Trends Chart
  const performanceCtx = document.getElementById("performanceChart").getContext("2d")
  new Chart(performanceCtx, {
    type: "line",
    data: {
      labels: ["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"],
      datasets: [
        {
          label: "Average Score",
          data: [85, 88, 92, 87, 90],
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

  // Grade Distribution Chart
  const gradeCtx = document.getElementById("gradeDistributionChart").getContext("2d")
  const gradeDistribution = calculateGradeDistribution()

  new Chart(gradeCtx, {
    type: "doughnut",
    data: {
      labels: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"],
      datasets: [
        {
          data: gradeDistribution,
          backgroundColor: ["#10b981", "#059669", "#047857", "#3b82f6", "#2563eb", "#1d4ed8", "#f59e0b", "#d97706"],
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

function calculateGradeDistribution() {
  const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C"]
  return grades.map((grade) => quizResults.filter((result) => result.grade === grade).length)
}

function viewQuizDetails(resultId) {
  const result = quizResults.find((r) => r.id === resultId)
  if (!result) return

  const modalContent = document.getElementById("quizDetailsContent")
  modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Student Information</h6>
                <p><strong>Name:</strong> ${result.studentName}</p>
                <p><strong>Class:</strong> ${result.class}</p>
                <p><strong>Student ID:</strong> ${result.studentId}</p>
            </div>
            <div class="col-md-6">
                <h6>Quiz Information</h6>
                <p><strong>Quiz:</strong> ${result.quizTitle}</p>
                <p><strong>Subject:</strong> ${result.subject}</p>
                <p><strong>Date Taken:</strong> ${formatDateTime(result.dateTaken)}</p>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-3">
                <div class="text-center">
                    <h4 class="text-primary">${result.score}%</h4>
                    <p class="mb-0">Final Score</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center">
                    <h4 class="text-success">${result.correctAnswers}/${result.totalQuestions}</h4>
                    <p class="mb-0">Correct Answers</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center">
                    <h4 class="text-info">${result.timeTaken}</h4>
                    <p class="mb-0">Time Taken</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center">
                    <h4 class="text-warning">${result.grade}</h4>
                    <p class="mb-0">Grade</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <h6>Performance Analysis</h6>
                <div class="progress mb-2">
                    <div class="progress-bar bg-success" role="progressbar" 
                         style="width: ${(result.correctAnswers / result.totalQuestions) * 100}%">
                        Correct: ${result.correctAnswers}
                    </div>
                    <div class="progress-bar bg-danger" role="progressbar" 
                         style="width: ${((result.totalQuestions - result.correctAnswers) / result.totalQuestions) * 100}%">
                        Incorrect: ${result.totalQuestions - result.correctAnswers}
                    </div>
                </div>
                <p class="text-muted">
                    ${result.studentName} scored ${result.score}% on this quiz, 
                    answering ${result.correctAnswers} out of ${result.totalQuestions} questions correctly 
                    in ${result.timeTaken} minutes.
                </p>
            </div>
        </div>
    `

  const modal = new window.bootstrap.Modal(document.getElementById("quizDetailsModal"))
  modal.show()
}

function viewAnalytics(resultId) {
  const result = quizResults.find((r) => r.id === resultId)
  if (!result) return

  showAlert(`Viewing detailed analytics for ${result.studentName}`, "info")
  // In a real application, this would show detailed question-wise analysis
}

function refreshQuizResults() {
  displayQuizResults()
  updateQuizStats()
  initializeCharts()
  showAlert("Quiz results refreshed!", "info")
}

function exportQuizResults() {
  const wb = window.XLSX.utils.book_new()
  const ws = window.XLSX.utils.json_to_sheet(
    quizResults.map((result) => ({
      "Student Name": result.studentName,
      "Quiz Title": result.quizTitle,
      Subject: result.subject,
      Class: result.class,
      "Date Taken": result.dateTaken,
      "Score (%)": result.score,
      Grade: result.grade,
      "Correct Answers": result.correctAnswers,
      "Total Questions": result.totalQuestions,
      "Time Taken": result.timeTaken,
    })),
  )

  window.XLSX.utils.book_append_sheet(wb, ws, "Quiz Results")

  const filename = `quiz_results_${new Date().toISOString().split("T")[0]}.xlsx`
  window.XLSX.writeFile(wb, filename)

  showAlert("Quiz results exported successfully!", "success")
}

// Utility functions
function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getScoreColor(score) {
  if (score >= 90) return "success"
  if (score >= 80) return "primary"
  if (score >= 70) return "warning"
  return "danger"
}

function getGradeColor(grade) {
  if (grade.startsWith("A")) return "success"
  if (grade.startsWith("B")) return "primary"
  if (grade.startsWith("C")) return "warning"
  return "danger"
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
}*/
// Sample data
const sampleQuizResults = [
  {
    id: "QR001",
    studentId: "STU001",
    studentName: "Gokul G",
    quizId: "QUIZ001",
    quizTitle: "Numerical Ability",
    subject: "Mathematics",
    class: "BCA",
    dateTaken: "2024-01-20T10:30:00",
    score: 85,
    totalMarks: 100,
    timeTaken: "15:30",
    grade: "B+",
    correctAnswers: 17,
    totalQuestions: 20,
  },
  {
    id: "QR002",
    studentId: "STU002",
    studentName: "Rogini P",
    quizId: "QUIZ001",
    quizTitle: "Numerical Ability",
    subject: "Mathematics",
    class: "BCA",
    dateTaken: "2024-01-20T10:30:00",
    score: 92,
    totalMarks: 100,
    timeTaken: "12:45",
    grade: "A-",
    correctAnswers: 18,
    totalQuestions: 20,
  },
  {
    id: "QR003",
    studentId: "STU003",
    studentName: "Saravana R",
    quizId: "QUIZ001",
    quizTitle: "Numerical Ability",
    subject: "Mathematics",
    class: "BCA",
    dateTaken: "2024-01-20T11:00:00",
    score: 78,
    totalMarks: 100,
    timeTaken: "18:20",
    grade: "B",
    correctAnswers: 16,
    totalQuestions: 20,
  },
  {
    id: "QR004",
    studentId: "STU004",
    studentName: "Hari B",
    quizId: "QUIZ002",
    quizTitle: "Logical Reasoning",
    subject: "Reasoning",
    class: "BSc(CS)",
    dateTaken: "2024-01-21T14:00:00",
    score: 88,
    totalMarks: 100,
    timeTaken: "20:15",
    grade: "B+",
    correctAnswers: 22,
    totalQuestions: 25,
  },
  {
    id: "QR005",
    studentId: "STU005",
    studentName: "Varsha S",
    quizId: "QUIZ002",
    quizTitle: "Logical Reasoning",
    subject: "Reasoning",
    class: "MSc(CS)",
    dateTaken: "2024-01-21T14:00:00",
    score: 95,
    totalMarks: 100,
    timeTaken: "16:30",
    grade: "A",
    correctAnswers: 24,
    totalQuestions: 25,
  },
  {
    id: "QR006",
    studentId: "STU006",
    studentName: "Arsha P",
    quizId: "QUIZ002",
    quizTitle: "Logical Reasoning",
    subject: "Reasoning",
    class: "MCA",
    dateTaken: "2024-01-21T15:00:00",
    score: 82,
    totalMarks: 100,
    timeTaken: "19:45",
    grade: "B+",
    correctAnswers: 21,
    totalQuestions: 25,
  },
  {
    id: "QR007",
    studentId: "STU007",
    studentName: "Vaishavi F",
    quizId: "QUIZ003",
    quizTitle: "Programming",
    subject: "Computer Science",
    class: "MCA",
    dateTaken: "2024-01-22T09:30:00",
    score: 98,
    totalMarks: 100,
    timeTaken: "14:20",
    grade: "A+",
    correctAnswers: 19,
    totalQuestions: 20,
  },
  {
    id: "QR008",
    studentId: "STU008",
    studentName: "Sharmila S",
    quizId: "QUIZ003",
    quizTitle: "Programming",
    subject: "Computer Science",
    class: "MCA",
    dateTaken: "2024-01-22T09:30:00",
    score: 89,
    totalMarks: 100,
    timeTaken: "17:10",
    grade: "B+",
    correctAnswers: 18,
    totalQuestions: 20,
  },
  {
    id: "QR009",
    studentId: "STU009",
    studentName: "Prasanth VK",
    quizId: "QUIZ003",
    quizTitle: "Programming",
    subject: "Computer Science",
    class: "BCA",
    dateTaken: "2024-01-23T11:00:00",
    score: 76,
    totalMarks: 100,
    timeTaken: "22:30",
    grade: "B",
    correctAnswers: 15,
    totalQuestions: 20,
  },
];

// Display quiz results in the table
function displayQuizResults() {
  const tbody = document.getElementById("quizResultsTableBody");
  tbody.innerHTML = sampleQuizResults
    .map((res) => {
      return `
        <tr>
          <td>${res.studentName}</td>
          <td>${res.quizTitle}</td>
          <td>${res.subject}</td>
          <td>${res.class}</td>
          <td>${formatDateTime(res.dateTaken)}</td>
          <td>${res.score}%</td>
          <td>${res.grade}</td>
          <td>${res.timeTaken}</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="viewQuizDetails('${res.id}')">
              View
            </button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-IN", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// View quiz details in modal
function viewQuizDetails(id) {
  const res = sampleQuizResults.find((r) => r.id === id);
  if (!res) return;

  const content = document.getElementById("quizDetailsContent");
  content.innerHTML = `
    <p><strong>Name:</strong> ${res.studentName}</p>
    <p><strong>Quiz:</strong> ${res.quizTitle}</p>
    <p><strong>Subject:</strong> ${res.subject}</p>
    <p><strong>Score:</strong> ${res.score}% (${res.correctAnswers}/${res.totalQuestions})</p>
    <p><strong>Grade:</strong> ${res.grade}</p>
    <p><strong>Time Taken:</strong> ${res.timeTaken}</p>
    <p><strong>Date:</strong> ${formatDateTime(res.dateTaken)}</p>
  `;

  const modal = new bootstrap.Modal(document.getElementById("quizDetailsModal"));
  modal.show();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", displayQuizResults);

