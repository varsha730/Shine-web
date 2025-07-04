// Task Submitted JavaScript
/*
let submissions = []

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

// Sample task submissions
const sampleSubmissions = [
  {
    id: "SUB001",
    studentId: "STU001",
    studentName: "Gokul G",
    taskId: "TASK001",
    taskTitle: "Problem Solving Techniques",
    subject: "Computer",
    class: "BCA",
    submittedDate: "2024-01-20T14:30:00",
    status: "Submitted",
    grade: null,
    feedback: "",
    files: ["math_assignment_gokul.pdf"],
  },
  {
    id: "SUB002",
    studentId: "STU002",
    studentName: "Rogini P",
    taskId: "TASK001",
    taskTitle: "Searching Techniques",
    subject: "Data Structure and Algorithm",
    class: "BCA",
    submittedDate: "2024-01-21T16:45:00",
    status: "Graded",
    grade: 85,
    feedback: "Good work! Need to improve on problem 3.",
    files: ["math_assignment_rogini.pdf"],
  },
  {
    id: "SUB003",
    studentId: "STU004",
    studentName: "Hari B",
    taskId: "TASK002",
    taskTitle: "Searching Techniques",
    subject:  "Algorithem",
    class: "BSc(CS)",
    submittedDate: "2024-01-22T10:15:00",
    status: "Submitted",
    grade: null,
    feedback: "",
    files: ["physics_project_hari.pdf", "project_images.zip"],
  },
  {
    id: "SUB004",
    studentId: "STU007",
    studentName: "Vaishavi F",
    taskId: "TASK003",
    taskTitle: "Searching Techniques",
    subject:  "Algorithem",
    class: "MCA",
    submittedDate: "2024-01-23T09:30:00",
    status: "Graded",
    grade: 92,
    feedback: "Excellent analysis and presentation!",
    files: ["chemistry_lab_vaishavi.pdf"],
  },
  {
    id: "SUB005",
    studentId: "STU008",
    studentName: "Sharmila S",
    taskId: "TASK003",
    taskTitle: "Searching Techniques",
    subject:  "Algorithem",
    class: "MCA",
    submittedDate: "2024-01-24T11:20:00",
    status: "Submitted",
    grade: null,
    feedback: "",
    files: ["chemistry_lab_sharmila.pdf"],
  },
  {
    id: "SUB006",
    studentId: "STU009",
    studentName: "Prasanth VK",
    taskId: "TASK005",
    taskTitle: "Searching Techniques",
    subject:  "Algorithem",
    class: "BCA",
    submittedDate: "2024-01-25T15:45:00",
    status: "Graded",
    grade: 78,
    feedback: "Good content but needs better structure.",
    files: ["english_essay_prasanth.docx"],
  },
  {
    id: "SUB007",
    studentId: "STU005",
    studentName: "Varsha S",
    taskId: "TASK002",
    taskTitle: "Searching Techniques",
    subject:  "Algorithem",
    class: "MSc(CS)",
    submittedDate: "2024-01-26T13:10:00",
    status: "Late",
    grade: null,
    feedback: "",
    files: ["physics_project_varsha.pdf"],
  },
  {
    id: "SUB008",
    studentId: "STU003",
    studentName: "Saravana R",
    taskId: "TASK001",
    taskTitle: "Searching Techniques",
    subject:  "Algorithem",
    class: "BCA",
    submittedDate: "2024-01-19T12:00:00",
    status: "Graded",
    grade: 88,
    feedback: "Well done! Clear working shown.",
    files: ["math_assignment_saravana.pdf"],
  },
]

document.addEventListener("DOMContentLoaded", () => {
  initializeSubmissions()
  setupEventListeners()
})

function initializeSubmissions() {
  submissions = [...sampleSubmissions]
  displaySubmissions()
  updateSubmissionStats()
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

function filterSubmissions() {
  const taskFilter = document.getElementById("taskFilter").value
  const statusFilter = document.getElementById("statusFilter").value
  const classFilter = document.getElementById("classFilterSubmissions").value

  let filtered = [...submissions]

  if (taskFilter) {
    filtered = filtered.filter((sub) => sub.taskId === taskFilter)
  }

  if (statusFilter) {
    filtered = filtered.filter((sub) => sub.status === statusFilter)
  }

  if (classFilter) {
    filtered = filtered.filter((sub) => sub.class === classFilter)
  }

  displaySubmissions(filtered)
}

function displaySubmissions(submissionsToShow = submissions) {
  const tableBody = document.getElementById("submissionsTableBody")

  if (submissionsToShow.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4">
                    <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <h5>No submissions found</h5>
                    <p class="text-muted">No task submissions match your current filters</p>
                </td>
            </tr>
        `
    return
  }

  tableBody.innerHTML = submissionsToShow
    .map(
      (submission) => `
        <tr>
            <td><strong>${submission.id}</strong></td>
            <td>${submission.studentName}</td>
            <td>${submission.taskTitle}</td>
            <td>${submission.subject}</td>
            <td>${formatDateTime(submission.submittedDate)}</td>
            <td><span class="badge bg-${getSubmissionStatusColor(submission.status)}">${submission.status}</span></td>
            <td>
                ${
                  submission.grade !== null
                    ? `<span class="badge bg-${getGradeColor(submission.grade)}">${submission.grade}%</span>`
                    : '<span class="text-muted">Not graded</span>'
                }
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewSubmission('${submission.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-success" onclick="gradeSubmission('${submission.id}')">
                    <i class="fas fa-star"></i>
                </button>
                <button class="btn btn-sm btn-info" onclick="downloadFiles('${submission.id}')">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")
}

function updateSubmissionStats() {
  const total = submissions.length
  const pending = submissions.filter((sub) => sub.status === "Submitted" || sub.status === "Late").length
  const graded = submissions.filter((sub) => sub.status === "Graded").length
  const late = submissions.filter((sub) => sub.status === "Late").length

  document.getElementById("totalSubmissions").textContent = total
  document.getElementById("pendingGrading").textContent = pending
  document.getElementById("gradedSubmissions").textContent = graded
  document.getElementById("lateSubmissions").textContent = late
}

function viewSubmission(submissionId) {
  const submission = submissions.find((sub) => sub.id === submissionId)
  if (!submission) return

  showAlert(`Viewing submission by ${submission.studentName}`, "info")
  // In a real application, this would open a detailed view modal
}

function gradeSubmission(submissionId) {
  const submission = submissions.find((sub) => sub.id === submissionId)
  if (!submission) return

  const modalContent = document.getElementById("gradingModalContent")
  modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Submission Details</h6>
                <p><strong>Student:</strong> ${submission.studentName}</p>
                <p><strong>Task:</strong> ${submission.taskTitle}</p>
                <p><strong>Subject:</strong> ${submission.subject}</p>
                <p><strong>Submitted:</strong> ${formatDateTime(submission.submittedDate)}</p>
                <p><strong>Status:</strong> <span class="badge bg-${getSubmissionStatusColor(submission.status)}">${submission.status}</span></p>
            </div>
            <div class="col-md-6">
                <h6>Files Submitted</h6>
                <ul class="list-group">
                    ${submission.files
                      .map(
                        (file) => `
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            ${file}
                            <button class="btn btn-sm btn-outline-primary" onclick="downloadFile('${file}')">
                                <i class="fas fa-download"></i>
                            </button>
                        </li>
                    `,
                      )
                      .join("")}
                </ul>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <label for="gradeInput" class="form-label">Grade (out of 100)</label>
                <input type="number" class="form-control" id="gradeInput" min="0" max="100" 
                       value="${submission.grade || ""}" placeholder="Enter grade">
            </div>
            <div class="col-md-6">
                <label for="feedbackInput" class="form-label">Feedback</label>
                <textarea class="form-control" id="feedbackInput" rows="3" 
                          placeholder="Enter feedback for student">${submission.feedback || ""}</textarea>
            </div>
        </div>
    `

  // Store current submission ID for saving
  window.currentGradingSubmission = submissionId

  const modal = new window.bootstrap.Modal(document.getElementById("gradingModal"))
  modal.show()
}

function saveGrade() {
  const submissionId = window.currentGradingSubmission
  const grade = document.getElementById("gradeInput").value
  const feedback = document.getElementById("feedbackInput").value

  if (!grade) {
    showAlert("Please enter a grade!", "danger")
    return
  }

  const submissionIndex = submissions.findIndex((sub) => sub.id === submissionId)
  if (submissionIndex !== -1) {
    submissions[submissionIndex].grade = Number.parseInt(grade)
    submissions[submissionIndex].feedback = feedback
    submissions[submissionIndex].status = "Graded"
  }

  displaySubmissions()
  updateSubmissionStats()

  const modal = window.bootstrap.Modal.getInstance(document.getElementById("gradingModal"))
  modal.hide()

  showAlert("Grade saved successfully!", "success")
}

function downloadFiles(submissionId) {
  const submission = submissions.find((sub) => sub.id === submissionId)
  if (!submission) return

  // In a real application, this would download the actual files
  showAlert(`Downloading files for ${submission.studentName}`, "info")
  console.log("Files to download:", submission.files)
}

function downloadFile(filename) {
  // In a real application, this would download the specific file
  showAlert(`Downloading ${filename}`, "info")
}

function exportSubmissions() {
  const wb = window.XLSX.utils.book_new()
  const ws = window.XLSX.utils.json_to_sheet(
    submissions.map((sub) => ({
      "Submission ID": sub.id,
      "Student Name": sub.studentName,
      "Task Title": sub.taskTitle,
      Subject: sub.subject,
      Class: sub.class,
      "Submitted Date": sub.submittedDate,
      Status: sub.status,
      Grade: sub.grade || "Not graded",
      Feedback: sub.feedback || "No feedback",
    })),
  )

  window.XLSX.utils.book_append_sheet(wb, ws, "Task Submissions")

  const filename = `task_submissions_${new Date().toISOString().split("T")[0]}.xlsx`
  window.XLSX.writeFile(wb, filename)

  showAlert("Submissions exported successfully!", "success")
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

function getSubmissionStatusColor(status) {
  switch (status) {
    case "Submitted":
      return "primary"
    case "Graded":
      return "success"
    case "Late":
      return "warning"
    case "Pending":
      return "secondary"
    default:
      return "secondary"
  }
}

function getGradeColor(grade) {
  if (grade >= 90) return "success"
  if (grade >= 80) return "primary"
  if (grade >= 70) return "warning"
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
}
*/
let submissions = [
  {
    id: "SUB001",
    studentId: "STU001",
    studentName: "Gokul G",
    taskId: "TASK001",
    taskTitle: "Problem Solving Techniques",
    class: "BCA",
    submittedDate: "2024-01-20T14:30:00",
    status: "Graded",
    grade: "90",
    feedback: "",
    files: ["assignment_gokul.pdf"]
  },
   {
    id: "SUB002",
    studentId: "STU002",
    studentName: "Soundarya R ",
    taskId: "TASK001",
    taskTitle: "Problem Solving Techniques",
    class: "BCA",
    submittedDate: "2024-01-20T14:30:00",
    status: "Graded",
    grade: "90",
    feedback: "",
    files: ["assignment_gokul.pdf"]
  },
   {
    id: "SUB003",
    studentId: "STU003",
    studentName: "Varsha",
    taskId: "TASK001",
    taskTitle: "Problem Solving Techniques",
    class: "MCA",
    submittedDate: "2024-01-20T14:30:00",
    status: "Submitted",
    grade: "70",
    feedback: "",
    files: ["assignment_gokul.pdf"]
  },
   {
    id: "SUB004",
    studentId: "STU005",
    studentName: "Hari G",
    taskId: "TASK001",
    taskTitle: "Problem Solving Techniques",
    class: "BCA",
    submittedDate: "2024-01-20T14:30:00",
    status: "Graded",
    grade: "70",
    feedback: "",
    files: ["assignment_gokul.pdf"]
  }
]

