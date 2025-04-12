document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    document.getElementById("loginMessage").textContent = "Login successful!";
    window.location.href = "index.html"; // redirect to homepage
  } else {
    document.getElementById("loginMessage").textContent = "Invalid email or password.";
  }
});

// Show/Hide Password Toggle
document.getElementById("showPassword").addEventListener("change", function () {
  const passwordField = document.getElementById("password");
  passwordField.type = this.checked ? "text" : "password";
});
