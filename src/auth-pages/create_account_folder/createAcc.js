// Show password functionality
const password = document.getElementById("password");
const showPassBtn = document.getElementById("checkbox");
showPassBtn.addEventListener("change", () => {
  password.type = showPassBtn.checked ? "text" : "password";
});

// Registering user logic
document.querySelector("#register-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const role = document.querySelector("input[name='role']:checked").value;

  const users = JSON.parse(localStorage.getItem("user")) || [];

  // Check if user already exists
  if (users.some(user => user.email === email)) {
    alert("User already exists!");
    return;
  }

  const newUser = { email, password, role };
  users.push(newUser);

  // Save all users
  localStorage.setItem("user", JSON.stringify(users));

  // ✅ Save currently logged in user separately
  localStorage.setItem("loggedInUser", JSON.stringify(newUser));

  alert("Registered successfully!");

  // ✅ Redirect based on role
  if (role === "investor") {
    window.location.href = "../../dashboards/investors_dashboard/investorDashboard.html";
  } else {
    window.location.href = "../../dashboards/entrepenuer_dashboard/entrepenuer.html";
  }
});