document.addEventListener("DOMContentLoaded", () => {
  displaySubmissions()
  updateSubmissionStats()
})

function displaySubmissions(data = submissions) {
  const tbody = document.getElementById("submissionsTableBody")
  tbody.innerHTML = data.length === 0
    ? `<tr><td colspan="7" class="text-center">No submissions</td></tr>`
    : data.map(sub => `
      <tr>
        <td>${sub.id}</td>
        <td>${sub.studentName}</td>
        <td>${sub.taskTitle}</td>
        <td>${formatDate(sub.submittedDate)}</td>
        <td><span class="badge bg-${statusColor(sub.status)}">${sub.status}</span></td>
        <td>${sub.grade !== null ? `<span class="badge bg-${gradeColor(sub.grade)}">${sub.grade}%</span>` : 'Not graded'}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="viewSubmission('${sub.id}')"><i class="fas fa-eye"></i></button>
          <button class="btn btn-sm btn-success" onclick="gradeSubmission('${sub.id}')"><i class="fas fa-star"></i></button>
        </td>
      </tr>`).join("")
}

function viewSubmission(id) {
  const sub = submissions.find(s => s.id === id)
  alert(`Files: ${sub.files.join(", ")}`)
}

function gradeSubmission(id) {
  const sub = submissions.find(s => s.id === id)
  if (!sub) return

  document.getElementById("gradingModalContent").innerHTML = `
    <p><strong>Student:</strong> ${sub.studentName}</p>
    <p><strong>Task:</strong> ${sub.taskTitle}</p>
    <p><strong>Submitted:</strong> ${formatDate(sub.submittedDate)}</p>
    <label for="gradeInput">Grade</label>
    <input type="number" id="gradeInput" class="form-control mb-2" value="${sub.grade || ""}">
    <label for="feedbackInput">Feedback</label>
    <textarea id="feedbackInput" class="form-control">${sub.feedback || ""}</textarea>
  `
  window.currentSubmissionId = id
  new bootstrap.Modal(document.getElementById("gradingModal")).show()
}

