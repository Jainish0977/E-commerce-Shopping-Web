// Load existing products from localStorage or initialize default list
let products = JSON.parse(localStorage.getItem("products"));

if (!products) {
  const names = [
    "Black Sneakers", "Boot Men", "Boot Women", "Clogs Men", "Clogs Women",
    "Flip Flop Men", "Flip Flop Women", "Hiking", "Loafers Men", "Sandal Men",
    "Sandal Women", "Socks", "Sport Men", "Sport Women", "Women Sneakers"
  ];

  const images = [
    "black_sneakers.jpg", "boot_men.jpg", "boot_women.jpg", "clogs_men.jpg", "clogs_women.jpg",
    "flip_flop_men.jpg", "flip_flop_women.jpg", "hiking.jpg", "loafers_men.jpg", "sandal_men.jpg",
    "sandal_women.jpg", "socks.jpg", "sport_men.jpg", "sport_women.jpg", "women_sneakers.jpg"
  ];

  const sizes = ["7", "8", "9", "10"];
  const colors = ["black", "white", "red", "blue", "green"];
  const soles = ["rubber", "foam", "leather"];

  products = Array.from({ length: 10 }, (_, index) => {
    const name = names[index % names.length];
    const image = `images/${images[index % images.length]}`;
    const lowerName = name.toLowerCase();
    
    let category = "others";
    if (lowerName.includes("sneaker")) category = "sneakers";
    else if (lowerName.includes("boot")) category = "boots";
    else if (lowerName.includes("clog")) category = "clogs";
    else if (lowerName.includes("flip flop")) category = "flip-flops";
    else if (lowerName.includes("hiking")) category = "hiking";
    else if (lowerName.includes("loafers")) category = "loafers";
    else if (lowerName.includes("sandal")) category = "sandals";
    else if (lowerName.includes("sport")) category = "sports";

    return {
      id: index + 1,
      name,
      category,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      sole: soles[Math.floor(Math.random() * soles.length)],
      price: parseFloat((Math.random() * 100 + 20).toFixed(2)),
      discount: Math.random() < 0.3,
      image
    };
  });

  localStorage.setItem("products", JSON.stringify(products));
}

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products based on filters and search
function displayProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  const searchText = document.getElementById("searchBar").value.toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;
  const selectedSize = document.getElementById("sizeFilter").value;
  const selectedColor = document.getElementById("colorFilter").value;
  const selectedSole = document.getElementById("soleFilter").value;

  const filteredProducts = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchText) &&
      (!selectedCategory || p.category === selectedCategory) &&
      (!selectedSize || p.size === selectedSize) &&
      (!selectedColor || p.color === selectedColor) &&
      (!selectedSole || p.sole === selectedSole)
    );
  });

  filteredProducts.forEach((p) => {
    const productCard = document.createElement("div");
    productCard.className = "product";
    const discountedPrice = (p.price * 0.8).toFixed(2);

    productCard.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Size: ${p.size} | Color: ${p.color} | Sole: ${p.sole}</p>
      <p>${p.discount ? `<s>$${p.price}</s> $${discountedPrice}` : `$${p.price}`}</p>
      <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    list.appendChild(productCard);
  });
}

// Listen for filter changes
document.querySelectorAll("select, #searchBar").forEach((input) => {
  input.addEventListener("input", displayProducts);
});

// Initial product render
displayProducts();

// Add product to cart and apply socks offer
function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  cart.push(product);

  showCartPopup();

  // Socks Offer: 2 free socks for every 4 non-sock items
  const shoesOnly = cart.filter((item) => !item.name.includes("Free Socks"));
  const currentSocks = cart.filter((item) => item.name.includes("Free Socks"));
  const eligibleSocks = Math.floor(shoesOnly.length / 4) * 2;
  const socksNeeded = eligibleSocks - currentSocks.length;

  for (let i = 0; i < socksNeeded; i++) {
    cart.push({
      id: `sock-${Date.now()}-${i}`,
      name: "Free Socks",
      price: 0,
      discount: false,
      image: "images/socks.jpg",
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
}

// Update cart icon with current count (excluding socks)
function updateCartIcon() {
  const itemCount = cart.filter((item) => !item.name.includes("Free Socks")).length;
  document.getElementById("cart-count").textContent = itemCount;
}

// Redirect to cart page on cart icon click
document.querySelector(".cart").addEventListener("click", () => {
  window.location.href = "cart.html";
});

// Initialize cart count
updateCartIcon();

function showCartPopup() {
  const popup = document.getElementById("cart-popup");
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000); // Hide after 2 seconds
}

// User Profile Dropdown Toggle
const userAvatar = document.getElementById("user-avatar");
const userDropdown = document.getElementById("user-dropdown");

userAvatar.addEventListener("click", () => {
  userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
});

// Close dropdown if clicked outside
window.addEventListener("click", (e) => {
  if (!userAvatar.contains(e.target) && !userDropdown.contains(e.target)) {
    userDropdown.style.display = "none";
  }
});

// Load and display logged-in user info
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  document.getElementById("user-info-name").textContent = loggedInUser.name || "User";
  document.getElementById("user-info-email").textContent = loggedInUser.email;
  if (loggedInUser.image) {
    document.getElementById("user-avatar").src = loggedInUser.image;
    document.getElementById("user-info-pic").src = loggedInUser.image;
  }
}

// Show personalized greeting
const greetingText = document.getElementById("greeting-text");
greetingText.textContent = loggedInUser?.name
  ? `Welcome, ${loggedInUser.name}!`
  : "Welcome!";

// Handle contact form submission
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("contact-success").textContent = "Your message has been sent successfully!";
  this.reset();
});

// Handle feedback form submission
document.getElementById("feedbackForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("feedback-success").textContent = "Thanks for your feedback!";
  this.reset();
});

// Back to Top button setup
const backToTop = document.createElement("button");
backToTop.id = "backToTop";
backToTop.textContent = "⬆ Back to Top";
document.body.appendChild(backToTop);

// Scroll to top on click
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Show/hide button on scroll
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
