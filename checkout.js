import { productCartSimple, localstorageRead } from "./src/utils";

function checkoutDesign() {
  const cartProductIdsQuantity = localstorageRead("cart");

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
    window.location.href = window.location.origin + '/pedidos.html';

}

checkoutDesign();
document.addEventListener('submit', (evt) => completePurchase(evt));