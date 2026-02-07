import { cart, addToCart } from './cart.js';
import { products } from './products.js';

let productHtml = '';

products.forEach((product) => {
  productHtml += `
    <div class="product-container">
      <img class="image-product" src="${product.image}" alt="${product.name}">

      <div class="product-name">${product.name}</div>

      <div class="rating">
        <img class="product-rating" src="${product.rating.stars}">
        <span>${product.rating.count}</span>
      </div>

      <div class="js-product-cost">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <select class="quantity-selector">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>

      <div class = "add" ></div>
      <button class="cart-button js-cart-button js-show-button"
        data-product-id="${product.id}">
        Add to cart
      </button>
    </div>
  `;
});




const cartquantity = document.querySelector('.cart-quantity');
document.querySelector('.main').innerHTML = productHtml;
cartAddShow();
function cartAddShow(){
  document.querySelectorAll('.js-show-button').forEach((addItem)=>{
  addItem.addEventListener('click', ()=>{
    const AddShow = addItem.dataset.productId;
    cartItemShow(AddShow);
  });
});
}

function cartItemShow(AddShow){
  products.forEach((productShow)=>{
    if(AddShow === productShow.id){
      const added = document.querySelector('.add');
      added.innerHTML = `<i class="fa-solid fa-circle-check"> Added</i>`;
      added.classList.add('show');
      setTimeout(()=>{
        added.classList.add('hello');
        setTimeout(() => {
          added.classList.remove('show' , 'hello');
          added.innerHTML = '';
        }, 300);
      }, 700);
    }
  });
  
    
}

function CartItem() {
  let cartQuantity = 1;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  cartquantity.textContent = cartQuantity;
}

document.querySelectorAll('.js-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    CartItem();
  });
});

