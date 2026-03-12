import { cart,RemoveProduct} from "./cart.js";
import { products } from "./products.js";
import { moneyPrice } from "./utils.js";

let CartSummary = '';

cart.forEach((item) => {

  const productId = item.productId;
  let matchingItem;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  if (!matchingItem) return;
  CartSummary += `
  <div class="item-card">

    <div class="date">
      Delivery date: Tuesday, February 10
    </div>

    <div class="content">

      <img class="product-img" src="${matchingItem.image}">

      <div class="info">
        <p class="title">${matchingItem.name}</p>

        <p class="price">
          $${moneyPrice(matchingItem.priceCents)}
        </p>

        <p>
          <div>Quantity : <span class="js-quantity-update">${item.quantity}</span></div>
          <button class = "update-cart js-update-button " data-button-id = "${matchingItem.id}">Update</button>
          <button class = "delete-cart js-delete-cart"   data-button-id ="${matchingItem.id}">Delete</button>
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

document.querySelector('.items').innerHTML = CartSummary;

document.querySelectorAll('.js-update-button').forEach((btn) => {

  btn.addEventListener('click', () => {

    const card = btn.closest('.item-card');
    const qtyText = card.querySelector('.js-quantity-update');

    // KUNG PININDOT UPDATE
    if (btn.innerText === "Update") { 
      const input = document.createElement('input');
      input.type = "number";
      input.min = 1;
      input.value = qtyText.textContent;

      //  palit text to input
      qtyText.replaceWith(input);

      //  button maging SAVE
      btn.innerText = "Save";

    }
    // Nasa Save Button 
    else {
      const input = card.querySelector('input');
      //  kunin value
      const newQty = input.value;
      //  balik span
      const span = document.createElement('span');
      span.className = "js-quantity-update";
      span.innerText = newQty;
      input.replaceWith(span);
      //  balik UPDATE
      btn.innerText = "Update";
    }
  });
});


document.querySelectorAll('.js-delete-cart')
.forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productId = link.dataset.buttonId;
    RemoveProduct(productId);
    const item = document.querySelector('.item-card');
    item.remove();
  });
});

// Handle Place Your Order Button
document.querySelector('.place').addEventListener('click', () => {
  // Get orders from localStorage
  let orders = JSON.parse(localStorage.getItem('coffeeOrders')) || [];
  
  // Create order items from cart
  const orderItems = [];
  let total = 0;

  cart.forEach((item) => {
    const productId = item.productId;
    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    if (!matchingProduct) return;

    const price = matchingProduct.priceCents / 100;
    const itemTotal = price * item.quantity;
    total += itemTotal;

    orderItems.push({
      name: matchingProduct.name,
      quantity: item.quantity,
      price: price,
      image: matchingProduct.image
    });
  });

  // Create new order
  const newOrder = {
    id: 'ORD-' + String(orders.length + 1).padStart(3, '0'),
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    items: orderItems,
    total: Math.round(total * 100) / 100
  };

  // Add order to orders array
  orders.push(newOrder);

  // Save to localStorage
  localStorage.setItem('coffeeOrders', JSON.stringify(orders));

  // Clear the cart
  localStorage.removeItem('cart');

  // Clear cart display
  document.querySelector('.items').innerHTML = '';

  // Show success message
  alert('Order placed successfully! Order ID: ' + newOrder.id);

  // Redirect to returns-orders page
  window.location.href = 'returns$orders.html';
});

