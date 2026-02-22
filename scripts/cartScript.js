import { cart, addToCart } from './cart.js';
import { moneyPrice } from './utils.js';
/*
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
added();
async function added() {
  

  const response = await fetch('./database/db.json', {
    method : 'POST',
    headers : {
      'content-Type' : 'application/json'
    },
    body : JSON.stringify(addedProduct)
  });
  const data = await response.json();
  console.log(data);
}

*/


async function loadProducts() {
  try {
      const response = await fetch('./database/db.json');
      const data = await response.json();
      const products = data.products.id;
      console.log(products);
      renderProducts(products);
    } catch (error) {
        console.log("Error:", error);
    }
  }
  loadProducts();
  function renderProducts(products){
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
          $${moneyPrice(product.priceCents)}
        </div>

        <select class="quantity-selector">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

        <div class = "button-Add">
        <div class = "cartAdd"> </div>
          <button class="cart-button js-cart-button js-show-button" data-product-id="${product.id}">
              <div class = "add" data-product-id = ${product.id} >Add To Cart</div>
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector('.main').innerHTML = productHtml;

} 


/*

const added = this.querySelector('.add');
document.querySelectorAll('.cart-button').forEach((button)=>{
  button.querySelector('.cartAdd').innerHTML = `Add To Cart`;
  button.addEventListener('click', function (){
    this.disabled = true;
    added.innerHTML = `<i class="fa-solid fa-circle-check"> Added</i>`;
    setTimeout(() => {
      added.classList.add('hello');
      setTimeout(()=>{
        added.innerHTML = '';
        this.disabled = false;
      },300);
    }, 700);
  });
});
*/
newAddCart();

function newAddCart() {
  document.querySelectorAll('.js-cart-button').forEach((bttn) => {
    bttn.addEventListener('click', () => {
      bttn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Added`;
      setTimeout(() => {
        bttn.classList.add('hello');
        setTimeout(() => {
          bttn.innerHTML = 'Add to Cart';
          bttn.classList.remove('hello');
        }, 800);
      }, 500);
    });
  });
}


/*
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
*/
      
    

export function CartItem() {
  let cartQuantity = 1;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
    // cartQuantity = cartQuantity + item.quantity
  });
  
  cartquantity.textContent = cartQuantity;
}

document.querySelectorAll('.js-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    button.classList.add('name');
    addToCart(productId);
    CartItem();
  });
});

function search(){
  const searchProduct = document.querySelector('.js-search-bar');
  const buttonSearch = document.querySelector('js-button-icon')
  buttonSearch.addEventListener('enter', ()=>{
    const search = searchProduct.value;
    products.find();
  });

  products.filter(product);
}
