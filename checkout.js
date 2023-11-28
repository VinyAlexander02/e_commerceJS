import {
  productCartSimple,
  localstorageRead,
  localStorageDelete,
  localstorageSave,
} from "./src/utils";

function checkoutDesign() {
  const cartProductIdsQuantity = localstorageRead("cart") ?? {};

  for (const productId in cartProductIdsQuantity) {
    productCartSimple(
      productId,
      "productsContainerCheckout",
      cartProductIdsQuantity[productId]
    );
  }
}

function completePurchase(e) {
  // Permite interromper a ação padrão
  e.preventDefault();
  const cartProductIdsQuantity = localstorageRead("cart") ?? {};
  if (Object.keys(cartProductIdsQuantity).length === 0) {
    return;
  }

  const currentData = new Date();
  const orderPlaced = {
    orderDate: currentData,
    order: cartProductIdsQuantity,
  };
  const orderHistory = localstorageRead("historico") ?? [];
  const updatedOrderHistory = [orderPlaced, ...orderHistory];

  localstorageSave("historico", updatedOrderHistory);
  localStorageDelete("cart");

  window.location.href = window.location.origin + "/pedidos.html";
}

checkoutDesign();
document.addEventListener("submit", (evt) => completePurchase(evt));
