import { cart } from "./cart.js";
import { products } from "./cartScript.js";


cart.forEach((item) => {
    let matchingProductHTML;
    const productId = item.productId;
    products.forEach((product)=>{
        if(product.id === productId ){
            matchingProductHTML = product;
        }
    });

    matchingProductHTML += 
    
   `
  <div class="item-card">

    <div class="date">
      Delivery date: Tuesday, February 10
    </div>

    <div class="content">

      <img class="product-img" src="">

      <div class="info">
        <p class="title">$</p>

        <p class="price">
          
        </p>

        <p>
          Quantity: 1
          <span class="link">Update</span>
          <span class="link">Delete</span>
        </p>
      </div>

      <div class="delivery">
        <p>Choose a delivery option:</p>

        <label>
          <input type="radio" name="" checked>
          Tuesday, February 10 - FREE Shipping
        </label>

        <label>
          <input type="radio" name="">
          Wednesday, February 4 - $4.99
        </label>

        <label>
          <input type="radio" name="">
          Monday, February 2 - $9.99
        </label>

      </div>

    </div>
  </div>
  `;
  
});