function saveGrade() {
  const id = window.currentSubmissionId
  const grade = parseInt(document.getElementById("gradeInput").value)
  const feedback = document.getElementById("feedbackInput").value
  const sub = submissions.find(s => s.id === id)
  if (!sub || isNaN(grade)) return alert("Invalid grade")
  sub.grade = grade
  sub.feedback = feedback
  sub.status = "Graded"
  displaySubmissions()
  updateSubmissionStats()
  bootstrap.Modal.getInstance(document.getElementById("gradingModal")).hide()
}

function updateSubmissionStats() {
  document.getElementById("totalSubmissions").textContent = submissions.length
  document.getElementById("gradedSubmissions").textContent = submissions.filter(s => s.status === "Graded").length
  document.getElementById("pendingGrading").textContent = submissions.filter(s => s.status === "Submitted").length
  document.getElementById("lateSubmissions").textContent = submissions.filter(s => s.status === "Late").length
}

function exportSubmissions() {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(submissions.map(sub => ({
    "Submission ID": sub.id,
    "Student": sub.studentName,
    "Task": sub.taskTitle,
    "Submitted": sub.submittedDate,
    "Status": sub.status,
    "Grade": sub.grade ?? "Not graded",
    "Feedback": sub.feedback ?? "None"
  })))
  XLSX.utils.book_append_sheet(wb, ws, "Submissions")
  XLSX.writeFile(wb, "task_submissions.xlsx")
}

function formatDate(dt) {
  const d = new Date(dt)
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

function statusColor(status) {
  if (status === "Graded") return "success"
  if (status === "Submitted") return "warning"
  if (status === "Late") return "danger"
  return "secondary"
}

function gradeColor(grade) {
  if (grade >= 90) return "success"
  if (grade >= 75) return "primary"
  if (grade >= 60) return "warning"
  return "danger"
}
function filterSubmissions() {
  const selectedStatus = document.getElementById("statusFilter").value;
  const selectedClass = document.getElementById("classFilterSubmissions").value;

  const filtered = submissions.filter(sub => {
    const statusMatch = !selectedStatus || sub.status === selectedStatus;
    const classMatch = !selectedClass || sub.class === selectedClass;
    return statusMatch && classMatch;
  });

  displaySubmissions(filtered);
}

