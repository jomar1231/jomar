import { cart,RemoveProduct} from "./cart.js";
import { products } from "./products.js";

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
          $${(matchingItem.priceCents / 100).toFixed(2)}
        </p>

        <p>
          <div>Quantity : <span class = "js-quntity-update js-quantity" ></span> </div>
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
document.querySelectorAll('.js-update-button').forEach((item)=>{
  // click update lalabas yung save and input  ===>
  item.addEventListener('click', ()=>{
    const input = document.querySelector('.js-quantity');
    input.innerHTML= `<input type = "text" min= "1">`;
    item.innerHTML = `<button>Save</button>`;
    item.addEventListener('click', ()=>{
      input.remove();
      item.style.display("none");
      input.classList.add('saved');
      item.classList.add('save');
      document.querySelector('.save').innerHTML = `<input type = "text" min= "1">`;
      const value = input.value;
      document.querySelector('.js-quatity-update').innerHTML = value;
    });
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

