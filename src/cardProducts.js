import { catalog } from "./utils";
import { addCart } from "./menuCart";

export function catalogRender() {
    for (const i of catalog) {
        const productCard = `<div class='border-solid shadow-xl shadowm-slate-400 w-48 m-2 rounded-lg flex flex-col p-2 justify-between group ${catalog.female ? 'female' : 'male'}' id="product-card-${catalog.id}">
          <img
            src="./assets/${i.nameImageFile}"
            alt="Product 1"
            class="group-hover:scale-110 duration-300 my-3 rounded-lg"
          />
          <p class='text-sm'> ${i.brand} </p>
          <p class='text-sm'> ${i.name} </p>
          <p class='text-sm'> R$ ${i.price},00 </p>
          <button id='adicionar-${i.id}' class="bg-slate-950 hover:bg-slate-500 text-slate-200"> <i class="fa-solid fa-cart-plus"></i> </button>
          </div>`;

        document.getElementById("product-container").innerHTML += productCard;
    }

    for(const j of catalog){
        document.getElementById(`adicionar-${j.id}`).addEventListener("click", () => addCart(j.id));
    }
}
