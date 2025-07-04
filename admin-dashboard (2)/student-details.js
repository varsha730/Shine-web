// Student Details JavaScript

let studentsData = []
let currentEditingStudent = null

// Sample students with the names you specified and additional details
const sampleStudents = [
  {
    id: "STU001",
    name: "Gokul G",
    class: "BCA",
    email: "gokul.g@school.edu",
    phone: "+91 9876543210",
    dob: "2008-05-15",
    parentName: "Gopal G",
    parentPhone: "+91 9876543211",
    address: "123 Main Street, Chennai, Tamil Nadu",
    attendance: 94.5,
    grade: 85.2,
    status: "Active",
    enrollmentDate: "2023-06-01",
  },
  {
    id: "STU002",
    name: "Rogini P",
    class: "BCA",
    email: "rogini.p@school.edu",
    phone: "+91 9876543212",
    dob: "2008-08-22",
    parentName: "Prakash P",
    parentPhone: "+91 9876543213",
    address: "456 Oak Avenue, Chennai, Tamil Nadu",
    attendance: 96.8,
    grade: 91.5,
    status: "Active",
    enrollmentDate: "2023-06-01",
  },
  {
    id: "STU003",
    name: "Saravana R",
    class: "BCA",
    email: "saravana.r@school.edu",
    phone: "+91 9876543214",
    dob: "2008-03-10",
    parentName: "Raman R",
    parentPhone: "+91 9876543215",
    address: "789 Pine Road, Chennai, Tamil Nadu",
    attendance: 89.2,
    grade: 78.6,
    status: "Active",
    enrollmentDate: "2023-06-01",
  },
  {
    id: "STU004",
    name: "Hari B",
    class: "BSc(CS)",
    email: "hari.b@school.edu",
    phone: "+91 9876543216",
    dob: "2007-11-05",
    parentName: "Bala B",
    parentPhone: "+91 9876543217",
    address: "321 Elm Street, Chennai, Tamil Nadu",
    attendance: 92.1,
    grade: 88.4,
    status: "Active",
    enrollmentDate: "2022-06-01",
  },
  {
    id: "STU005",
    name: "Varsha S",
    class: "MSc(CS)",
    email: "varsha.s@school.edu",
    phone: "+91 9876543218",
    dob: "2007-07-18",
    parentName: "Suresh S",
    parentPhone: "+91 9876543219",
    address: "654 Maple Drive, Chennai, Tamil Nadu",
    attendance: 97.8,
    grade: 94.2,
    status: "Active",
    enrollmentDate: "2022-06-01",
  },
  {
    id: "STU006",
    name: "Arsha P",
    class: "MCA",
    email: "arsha.p@school.edu",
    phone: "+91 9876543220",
    dob: "2007-12-30",
    parentName: "Pradeep P",
    parentPhone: "+91 9876543221",
    address: "987 Cedar Lane, Chennai, Tamil Nadu",
    attendance: 91.5,
    grade: 82.7,
    status: "Active",
    enrollmentDate: "2022-06-01",
  },
  {
    id: "STU007",
    name: "Vaishavi F",
    class: "MCA",
    email: "vaishavi.f@school.edu",
    phone: "+91 9876543222",
    dob: "2006-09-12",
    parentName: "Francis F",
    parentPhone: "+91 9876543223",
    address: "147 Birch Boulevard, Chennai, Tamil Nadu",
    attendance: 98.5,
    grade: 96.8,
    status: "Active",
    enrollmentDate: "2021-06-01",
  },
  {
    id: "STU008",
    name: "Sharmila S",
    class: "MCA",
    email: "sharmila.s@school.edu",
    phone: "+91 9876543224",
    dob: "2006-04-25",
    parentName: "Shankar S",
    parentPhone: "+91 9876543225",
    address: "258 Willow Way, Chennai, Tamil Nadu",
    attendance: 95.2,
    grade: 89.3,
    status: "Active",
    enrollmentDate: "2021-06-01",
  },
  {
    id: "STU009",
    name: "Prasanth VK",
    class: "BCA",
    email: "prasanth.vk@school.edu",
    phone: "+91 9876543226",
    dob: "2006-01-08",
    parentName: "Vijay Kumar VK",
    parentPhone: "+91 9876543227",
    address: "369 Spruce Street, Chennai, Tamil Nadu",
    attendance: 87.6,
    grade: 76.4,
    status: "Active",
    enrollmentDate: "2021-06-01",
  },
]

document.addEventListener("DOMContentLoaded", () => {
  initializeStudentDetails()
  setupEventListeners()
})

function initializeStudentDetails() {
  studentsData = [...sampleStudents]
  displayStudents()
  updateStudentStats()
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

  // Search functionality
  const searchInput = document.getElementById("searchStudent")
  searchInput.addEventListener("input", filterStudents)
}

