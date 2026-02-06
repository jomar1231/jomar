export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart =[{
        productId : 'e8be38a0-f329-46ae-bf3f-c4ee3bf13d20',
        quantity : 1
    },{
        productId : 'f7b3f72b-e813-46e6-a72c-cd89540c160f',
        quantity : 2
    }];
}

function saveStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId){
    let matchingItem;
    cart.forEach((CartItem)=>{
        if(productId === CartItem.productId){
            matchingItem = CartItem;
        }
    });

    if(matchingItem){
        matchingItem.quantity += 1;

    }else{
        cart.push({
        productId : productId,
        quantity : 1
        });
    }
    saveStorage();
}

export function RemoveProduct(buttonId){
    const newCart = [];
    cart.forEach((carts)=>{
        if(carts.productId !== buttonId){
            newCart.push(carts);
        }
    });

   cart = newCart;
   saveStorage();
}


