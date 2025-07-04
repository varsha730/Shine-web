// User Management JavaScript

let currentUsers = []
let selectedUserId = null

// Sample users data - Replace with actual API calls
const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, State",
    registrationDate: "2024-01-15",
    lastLogin: "2024-01-20",
    status: "active",
    profilePicture: null,
    additionalInfo: {
      age: 30,
      occupation: "Software Engineer",
      interests: ["Technology", "Sports", "Music"],
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    address: "456 Oak Ave, City, State",
    registrationDate: "2024-01-14",
    lastLogin: "2024-01-19",
    status: "active",
    profilePicture: null,
    additionalInfo: {
      age: 28,
      occupation: "Designer",
      interests: ["Art", "Travel", "Photography"],
    },
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1234567892",
    address: "789 Pine Rd, City, State",
    registrationDate: "2024-01-13",
    lastLogin: "2024-01-10",
    status: "inactive",
    profilePicture: null,
    additionalInfo: {
      age: 35,
      occupation: "Manager",
      interests: ["Business", "Golf", "Reading"],
    },
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1234567893",
    address: "321 Elm St, City, State",
    registrationDate: "2024-01-12",
    lastLogin: "2024-01-20",
    status: "active",
    profilePicture: null,
    additionalInfo: {
      age: 26,
      occupation: "Teacher",
      interests: ["Education", "Books", "Yoga"],
    },
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1234567894",
    address: "654 Maple Dr, City, State",
    registrationDate: "2024-01-11",
    lastLogin: "2024-01-05",
    status: "suspended",
    profilePicture: null,
    additionalInfo: {
      age: 42,
      occupation: "Consultant",
      interests: ["Finance", "Travel", "Cooking"],
    },
  },
]

document.addEventListener("DOMContentLoaded", () => {
  initializeUserManagement()
  setupEventListeners()
})

function initializeUserManagement() {
  currentUsers = [...sampleUsers]
  displayUsers(currentUsers)
  setupSearch()
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

  // Search input real-time search
  const searchInput = document.getElementById("userSearch")
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    if (searchTerm.length >= 2 || searchTerm.length === 0) {
      performSearch()
    }
  })

  // Status filter change
  const statusFilter = document.getElementById("statusFilter")
  statusFilter.addEventListener("change", performSearch)

  // Delete confirmation
  document.getElementById("confirmDeleteBtn").addEventListener("click", confirmDelete)
}

function setupSearch() {
  const searchInput = document.getElementById("userSearch")

  // Check if there's a userId in URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const userId = urlParams.get("userId")

  if (userId) {
    const user = sampleUsers.find((u) => u.id == userId)
    if (user) {
      searchInput.value = user.name
      performSearch()
      // Auto-open user details
      setTimeout(() => viewUserDetails(user.id), 500)
    }
  }
}

function searchUsers() {
  performSearch()
}

function performSearch() {
  const searchTerm = document.getElementById("userSearch").value.toLowerCase()
  const statusFilter = document.getElementById("statusFilter").value

  let filteredUsers = [...sampleUsers]

  // Apply text search
  if (searchTerm) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.id.toString().includes(searchTerm),
    )
  }

  // Apply status filter
  if (statusFilter) {
    filteredUsers = filteredUsers.filter((user) => user.status === statusFilter)
  }

  currentUsers = filteredUsers
  displayUsers(currentUsers)
}

function clearSearch() {
  document.getElementById("userSearch").value = ""
  document.getElementById("statusFilter").value = ""
  currentUsers = [...sampleUsers]
  displayUsers(currentUsers)
}

