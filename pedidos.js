import { localstorageRead, productCartSimple } from "./src/utils";

function orderCreate(orderWithDate) {
  const orderElement = `
    <p class='text-xl text-bold my-4'>${new Date(
      orderWithDate.orderDate
    ).toLocaleDateString('pt-br', {
        hour: '2-digit',
        minute: '2-digit'
    })}</p>
    <section id='orderContainer${orderWithDate.orderDate}' class='bg-slate-300 p-3 rounded-md'></section>
    `;
  const main = document.getElementsByTagName("main")[0];
  main.innerHTML += orderElement;

  for (const productId in orderWithDate.order) {
    productCartSimple(
      productId,
      `orderContainer${orderWithDate.orderDate}`,
      orderWithDate.order[productId]
    );
  }
}

function orderHistoryRender() {
  const history = localstorageRead("historico");
  for (const orderDate of history) {
    orderCreate(orderDate);
  }
}

orderHistoryRender();
