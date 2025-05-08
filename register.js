document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const profilePicInput = document.getElementById("profilePic");
  const message = document.getElementById("registerMessage");

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email)) {
    message.textContent = "Email already registered.";
    return;
  }

  // Function to finish registration with image (or without)
  const completeRegistration = (imageData = "") => {
    const newUser = {
      name,
      email,
      password,
      image: imageData // Base64 string or empty
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Registration successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  };

  // If user selected a profile picture, read it
  if (profilePicInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function () {
      completeRegistration(reader.result); // base64 image
    };
    reader.readAsDataURL(profilePicInput.files[0]);
  } else {
    completeRegistration(); // no image
  }
});
