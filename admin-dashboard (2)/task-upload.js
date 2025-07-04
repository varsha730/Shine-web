// Task Upload JavaScript

/*let tasks = []
let taskCounter = 1

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

// Sample existing tasks
const sampleTasks = [
  {
    id: "TASK001",
    title: "Problem Solving Techniques",
    type: "Assignment",
    subject: "Computer",
    class: "BCA",
    description: "Learn Steps to Solve a Problem",
    dueDate: "2024-01-25T23:59",
    maxMarks: 100,
    priority: "High",
    status: "Active",
    submissions: 2,
    createdDate: "2024-01-15",
  },
  {
    id: "TASK002",
    title: "Searching Algorithem",
    type: "Assignment",
    subject: "Algorithm",
    class: "BSc(CS)",
    description: "Learn Linear and Binary Search",
    dueDate: "2024-01-30T23:59",
    maxMarks: 150,
    priority: "Medium",
    status: "Active",
    submissions: 1,
    createdDate: "2024-01-16",
  },
  
  
  
]

document.addEventListener("DOMContentLoaded", () => {
  initializeTaskUpload()
  setupEventListeners()
})

function initializeTaskUpload() {
  tasks = [...sampleTasks]
  taskCounter = tasks.length + 1
  displayTasks()
  updateTaskStats()
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

  // Task form submission
  const taskForm = document.getElementById("taskForm")
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    createTask()
  })
}

function createTask() {
  const title = document.getElementById("taskTitle").value
  const type = document.getElementById("taskType").value
  const subject = document.getElementById("taskSubject").value
  const taskClass = document.getElementById("taskClass").value
  const dueDate = document.getElementById("taskDueDate").value
  const description = document.getElementById("taskDescription").value
  const maxMarks = document.getElementById("taskMaxMarks").value
  const priority = document.getElementById("taskPriority").value
  const files = document.getElementById("taskFiles").files

  // Validate form
  if (!title || !type || !subject || !taskClass || !dueDate || !description || !maxMarks) {
    showAlert("Please fill in all required fields!", "danger")
    return
  }

  // Create new task
  const newTask = {
    id: `TASK${String(taskCounter).padStart(3, "0")}`,
    title: title,
    type: type,
    subject: subject,
    class: taskClass,
    description: description,
    dueDate: dueDate,
    maxMarks: Number.parseInt(maxMarks),
    priority: priority,
    status: "Active",
    submissions: 0,
    createdDate: new Date().toISOString().split("T")[0],
    files: Array.from(files).map((file) => file.name),
  }

  tasks.push(newTask)
  taskCounter++

  // In a real application, you would upload files to server here
  console.log("Task created:", newTask)
  console.log("Files to upload:", files)

  displayTasks()
  updateTaskStats()
  resetForm()
  showAlert("Task created successfully!", "success")
}

function displayTasks() {
  const tableBody = document.getElementById("tasksTableBody")

  if (tasks.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-4">
                    <i class="fas fa-tasks fa-3x text-muted mb-3"></i>
                    <h5>No tasks found</h5>
                    <p class="text-muted">Create your first task using the form above</p>
                </td>
            </tr>
        `
    return
  }

  tableBody.innerHTML = tasks
    .map(
      (task) => `
        <tr>
            <td><strong>${task.id}</strong></td>
            <td>${task.title}</td>
            <td>${task.subject}</td>
            <td><span class="badge bg-primary">${task.class}</span></td>
            <td><span class="badge bg-info">${task.type}</span></td>
            <td>${formatDateTime(task.dueDate)}</td>
            <td><span class="badge bg-${getStatusColor(task.status)}">${task.status}</span></td>
            <td>
                <span class="badge bg-secondary">${task.submissions}</span>
                <small class="text-muted">/ ${getClassStudentCount(task.class)}</small>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewTask('${task.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="editTask('${task.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask('${task.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")
}

function getClassStudentCount(className) {
  return students.filter((student) => student.class === className).length
}

function updateTaskStats() {
  const activeTasks = tasks.filter((task) => task.status === "Active").length
  const totalSubmissions = tasks.reduce((sum, task) => sum + task.submissions, 0)
  const completedTasks = tasks.filter((task) => task.status === "Completed").length
  const overdueTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate)
    const now = new Date()
    return task.status === "Active" && dueDate < now
  }).length

  document.getElementById("activeTasks").textContent = activeTasks
  document.getElementById("pendingSubmissions").textContent = totalSubmissions
  document.getElementById("completedTasks").textContent = completedTasks
  document.getElementById("overdueTasks").textContent = overdueTasks
}

function resetForm() {
  document.getElementById("taskForm").reset()
}

function refreshTasks() {
  displayTasks()
  updateTaskStats()
  showAlert("Tasks refreshed!", "info")
}

function viewTask(taskId) {
  const task = tasks.find((t) => t.id === taskId)
  if (!task) return

  showAlert(`Viewing task: ${task.title}`, "info")
  // In a real application, this would open a detailed view modal
}

function editTask(taskId) {
  const task = tasks.find((t) => t.id === taskId)
  if (!task) return

  // Populate form with task data for editing
  document.getElementById("taskTitle").value = task.title
  document.getElementById("taskType").value = task.type
  document.getElementById("taskSubject").value = task.subject
  document.getElementById("taskClass").value = task.class
  document.getElementById("taskDueDate").value = task.dueDate
  document.getElementById("taskDescription").value = task.description
  document.getElementById("taskMaxMarks").value = task.maxMarks
  document.getElementById("taskPriority").value = task.priority

  showAlert("Task loaded for editing. Modify and submit to update.", "info")
}

function deleteTask(taskId) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter((task) => task.id !== taskId)
    displayTasks()
    updateTaskStats()
    showAlert("Task deleted successfully!", "success")
  }
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

function getStatusColor(status) {
  switch (status) {
    case "Active":
      return "success"
    case "Completed":
      return "primary"
    case "Overdue":
      return "danger"
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
}*/

