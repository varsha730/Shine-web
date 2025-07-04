// Attendance Management JavaScript

let attendanceData = []
const currentDate = new Date().toISOString().split("T")[0]

// Sample students with the names you specified
const students = [
  { id: "STU001", name: "Gokul G", class: "BCA" },
  { id: "STU002", name: "Rogini P", class: "BCA" },
  { id: "STU003", name: "Saravana R", class: "BCA" },
  { id: "STU004", name: "Hari B", class: "BSc(CS)" },
  { id: "STU005", name: "Varsha S", class: "BCA" },
  { id: "STU006", name: "Arsha P", class: "MCA" },
  { id: "STU007", name: "Vaishavi F", class: "MCA" },
  { id: "STU008", name: "Sharmila S", class: "MCA" },
  { id: "STU009", name: "Prasanth VK", class: "BCA" },
]

document.addEventListener("DOMContentLoaded", () => {
  initializeAttendance()
  setupEventListeners()
})

function initializeAttendance() {
  // Set today's date
  document.getElementById("attendanceDate").value = currentDate

  // Initialize attendance data
  attendanceData = students.map((student) => ({
    ...student,
    status: "present",
    timeIn: "09:00",
    timeOut: "",
    date: currentDate,
  }))

  loadAttendance()
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

function loadAttendance() {
  const selectedClass = document.getElementById("classSelect").value
  const selectedDate = document.getElementById("attendanceDate").value

  // Filter students by class
  let filteredStudents = students
  if (selectedClass) {
    filteredStudents = students.filter((student) => student.class === selectedClass)
  }

  displayAttendance(filteredStudents)
  updateAttendanceStats()
}

function displayAttendance(studentsToShow) {
  const tableBody = document.getElementById("attendanceTableBody")

  tableBody.innerHTML = studentsToShow
    .map((student) => {
      const attendance = attendanceData.find((a) => a.id === student.id) || {
        ...student,
        status: "present",
        timeIn: "09:00",
        timeOut: "",
      }

      return `
            <tr>
                <td><strong>${student.id}</strong></td>
                <td>${student.name}</td>
                <td><span class="badge bg-primary">${student.class}</span></td>
                <td>
                    <input type="time" class="form-control form-control-sm" 
                           value="${attendance.timeIn}" 
                           onchange="updateTimeIn('${student.id}', this.value)">
                </td>
                <td>
                    <input type="time" class="form-control form-control-sm" 
                           value="${attendance.timeOut}" 
                           onchange="updateTimeOut('${student.id}', this.value)">
                </td>
                <td>
                    <select class="form-select form-select-sm" 
                            onchange="updateStatus('${student.id}', this.value)">
                        <option value="present" ${attendance.status === "present" ? "selected" : ""}>Present</option>
                        <option value="absent" ${attendance.status === "absent" ? "selected" : ""}>Absent</option>
                        <option value="late" ${attendance.status === "late" ? "selected" : ""}>Late</option>
                        <option value="excused" ${attendance.status === "excused" ? "selected" : ""}>Excused</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="markPresent('${student.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="markAbsent('${student.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        `
    })
    .join("")
}

function updateStatus(studentId, status) {
  const index = attendanceData.findIndex((a) => a.id === studentId)
  if (index !== -1) {
    attendanceData[index].status = status
  } else {
    const student = students.find((s) => s.id === studentId)
    attendanceData.push({
      ...student,
      status: status,
      timeIn: "09:00",
      timeOut: "",
      date: currentDate,
    })
  }
  updateAttendanceStats()
}

function updateTimeIn(studentId, time) {
  const index = attendanceData.findIndex((a) => a.id === studentId)
  if (index !== -1) {
    attendanceData[index].timeIn = time
  }
}

function updateTimeOut(studentId, time) {
  const index = attendanceData.findIndex((a) => a.id === studentId)
  if (index !== -1) {
    attendanceData[index].timeOut = time
  }
}

function markPresent(studentId) {
  updateStatus(studentId, "present")
  loadAttendance()
}

function markAbsent(studentId) {
  updateStatus(studentId, "absent")
  loadAttendance()
}

function markAllPresent() {
  const selectedClass = document.getElementById("classSelect").value
  let studentsToMark = students

  if (selectedClass) {
    studentsToMark = students.filter((student) => student.class === selectedClass)
  }

  studentsToMark.forEach((student) => {
    updateStatus(student.id, "present")
  })

  loadAttendance()
  showAlert("All students marked as present!", "success")
}

function updateAttendanceStats() {
  const selectedClass = document.getElementById("classSelect").value
  let relevantData = attendanceData

  if (selectedClass) {
    relevantData = attendanceData.filter((a) => a.class === selectedClass)
  }

  const present = relevantData.filter((a) => a.status === "present").length
  const absent = relevantData.filter((a) => a.status === "absent").length
  const late = relevantData.filter((a) => a.status === "late").length
  const total = relevantData.length

  document.getElementById("presentCount").textContent = present
  document.getElementById("absentCount").textContent = absent
  document.getElementById("lateCount").textContent = late

  const percentage = total > 0 ? Math.round((present / total) * 100) : 0
  document.getElementById("attendancePercentage").textContent = percentage + "%"
}

function saveAttendance() {
  // In a real application, this would save to your Spring Boot backend
  // Example: fetch('/api/admin/attendance', { method: 'POST', body: JSON.stringify(attendanceData) })

  console.log("Saving attendance data:", attendanceData)
  showAlert("Attendance saved successfully!", "success")
}

function exportAttendance() {
  const selectedClass = document.getElementById("classSelect").value
  const selectedDate = document.getElementById("attendanceDate").value

  let exportData = attendanceData
  if (selectedClass) {
    exportData = attendanceData.filter((a) => a.class === selectedClass)
  }

  const wb = window.XLSX.utils.book_new()
  const ws = window.XLSX.utils.json_to_sheet(
    exportData.map((student) => ({
      "Student ID": student.id,
      Name: student.name,
      Class: student.class,
      Date: selectedDate,
      Status: student.status,
      "Time In": student.timeIn,
      "Time Out": student.timeOut,
    })),
  )

  window.XLSX.utils.book_append_sheet(wb, ws, "Attendance")

  const filename = `attendance_${selectedClass || "all"}_${selectedDate}.xlsx`
  window.XLSX.writeFile(wb, filename)

  showAlert("Attendance exported successfully!", "success")
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