function displayUsers(users) {
  const userResults = document.getElementById("userResults")

  if (users.length === 0) {
    userResults.innerHTML = `
            <div class="col-12">
                <div class="card">
                    <div class="card-body text-center py-5">
                        <i class="fas fa-users fa-3x text-muted mb-3"></i>
                        <h5>No users found</h5>
                        <p class="text-muted">Try adjusting your search criteria</p>
                    </div>
                </div>
            </div>
        `
    return
  }

  userResults.innerHTML = users
    .map(
      (user) => `
        <div class="col-lg-6 col-xl-4 mb-4">
            <div class="card user-profile-card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="user-avatar me-3">
                            ${user.name.charAt(0).toUpperCase()}
                        </div>
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${user.name}</h6>
                            <small class="text-muted">${user.email}</small>
                        </div>
                        <span class="badge bg-${getStatusColor(user.status)}">${user.status}</span>
                    </div>
                    
                    <div class="user-info">
                        <p class="mb-2"><i class="fas fa-phone text-muted me-2"></i>${user.phone}</p>
                        <p class="mb-2"><i class="fas fa-calendar text-muted me-2"></i>Joined ${formatDate(user.registrationDate)}</p>
                        <p class="mb-3"><i class="fas fa-clock text-muted me-2"></i>Last login ${formatDate(user.lastLogin)}</p>
                    </div>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary btn-sm flex-grow-1" onclick="viewUserDetails(${user.id})">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="initiateDelete(${user.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

function viewUserDetails(userId) {
  const user = sampleUsers.find((u) => u.id === userId)
  if (!user) return

  selectedUserId = userId

  const modalContent = document.getElementById("userDetailsContent")
  modalContent.innerHTML = `
        <div class="row">
            <div class="col-md-4 text-center">
                <div class="user-avatar mx-auto mb-3" style="width: 100px; height: 100px; font-size: 2rem;">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <h5>${user.name}</h5>
                <span class="badge bg-${getStatusColor(user.status)} mb-3">${user.status}</span>
            </div>
            <div class="col-md-8">
                <h6 class="mb-3">Contact Information</h6>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>Email:</strong></div>
                    <div class="col-sm-8">${user.email}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>Phone:</strong></div>
                    <div class="col-sm-8">${user.phone}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>Address:</strong></div>
                    <div class="col-sm-8">${user.address}</div>
                </div>
                
                <h6 class="mb-3 mt-4">Account Information</h6>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>User ID:</strong></div>
                    <div class="col-sm-8">#${user.id}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>Registration:</strong></div>
                    <div class="col-sm-8">${formatDate(user.registrationDate)}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>Last Login:</strong></div>
                    <div class="col-sm-8">${formatDate(user.lastLogin)}</div>
                </div>
                
                <h6 class="mb-3 mt-4">Additional Information</h6>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>Age:</strong></div>
                    <div class="col-sm-8">${user.additionalInfo.age} years</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>Occupation:</strong></div>
                    <div class="col-sm-8">${user.additionalInfo.occupation}</div>
                </div>
                <div class="row mb-3">
                    <div class="col-sm-4"><strong>Interests:</strong></div>
                    <div class="col-sm-8">
                        ${user.additionalInfo.interests
                          .map((interest) => `<span class="badge bg-light text-dark me-1">${interest}</span>`)
                          .join("")}
                    </div>
                </div>
            </div>
        </div>
    `

  const modal = window.bootstrap.Modal(document.getElementById("userDetailsModal"))
  modal.show()
}

function initiateDelete(userId) {
  selectedUserId = userId
  const user = sampleUsers.find((u) => u.id === userId)

  if (user) {
    const modal = window.bootstrap.Modal(document.getElementById("deleteConfirmModal"))
    modal.show()
  }
}

function confirmDelete() {
  if (!selectedUserId) return

  // In a real application, this would be an API call to your Spring Boot backend
  // Example: fetch(`/api/admin/users/${selectedUserId}`, { method: 'DELETE' })

  console.log(`Deleting user with ID: ${selectedUserId}`)

  // Remove user from sample data
  const userIndex = sampleUsers.findIndex((u) => u.id === selectedUserId)
  if (userIndex > -1) {
    sampleUsers.splice(userIndex, 1)
  }

  // Close modals
  const deleteModal = window.bootstrap.Modal.getInstance(document.getElementById("deleteConfirmModal"))
  const detailsModal = window.bootstrap.Modal.getInstance(document.getElementById("userDetailsModal"))

  if (deleteModal) deleteModal.hide()
  if (detailsModal) detailsModal.hide()

  // Refresh display
  performSearch()

  // Show success message
  showAlert("User deleted successfully!", "success")

  selectedUserId = null
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function getStatusColor(status) {
  switch (status) {
    case "active":
      return "success"
    case "inactive":
      return "warning"
    case "suspended":
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

  // Auto remove after 3 seconds
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

// API Integration Functions (Replace with actual Spring Boot endpoints)
async function fetchUsers(searchTerm = "", status = "") {
  try {
    // const response = await fetch(`/api/admin/users?search=${searchTerm}&status=${status}`);
    // const data = await response.json();
    // return data;

    // Mock data for demonstration
    return sampleUsers
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

async function deleteUserAPI(userId) {
  try {
    // const response = await fetch(`/api/admin/users/${userId}`, {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // });
    // return response.ok;

    // Mock success for demonstration
    return true
  } catch (error) {
    console.error("Error deleting user:", error)
    return false
  }
}
