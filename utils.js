export function moneyPrice(priceCents){
    return (priceCents / 100).toFixed(2);
}
let Summary = '';
function calculatePrice(){
    Summary += `
    <div class="items">
        </div>
        <div class="summary">
            <h3>Order Summary</h3>

            <div class="row">
            <span>Items ():</span>
            <span>$117.35</span>
            </div>

            <div class="row">
            <span>Shipping:</span>
            <span>$0.00</span>
            </div>

            <div class="row">
            <span>Total before tax:</span>
            <span>$117.35</span>
            </div>

            <div class="row">
            <span>Estimated tax (10%):</span>
            <span>$11.74</span>
            </div>
            <h2 class="total">Order total: $129.09</h2>
            <button class="place">Place your order</button>
        </div>
    `;

    document.querySelector('.checkout-body').innerHTML = Summary;
}

calculatePrice();

