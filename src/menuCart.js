import { catalog } from "./utils";

const cartProductIdsQuantity = {};

function openCart() {
  document.getElementById("cart").classList.add("right-[0px]");
  document.getElementById("cart").classList.remove("right-[360px]");
}

function closeCart() {
  document.getElementById("cart").classList.remove("right-[0px]");
  document.getElementById("cart").classList.add("right-[-360px]");
}

export function cartStart() {
  const closeCartButton = document.getElementById("closeCart");
  const openCartButton = document.getElementById("openCart");

  closeCartButton.addEventListener("click", closeCart);
  openCartButton.addEventListener("click", openCart);
}

function quantityProductIncremnet(productId) {
  cartProductIdsQuantity[productId]++;
  quantityUpdate(productId);
}

function quantityProductDecrement(productId) {
  cartProductIdsQuantity[productId]--;
  quantityUpdate(productId);
}

function quantityUpdate(productId) {
  document.getElementById(`quantity-${productId}`).innerText =
    cartProductIdsQuantity[productId];
}

export function addCart(productId) {
  if (productId in cartProductIdsQuantity) {
    quantityProductIncremnet(productId);
    return;
  }

  cartProductIdsQuantity[productId] = 1;
  const product = catalog.find((p) => p.id === productId);

  const containerCartProducts = document.getElementById("cartProducts");
  const cardProductCart = `
    <article class="flex bg-slate-100 rounded-lg p-1 relative mb-1">
        <button id="closeCart" class="absolute top-0 right-2"> <i
            class="fa-solid fa-circle-xmark text-red-500 hover:text-red-900 duration-300 pb-3"></i> </button>
        <img src="./assets/${product.nameImageFile}" alt="Carrinho: ${
    product.name
  }" class="h-24 rounded-lg" />
        <div class="p-2 flex flex-col justify-between">
          <p class="text-slate-900 text-sm"> ${product.name} </p>
          <p class="text-slate-400 text-xs"> Tamanho: M </p>
          <p class="text-green-700 text-lg"> Valor: R$ ${product.price}</p>
        </div>
        <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
            <button id="productDecrement-${product.id}" class=""> - </button>
            <p id="quantity-${product.id}" class="ml-2"> ${
    cartProductIdsQuantity[product.id]
  } </p>
            <button id="productIncrement-${
              product.id
            }" class="ml-2"> + </button>
        </div>
      </article>
    `;

  containerCartProducts.innerHTML += cardProductCart;

  document
    .getElementById(`productDecrement-${product.id}`)
    .addEventListener("click", () => quantityProductDecrement(product.id));

    document
    .getElementById(`productIncrement-${product.id}`)
    .addEventListener("click", () => quantityProductIncremnet(product.id));
}

