import { cart } from "./cart.js";
import { products } from "./products.js";

let html = "";

cart.forEach((item) => {

  const productId = item.productId;
  let matchingItem;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  if (!matchingItem) {
    return;
  }

  html += `
  <div class="item-card">

    <div class="date">
      Delivery date: Tuesday, February 10
    </div>

    <div class="content">

      <img class="product-img" src="${matchingItem.image}">

      <div class="info">
        <p class="title">${matchingItem.name}</p>

        <p class="price">
          $${(matchingItem.priceCents / 100).toFixed(2)}
        </p>

        <p>
          Quantity: ${item.quantity}
          <span class="link">Update</span>
          <span class="link">Delete</span>
        </p>
      </div>

      <div class="delivery">
        <p>Choose a delivery option:</p>

        <label>
          <input type="radio" name="d-${productId}" checked>
          Tuesday, February 10 - FREE Shipping
        </label>

        <label>
          <input type="radio" name="d-${productId}">
          Wednesday, February 4 - $4.99
        </label>

        <label>
          <input type="radio" name="d-${productId}">
          Monday, February 2 - $9.99
        </label>

      </div>

    </div>
  </div>
  `;
});

document.querySelector('.items').innerHTML = html;
