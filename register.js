document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const message = document.getElementById("registerMessage");

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    message.textContent = "Email already registered.";
    return;
  }

  const newUser = {
    name,
    email,
    password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  message.textContent = "Registration successful! Redirecting...";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