function filterStudents() {
  const searchTerm = document.getElementById("searchStudent").value.toLowerCase()
  const classFilter = document.getElementById("classFilter").value
  const statusFilter = document.getElementById("statusFilter").value

  let filtered = [...studentsData]

  if (searchTerm) {
    filtered = filtered.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.id.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm),
    )
  }

  if (classFilter) {
    filtered = filtered.filter((student) => student.class === classFilter)
  }

  if (statusFilter) {
    filtered = filtered.filter((student) => student.status === statusFilter)
  }

  displayStudents(filtered)
}

function displayStudents(studentsToShow = studentsData) {
  const tableBody = document.getElementById("studentsTableBody")

  if (studentsToShow.length === 0) {
    tableBody.innerHTML = `
            <tr>
                <td colspan="9" class="text-center py-4">
                    <i class="fas fa-users fa-3x text-muted mb-3"></i>
                    <h5>No students found</h5>
                    <p class="text-muted">No students match your current search criteria</p>
                </td>
            </tr>
        `
    return
  }

  tableBody.innerHTML = studentsToShow
    .map(
      (student) => `
        <tr>
            <td><strong>${student.id}</strong></td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" 
                         style="width: 35px; height: 35px; font-size: 14px;">
                        ${student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </div>
                    <strong>${student.name}</strong>
                </div>
            </td>
            <td><span class="badge bg-primary">${student.class}</span></td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-2" style="height: 8px;">
                        <div class="progress-bar bg-${getAttendanceColor(student.attendance)}" 
                             style="width: ${student.attendance}%"></div>
                    </div>
                    <small>${student.attendance}%</small>
                </div>
            </td>
            <td><span class="badge bg-${getGradeColor(student.grade)}">${student.grade}%</span></td>
            <td><span class="badge bg-${getStatusColor(student.status)}">${student.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewStudentDetails('${student.id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="editStudent('${student.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `,
    )
    .join("")
}

function updateStudentStats() {
  const totalStudents = studentsData.length
  const activeStudents = studentsData.filter((student) => student.status === "Active").length
  const avgAttendance =
    studentsData.length > 0
      ? Math.round((studentsData.reduce((sum, student) => sum + student.attendance, 0) / studentsData.length) * 10) / 10
      : 0
  const avgGrade =
    studentsData.length > 0
      ? Math.round((studentsData.reduce((sum, student) => sum + student.grade, 0) / studentsData.length) * 10) / 10
      : 0

  document.getElementById("totalStudentsCount").textContent = totalStudents
  document.getElementById("activeStudents").textContent = activeStudents
  document.getElementById("avgAttendanceRate").textContent = avgAttendance + "%"
  document.getElementById("avgGradePoint").textContent = avgGrade + "%"
}

function showAddStudentModal() {
  currentEditingStudent = null
  document.getElementById("studentModalTitle").textContent = "Add New Student"
  document.getElementById("studentForm").reset()

  // Generate new student ID
  const nextId = `STU${String(studentsData.length + 1).padStart(3, "0")}`
  document.getElementById("studentId").value = nextId

  const modal = new window.bootstrap.Modal(document.getElementById("studentModal"))
  modal.show()
}

function editStudent(studentId) {
  const student = studentsData.find((s) => s.id === studentId)
  if (!student) return

  currentEditingStudent = studentId
  document.getElementById("studentModalTitle").textContent = "Edit Student"

  // Populate form with student data
  document.getElementById("studentId").value = student.id
  document.getElementById("studentName").value = student.name
  document.getElementById("studentClass").value = student.class
  document.getElementById("studentEmail").value = student.email
  document.getElementById("studentPhone").value = student.phone
  document.getElementById("studentDOB").value = student.dob
  document.getElementById("parentName").value = student.parentName
  document.getElementById("parentPhone").value = student.parentPhone
  document.getElementById("studentAddress").value = student.address

  const modal = new window.bootstrap.Modal(document.getElementById("studentModal"))
  modal.show()
}

function saveStudent() {
  const studentData = {
    id: document.getElementById("studentId").value,
    name: document.getElementById("studentName").value,
    class: document.getElementById("studentClass").value,
    email: document.getElementById("studentEmail").value,
    phone: document.getElementById("studentPhone").value,
    dob: document.getElementById("studentDOB").value,
    parentName: document.getElementById("parentName").value,
    parentPhone: document.getElementById("parentPhone").value,
    address: document.getElementById("studentAddress").value,
  }

  // Validate form
  if (!studentData.id || !studentData.name || !studentData.class || !studentData.email) {
    showAlert("Please fill in all required fields!", "danger")
    return
  }

  if (currentEditingStudent) {
    // Update existing student
    const index = studentsData.findIndex((s) => s.id === currentEditingStudent)
    if (index !== -1) {
      studentsData[index] = { ...studentsData[index], ...studentData }
      showAlert("Student updated successfully!", "success")
    }
  } else {
    // Add new student
    const newStudent = {
      ...studentData,
      attendance: 100.0,
      grade: 0.0,
      status: "Active",
      enrollmentDate: new Date().toISOString().split("T")[0],
    }
    studentsData.push(newStudent)
    showAlert("Student added successfully!", "success")
  }

  displayStudents()
  updateStudentStats()

  const modal = window.bootstrap.Modal.getInstance(document.getElementById("studentModal"))
  modal.hide()
}

