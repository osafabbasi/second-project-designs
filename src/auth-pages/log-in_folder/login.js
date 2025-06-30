// login.js
function userData() {
  const users = JSON.parse(localStorage.getItem("user")) || [];
  return users;
}
//  Run only after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  const passwordInput = document.getElementById("password");
  const showPassBtn = document.getElementById("checkbox");

  //  Stop if login page is not loaded
  if (!loginForm || !passwordInput || !showPassBtn) return;

  // Show/Hide password
  showPassBtn.addEventListener("change", () => {
    passwordInput.type = showPassBtn.checked ? "text" : "password";
  });

  // log-in logic
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const users = userData();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");

      if (user.role === "investor") {
        window.location.href = "../../dashboards/investors_dashboard/investorDashboard.html";
      } else {
        window.location.href = "../../dashboards/entrepenuer_dashboard/entrepenuer.html";
      }
    } else {
      alert("Invalid credentials!");
    }
  });
});
