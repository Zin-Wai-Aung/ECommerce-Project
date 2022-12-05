import './style.scss';
import {removeLoaderUI, showLoaderUI} from "./js/loader.js";
import {createItemUI} from "./js/item.js";
import {addToCart} from "./js/cart.js";
import * as bootstrap from 'bootstrap';


showLoaderUI();

export let items = [];
export const itemRow = document.querySelector(".item-row");
export const cartBtn = document.querySelector(".cart-btn");
export const cartCounter = document.querySelectorAll(".cart-counter");
export const cartBox = document.querySelector("#cartBox");
export const Total = document.querySelector("#total");


fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>{
        items = json
        items.forEach(item=>{

            itemRow.append(createItemUI(item));
        })
        removeLoaderUI()
    })

// window.addToCart = event=>{
//     console.log(event.target);
// }


    // //event delegation
    itemRow.addEventListener("click",e=>{
        if (e.target.classList.contains("add-cart")){
            addToCart(e);
        }
    })