function deleteStudent(studentId) {
  const student = studentsData.find((s) => s.id === studentId)
  if (!student) return

  if (confirm(`Are you sure you want to delete ${student.name}?`)) {
    studentsData = studentsData.filter((s) => s.id !== studentId)
    displayStudents()
    updateStudentStats()
    showAlert("Student deleted successfully!", "success")
  }
}

function viewStudentDetails(studentId) {
  const student = studentsData.find((s) => s.id === studentId)
  if (!student) return

  const modalContent = document.getElementById("studentDetailsContent")
  modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="text-center mb-4">
                    <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" 
                         style="width: 100px; height: 100px; font-size: 36px;">
                        ${student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                    </div>
                    <h4>${student.name}</h4>
                    <p class="text-muted">${student.id} • ${student.class}</p>
                    <span class="badge bg-${getStatusColor(student.status)} fs-6">${student.status}</span>
                </div>
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <h6>Personal Information</h6>
                        <p><strong>Email:</strong> ${student.email}</p>
                        <p><strong>Phone:</strong> ${student.phone}</p>
                        <p><strong>Date of Birth:</strong> ${formatDate(student.dob)}</p>
                        <p><strong>Address:</strong> ${student.address}</p>
                    </div>
                    <div class="col-md-6">
                        <h6>Parent/Guardian Information</h6>
                        <p><strong>Name:</strong> ${student.parentName}</p>
                        <p><strong>Phone:</strong> ${student.parentPhone}</p>
                        <p><strong>Enrollment Date:</strong> ${formatDate(student.enrollmentDate)}</p>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-3">
                <div class="text-center">
                    <h4 class="text-primary">${student.attendance}%</h4>
                    <p class="mb-0">Attendance Rate</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center">
                    <h4 class="text-success">${student.grade}%</h4>
                    <p class="mb-0">Average Grade</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center">
                    <h4 class="text-info">${student.class}</h4>
                    <p class="mb-0">Current Class</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="text-center">
                    <h4 class="text-warning">${calculateAge(student.dob)}</h4>
                    <p class="mb-0">Age (Years)</p>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <h6>Academic Performance</h6>
                <div class="progress mb-2">
                    <div class="progress-bar bg-success" style="width: ${student.attendance}%">
                        Attendance: ${student.attendance}%
                    </div>
                </div>
                <div class="progress mb-2">
                    <div class="progress-bar bg-primary" style="width: ${student.grade}%">
                        Grade: ${student.grade}%
                    </div>
                </div>
                <p class="text-muted mt-3">
                    ${student.name} is currently enrolled in ${student.class} with an attendance rate of ${student.attendance}% 
                    and an average grade of ${student.grade}%. Student status: ${student.status}.
                </p>
            </div>
        </div>
    `

  const modal = new window.bootstrap.Modal(document.getElementById("studentDetailsModal"))
  modal.show()
}

function refreshStudents() {
  displayStudents()
  updateStudentStats()
  showAlert("Student data refreshed!", "info")
}

function exportStudents() {
  const wb = window.XLSX.utils.book_new()
  const ws = window.XLSX.utils.json_to_sheet(
    studentsData.map((student) => ({
      "Student ID": student.id,
      Name: student.name,
      Class: student.class,
      Email: student.email,
      Phone: student.phone,
      "Date of Birth": student.dob,
      "Parent Name": student.parentName,
      "Parent Phone": student.parentPhone,
      Address: student.address,
      "Attendance %": student.attendance,
      "Grade %": student.grade,
      Status: student.status,
      "Enrollment Date": student.enrollmentDate,
    })),
  )

  window.XLSX.utils.book_append_sheet(wb, ws, "Students")

  const filename = `students_${new Date().toISOString().split("T")[0]}.xlsx`
  window.XLSX.writeFile(wb, filename)

  showAlert("Student data exported successfully!", "success")
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

function getStatusColor(status) {
  switch (status) {
    case "Active":
      return "success"
    case "Inactive":
      return "warning"
    case "Graduated":
      return "primary"
    default:
      return "secondary"
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function calculateAge(dob) {
  const today = new Date()
  const birthDate = new Date(dob)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
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
