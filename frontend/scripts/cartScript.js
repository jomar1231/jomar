import { cart, addToCart } from './cart.js';
import { moneyPrice } from './utils.js';
import { products } from './products.js';

// Function to render products
function renderProducts(productsToRender) {
  let productHtml = '';
  
  if (productsToRender.length === 0) {
    productHtml = `
      <div class="no-results">
        <p>No products found. Please try a different search.</p>
      </div>
    `;
  } else {
    productsToRender.forEach((product) => {
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
  }
  
  document.querySelector('.main').innerHTML = productHtml;
  newAddCart();
  setupCartButtons();
}

// Initial render - show all products
renderProducts(products);

// Search function
export function searchProducts(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  
  if (term === '') {
    return products;
  }
  
  return products.filter(product => 
    product.name.toLowerCase().includes(term)
  );
}

// Handle search input
const searchBar = document.querySelector('.js-search-bar');
const searchButton = document.querySelector('.js-button-icon');

if (searchBar) {
  // Real-time search as user types
  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    const filteredProducts = searchProducts(searchTerm);
    renderProducts(filteredProducts);
  });

  // Search on Enter key press
  searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const searchTerm = searchBar.value;
      const filteredProducts = searchProducts(searchTerm);
      renderProducts(filteredProducts);
    }
  });
}

// Search on button click
if (searchButton) {
  searchButton.addEventListener('click', () => {
    const searchTerm = searchBar.value;
    const filteredProducts = searchProducts(searchTerm);
    renderProducts(filteredProducts);
  });
}

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

function setupCartButtons() {
  document.querySelectorAll('.js-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      button.classList.add('name');
      addToCart(productId);
      CartItem();
    });
  });
}

export function CartItem() {
  let cartQuantity = 1;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.textContent = cartQuantity;
  }
}
