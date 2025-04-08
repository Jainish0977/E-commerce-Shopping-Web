const cart = JSON.parse(localStorage.getItem("cart")) || [];
const ul = document.getElementById("cartItems");
const totalSpan = document.getElementById("totalPrice");

function updateCartDisplay() {
  ul.innerHTML = "";
  let total = 0;
  for (let item of cart) {
    const li = document.createElement("li");
    const price = item.discount ? item.price * 0.8 : item.price;
    total += price;
    li.textContent = `${item.name} - $${price.toFixed(2)}`;
    ul.appendChild(li);
  }
  totalSpan.textContent = total.toFixed(2);
}

document.getElementById("emptyCart").addEventListener("click", () => {
  localStorage.removeItem("cart");
  location.reload();
});

updateCartDisplay();
