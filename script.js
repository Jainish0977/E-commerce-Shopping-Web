const shoeNames = [
  "Black Sneakers",
  "Boot Men",
  "Boot Women",
  "Clogs Men",
  "Clogs Women",
  "Flip Flop Men",
  "Flip Flop Women",
  "Hiking",
  "Loafers Men",
  "Sandal Men",
  "Sandal Women",
  "Socks",
  "Sport Men",
  "Sport Women",
  "Women Sneakers",
];
const shoeImages = [
  "black_sneakers.jpg",
  "boot_men.jpg",
  "boot_women.jpg",
  "clogs_men.jpg",
  "clogs_women.jpg",
  "flip_flop_men.jpg",
  "flip_flop_women.jpg",
  "hiking.jpg",
  "loafers_men.jpg",
  "sandal_men.jpg",
  "sandal_women.jpg",
  "socks.jpg",
  "sport_men.jpg",
  "sport_women.jpg",
  "women_sneakers.jpg",
];

const products = Array.from({ length: 10 }, (_, i) => {
  const sizes = ["7", "8", "9", "10"];
  const colors = ["black", "white", "red", "blue", "green"];
  const soles = ["rubber", "foam", "leather"];

  const id = i + 1;
  const name = shoeNames[i % shoeNames.length];
  const image = `images/${shoeImages[i % shoeImages.length]}`;

  // Dynamically determine category from the name
  const lowerName = name.toLowerCase();
  let category = "";
  if (lowerName.includes("sneaker")) category = "sneakers";
  else if (lowerName.includes("boot")) category = "boots";
  else if (lowerName.includes("clog")) category = "clogs";
  else if (lowerName.includes("flip flop")) category = "flip-flops";
  else if (lowerName.includes("hiking")) category = "hiking";
  else if (lowerName.includes("loafers")) category = "loafers";
  else if (lowerName.includes("sandal")) category = "sandals";
  else if (lowerName.includes("sport")) category = "sports";
  else category = "others";

  const size = sizes[Math.floor(Math.random() * sizes.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const sole = soles[Math.floor(Math.random() * soles.length)];
  const price = (Math.random() * 100 + 20).toFixed(2);
  const discount = Math.random() < 0.3;

  return {
    id,
    name,
    category,
    size,
    color,
    sole,
    price: parseFloat(price),
    discount,
    image,
  };
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "";
  const search = document.getElementById("searchBar").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const size = document.getElementById("sizeFilter").value;
  const color = document.getElementById("colorFilter").value;
  const sole = document.getElementById("soleFilter").value;

  const filtered = products.filter((p) => {
    return (
      p.name.toLowerCase().includes(search) &&
      (!category || p.category === category) &&
      (!size || p.size === size) &&
      (!color || p.color === color) &&
      (!sole || p.sole === sole)
    );
  });

  for (let p of filtered) {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Size: ${p.size} | Color: ${p.color} | Sole: ${p.sole}</p>
        <p>${
          p.discount
            ? "<s>$" + p.price + "</s> $" + (p.price * 0.8).toFixed(2)
            : "$" + p.price
        }</p>
        <button class="add-to-cart" onclick="addToCart(${
          p.id
        })">Add to Cart</button>
      `;
    list.appendChild(div);
  }
}

document.querySelectorAll("select, #searchBar").forEach((el) => {
  el.addEventListener("input", displayProducts);
});

displayProducts();

function addToCart(id) {
  const item = products.find((p) => p.id === id);
  cart.push(item);

  // Check for free socks
  const shoeCount = cart.filter((i) => !i.name.includes("Free Socks")).length;
  const sockCount = cart.filter((i) => i.name.includes("Free Socks")).length;
  const socksToAdd = Math.floor(shoeCount / 4) * 2 - sockCount;
  for (let i = 0; i < socksToAdd; i++) {
    cart.push({
      id: `socks-${Date.now()}-${i}`,
      name: "Free Socks",
      price: 0,
      discount: false,
      image: "images/socks.jpg",
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();
}

function updateCartIcon() {
  const count = cart.filter((i) => !i.name.includes("Free Socks")).length;
  document.getElementById("cart-count").textContent = count;
}

updateCartIcon();

document.querySelector(".cart").addEventListener("click", () => {
  window.location.href = "cart.html";
});

// Back to Top Button
const backToTop = document.createElement("button");
backToTop.textContent = "⬆ Back to Top";
backToTop.style.position = "fixed";
backToTop.style.bottom = "20px";
backToTop.style.right = "20px";
backToTop.style.padding = "10px";
backToTop.style.backgroundColor = "#007bff";
backToTop.style.color = "white";
backToTop.style.border = "none";
backToTop.style.borderRadius = "5px";
backToTop.style.cursor = "pointer";
backToTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
document.body.appendChild(backToTop);
