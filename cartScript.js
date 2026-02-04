import { cart, addToCart } from './cart.js';

export const products = [
  {
    id: 'e8be38a0-f329-46ae-bf3f-c4ee3bf13d20',
    image: 'img/IMG_3367-iced-tea.jpg',
    name: 'Ice Tea',
    rating: {
      stars: 'img/pngtree-flat-design-vector-illustration-of-an-icon-with-evaluation-rating-and-stars-vector-png-image_41549416.jpg',
      count: 78
    },
    priceCents: 1910
  },
  {
    id: 'f7b3f72b-e813-46e6-a72c-cd89540c160f',
    image: 'img/coppucino.jpg',
    name: 'Cappuccino',
    rating: {
      stars: 'img/pngtree-flat-design-vector-illustration-of-an-icon-with-evaluation-rating-and-stars-vector-png-image_41549416.jpg',
      count: 78
    },
    priceCents: 1910
  },
  {
    id: 'c5a2639a-5256-4708-87e4-25cf6d728773',
    image: 'img/milktea.jpg',
    name: 'Milktea',
    rating: {
      stars: 'img/pngtree-flat-design-vector-illustration-of-an-icon-with-evaluation-rating-and-stars-vector-png-image_41549416.jpg',
      count: 87
    },
    priceCents: 1090
  }
];

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
        <option class="num1">1</option>
        <option class="num2">2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>

      <button class="cart-button js-cart-button"
        data-product-id="${product.id}">
        Add to cart
      </button>
    </div>
  `;

  return product;
});


document.querySelector('.main').innerHTML = productHtml;

const cartquantity = document.querySelector('.cart-quantity');
const Quantity = document.querySelector('.num1');
const Quantity1 = document.querySelector('.num2');
function CartItem() {
  let cartQuantity = 1;
  
  cart.forEach((item) => {
    if(Quantity === "1"){
    cartQuantity += Quantity;
    }else if(Quantity === "2"){
      cartQuantity + Quantity;
    }
  });

  cartquantity.textContent = cartQuantity;

  console.log(cartQuantity);
}

document.querySelectorAll('.js-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    CartItem();
    console.log(addToCart(productId));
  });
});

