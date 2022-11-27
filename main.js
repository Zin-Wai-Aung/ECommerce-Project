import './style.scss';
import {removeLoaderUI, showLoaderUI} from "./js/loader.js";


showLoaderUI();

let items = [];
let itemRow = document.querySelector(".item-row");
let cartBtn = document.querySelector(".cart-btn");
let cartCount = document.querySelector(".cart-count");


fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>{
        items = json
        items.forEach(item=>{
            let itemDiv = document.createElement("div");
            itemDiv.classList.add("col-md-6","col-lg-4");
            itemDiv.innerHTML = `
                    <div class="card item-card">
                        <div class="card-body d-flex flex-column">
                            <div class="mb-3">
                                <img src="${item.image}" alt="" class="item-image">
                            </div>
                            <p class="card-title fw-bold text-truncate">${item.title}</p>
                            <p class="card-text small">${item.description.substring(0,120)}</p>
                          
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                               <p class="fw-bold mb-0">$ <span>100</span></p>
                                <button class="btn btn-outline-primary add-cart">
                                    <i class="bi bi-cart-plus pe-none"></i> Add Cart
                                </button>
                            </div>
                        </div>
                    </div>
            `;
            itemRow.append(itemDiv);
        })
        removeLoaderUI()
    })

// window.addToCart = event=>{
//     console.log(event.target);
// }


    // //event delegation
    itemRow.addEventListener("click",e=>{
        if (e.target.classList.contains("add-cart")){
            let currentItemCard = e.target.closest('.item-card');
            let currentImg = currentItemCard.querySelector('.item-image');
            console.log(currentImg);

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
                cartBtn.addEventListener("animationend",_=>cartBtn.classList.remove('animate__tada'));
                console.log(cartCount.innerText);
            },800)
        }
    })

