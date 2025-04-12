let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPriceElement = document.getElementById("totalPrice");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50" height="50">
      <strong>${item.name}</strong> - $${item.price.toFixed(2)}
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItems.appendChild(li);

    total += item.price;
  });

  totalPriceElement.textContent = total.toFixed(2);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

document.getElementById("emptyCart").addEventListener("click", () => {
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
});

displayCart();
