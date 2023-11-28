export const catalog = [
  {
    id: "1",
    name: `TOP TÉCNICO COM CAPUZ`,
    brand: `Zara`,
    price: 229,
    nameImageFile: `product-1.jpg`,
    female: true,
  },
  {
    id: "2",
    name: `JEANS TRF CARGO DE CINTURA MÉDIA`,
    brand: `Zara`,
    price: 379,
    nameImageFile: `product-2.jpg`,
    female: true,
  },
  {
    id: "3",
    name: `BOLSA TOTE BAG DENIM TRF`,
    brand: `Zara`,
    price: 259,
    nameImageFile: `product-3.jpg`,
    female: true,
  },
  {
    id: "4",
    name: `CAMISETA DENIM LIMITED EDITION`,
    brand: `Zara`,
    price: 379,
    nameImageFile: `product-4.jpg`,
    female: false,
  },
  {
    id: "5",
    name: `BONÉ LAVADO LIMITED EDITION`,
    brand: `Zara`,
    price: 199,
    nameImageFile: `product-5.jpg`,
    female: false,
  },
  {
    id: "6",
    name: `TÊNIS COM PEÇAS LIMITED EDITION`,
    brand: `Zara`,
    price: 379,
    nameImageFile: `product-6.jpg`,
    female: false,
  },
  {
    id: "7",
    name: `CAMISA COM ESTAMPA DEGRADÊ`,
    brand: `Zara`,
    price: 339,
    nameImageFile: `product-7.jpg`,
    female: false,
  },
  {
    id: "8",
    name: `CORRENTE COM ELOS LIMITED EDITION`,
    brand: `Zara`,
    price: 179,
    nameImageFile: `product-8.jpg`,
    female: true,
  },
];

export function localstorageSave(key, info) {
  localStorage.setItem(key, JSON.stringify(info));
}

export function localstorageRead(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function localStorageDelete(key) {
  localStorage.removeItem(key);
}

export function productCartSimple(productId, containerId, produtQuantity) {
  const product = catalog.find((p) => p.id === productId);

  const containerCartProducts = document.getElementById(containerId);

  const articleElement = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-stone-200",
    "rounded-lg",
    "p-1,",
    "relative",
    "mb-2",
    "w-96",
  ];

  for (const articleClass of articleClasses) {
    articleElement.classList.add(articleClass);
  }

  const cardProductCart = `
      <img src="./assets/${product.nameImageFile}" alt="Carrinho: ${product.name}" class="h-24 rounded-lg" />
      <div class="p-2 flex flex-col justify-between">
        <p class="text-slate-900 text-sm"> ${product.name} </p>
        <p class="text-slate-400 text-xs"> Tamanho: M </p>
        <p class="text-green-700 text-lg"> Valor: R$ ${product.price}</p>
      </div>
      <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
          <p id="quantity-${product.id}" class="ml-2"> ${produtQuantity} </p>
      </div>
    `;

  articleElement.innerHTML = cardProductCart;
  containerCartProducts.appendChild(articleElement);
}