// Task Upload JavaScript

let tasks = []
let taskCounter = 1

const students = [
  { id: "STU001", name: "Gokul G", class: "BCA" },
  { id: "STU002", name: "Rogini P", class: "BCA" },
  { id: "STU003", name: "Saravana R", class: "BCA" },
  { id: "STU004", name: "Hari B", class: "BSc(CS)" },
  { id: "STU005", name: "Varsha S", class: "MSc(CS)" },
  { id: "STU006", name: "Arsha P", class: "MCA" },
]

document.addEventListener("DOMContentLoaded", () => {
  initializeTaskUpload()
  setupEventListeners()
})

function initializeTaskUpload() {
  tasks = []
  taskCounter = 1
  displayTasks()
  updateTaskStats()
}

function setupEventListeners() {
  document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault()
    createTask()
  })
}

function createTask() {
  const title = document.getElementById("taskTitle").value
  const type = document.getElementById("taskType").value
  const taskClass = document.getElementById("taskClass").value
  const dueDate = document.getElementById("taskDueDate").value
  const description = document.getElementById("taskDescription").value
  const maxMarks = document.getElementById("taskMaxMarks").value
  const priority = document.getElementById("taskPriority").value
  const files = document.getElementById("taskFiles").files

  if (!title || !type || !taskClass || !dueDate || !description || !maxMarks) {
    showAlert("Please fill in all required fields!", "danger")
    return
  }

  const newTask = {
    id: `TASK${String(taskCounter).padStart(3, "0")}`,
    title,
    type,
    class: taskClass,
    description,
    dueDate,
    maxMarks: Number.parseInt(maxMarks),
    priority,
    status: "Active",
    submissions: 0,
    createdDate: new Date().toISOString().split("T")[0],
    files: Array.from(files).map(file => file.name)
  }

  tasks.push(newTask)
  taskCounter++

  displayTasks()
  updateTaskStats()
  document.getElementById("taskForm").reset()
  showAlert("Task created successfully!", "success")
}

function displayTasks() {
  const tableBody = document.getElementById("tasksTableBody")
  tableBody.innerHTML = tasks.length === 0
    ? `<tr><td colspan="8" class="text-center">No tasks found.</td></tr>`
    : tasks.map(task => `
      <tr>
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td><span class="badge bg-primary">${task.class}</span></td>
        <td>${task.type}</td>
        <td>${formatDateTime(task.dueDate)}</td>
        <td><span class="badge bg-${getStatusColor(task.status)}">${task.status}</span></td>
        <td><span class="badge bg-secondary">${task.submissions}</span> / ${getClassStudentCount(task.class)}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="deleteTask('${task.id}')"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`).join("")
}

function updateTaskStats() {
  const activeTasks = tasks.filter(t => t.status === "Active").length
  const totalSubmissions = tasks.reduce((sum, t) => sum + t.submissions, 0)
  const completedTasks = tasks.filter(t => t.status === "Completed").length
  const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status === "Active").length

  document.getElementById("activeTasks").textContent = activeTasks
  document.getElementById("pendingSubmissions").textContent = totalSubmissions
  document.getElementById("completedTasks").textContent = completedTasks
  document.getElementById("overdueTasks").textContent = overdueTasks
}

function getClassStudentCount(className) {
  return students.filter(s => s.class === className).length
}

function deleteTask(taskId) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter(t => t.id !== taskId)
    displayTasks()
    updateTaskStats()
    showAlert("Task deleted!", "success")
  }
}

function formatDateTime(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

function getStatusColor(status) {
  return status === "Active" ? "success" : status === "Completed" ? "primary" : "danger"
}

function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`
  alertDiv.style.cssText = "top: 20px; right: 20px; z-index: 9999; min-width: 300px;"
  alertDiv.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`
  document.body.appendChild(alertDiv)
  setTimeout(() => alertDiv.remove(), 3000)
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    alert("Logged out successfully!")
    window.location.href = "admin-login.html"
  }
}

