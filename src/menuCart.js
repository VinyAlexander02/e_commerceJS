import { catalog, localstorageRead, localstorageSave } from "./utils";

const cartProductIdsQuantity = localstorageRead("cart") ?? {};

function openCart() {
  document.getElementById("cart").classList.add("right-[0px]");
  document.getElementById("cart").classList.remove("right-[360px]");
}

function closeCart() {
  document.getElementById("cart").classList.remove("right-[0px]");
  document.getElementById("cart").classList.add("right-[-360px]");
}

function checkout(){
  if(Object.keys(cartProductIdsQuantity).length === 0){
    return;
  }
  window.location.href = window.location.origin + '/checkout.html';
}

export function cartStart() {
  const closeCartButton = document.getElementById("closeCart");
  const openCartButton = document.getElementById("openCart");
  const checkoutButton = document.getElementById('completePurchase')

  closeCartButton.addEventListener("click", closeCart);
  openCartButton.addEventListener("click", openCart);
  checkoutButton.addEventListener('click', checkout);
}


function removeCartElement(productId) {
  delete cartProductIdsQuantity[productId];
  localstorageSave("cart", cartProductIdsQuantity);
  updateCartPrice();
  productCartRender();
}

function quantityProductIncremnet(productId) {
  cartProductIdsQuantity[productId]++;
  localstorageSave("cart", cartProductIdsQuantity);
  updateCartPrice();
  quantityUpdate(productId);
}

function quantityProductDecrement(productId) {
  if (cartProductIdsQuantity[productId] === 1) {
    removeCartElement(productId);
    return;
  }
  cartProductIdsQuantity[productId]--;
  localstorageSave("cart", cartProductIdsQuantity);
  updateCartPrice();
  quantityUpdate(productId);
}

function quantityUpdate(productId) {
  document.getElementById(`quantity-${productId}`).innerText =
    cartProductIdsQuantity[productId];
}

function productCartDesign(productId) {
  const product = catalog.find((p) => p.id === productId);

  const containerCartProducts = document.getElementById("cartProducts");

  const articleElement = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-slate-100",
    "rounded-lg",
    "p-1,",
    "relative",
  ];

  for (const articleClass of articleClasses) {
    articleElement.classList.add(articleClass);
  }

  const cardProductCart = `
    <button id="remove-item-${product.id}" class="absolute top-0 right-2"> 
      <i class="fa-solid fa-circle-xmark text-red-500 hover:text-red-900 duration-300 pb-3"></i> 
    </button>
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
        <button id="productIncrement-${product.id}" class="ml-2"> + </button>
    </div>
  `;

  articleElement.innerHTML = cardProductCart;
  containerCartProducts.appendChild(articleElement);

  document
    .getElementById(`productDecrement-${product.id}`)
    .addEventListener("click", () => quantityProductDecrement(product.id));

  document
    .getElementById(`productIncrement-${product.id}`)
    .addEventListener("click", () => quantityProductIncremnet(product.id));

  document
    .getElementById(`remove-item-${product.id}`)
    .addEventListener("click", () => removeCartElement(product.id));
}

export function productCartRender() {
  const containerCartProducts = document.getElementById("cartProducts");
  containerCartProducts.innerHTML = "";

  for (const productId in cartProductIdsQuantity) {
    productCartDesign(productId);
  }
}

export function addCart(productId) {
  if (productId in cartProductIdsQuantity) {
    quantityProductIncremnet(productId);
    return;
  }

  cartProductIdsQuantity[productId] = 1;
  localstorageSave("cart", cartProductIdsQuantity);
  productCartDesign(productId);
}

export function updateCartPrice() {
  const cartPrice = document.getElementById("total-price");
  let totalCartPrice = 0;
  for (const productIdCart in cartProductIdsQuantity) {
    totalCartPrice +=
      catalog.find((p) => p.id === productIdCart).price *
      cartProductIdsQuantity[productIdCart];
  }
  cartPrice.innerHTML = `Total: R$${totalCartPrice}`;
}
