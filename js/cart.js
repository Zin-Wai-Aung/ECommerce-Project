import { cartBox, cartBtn, cartCounter, items, Total} from "../main.js";

export const cartCounterUpdate = function (){
    let count = cartCounter[0].innerText;
    cartCounter.forEach(current=>current.innerText = parseInt(count) + 1);
}

export const costTotal = function (){
    let all = document.querySelectorAll(".cart-cost");
    Total.innerHTML = [...all].reduce((pv,cv)=>pv+parseFloat(cv.innerHTML),0).toFixed(2);

}

window.increase = function (event,price){
    let currentCart = event.target.closest('.item-in-cart');
    let cartQuantity = currentCart.querySelector('.cart-quantity');
    let cartCost = currentCart.querySelector('.cart-cost');
    cartQuantity.valueAsNumber += 1;
    cartCost.innerText = (cartQuantity.valueAsNumber * price).toFixed(2);
    costTotal();
}

export const createItemInCart = function ({id,title,price,image}){
    const div = document.createElement("div");
    div.classList.add('item-in-cart');
    div.innerHTML = `
            <div class="p-3 border rounded mb-3">
                <div class="mb-2">
                    <img src="${image}" alt="" class="item-cart-img">
                </div>
                <p class="">${title}</p>
                <div class="row justify-content-between align-items-center">
                    <div class="col-4">
                      <p class=""> $ <span class="cart-cost">${price}</span></p>
                    </div>
                    <div class="col-6">
                        <div class="item-quantity input-group input-group-sm">
                            <button class="btn btn-primary" onclick="decrease(event,${price})"> <i class="bi bi-dash pe-none"></i> </button>
                            <input type="number" class="cart-quantity form-control text-end" value="1">
                            <button class="btn btn-primary" onclick="increase(event,${price})"> <i class="bi bi-plus pe-none"></i> </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    cartBox.append(div);
}

export const addToCart = function (e){
    let currentItemCard = e.target.closest('.item-card');
    let itemId = currentItemCard.getAttribute("item-id");
    let itemDetail = items.find(item => item.id === parseInt(itemId));
    let currentImg = currentItemCard.querySelector('.item-image');

    let newImage = new Image();
    newImage.src = currentImg.src;

    newImage.style.position = "fixed";
    newImage.style.transition = 1+"s";
    newImage.style.height = 100 +"px";
    newImage.style.zIndex = 2000;
    newImage.style.top = currentImg.getBoundingClientRect().top + "px";
    newImage.style.left = currentImg.getBoundingClientRect().left + "px";

    document.body.append(newImage);

    setTimeout(_=>{
        newImage.style.height = 0 +"px";
        newImage.style.transform = "rotate(360deg)";
        newImage.style.top = cartBtn.querySelector('.bi').getBoundingClientRect().top + "px";
        newImage.style.left = cartBtn.querySelector('.bi').getBoundingClientRect().left + "px";
    },10)

    setTimeout(_=>{
        cartBtn.classList.toggle("animate__tada");
        cartCounterUpdate();
        newImage.remove();
        createItemInCart(itemDetail);
        costTotal()
    },800)

    cartBtn.addEventListener("animationend",_=> {
        cartBtn.classList.remove('animate__tada')

    });

}