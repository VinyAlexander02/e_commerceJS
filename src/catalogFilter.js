const catalogProducts = document.getElementById("product-container");

function allPresents() {
  const hiddenProducts = Array.from(
    catalogProducts.getElementsByClassName("hidden")
  );

  for (const product of hiddenProducts) {
    product.classList.remove("hidden");
  }
}

function hiddenMale() {
    allPresents();
  const maleProducts = Array.from(
    catalogProducts.getElementsByClassName("male")
  );

  for (const product of maleProducts) {
    product.classList.add("hidden");
  }
}

function hiddenFemale() {
    allPresents();
  const femaleProducts = Array.from(
    catalogProducts.getElementsByClassName("Female")
  );

  for (const product of femaleProducts) {
    product.classList.add("hidden");
  }
}

export function filtersStart() {
  document.getElementById("all").addEventListener("click", allPresents);
  document.getElementById("male").addEventListener("click", hiddenFemale);
  document.getElementById("female").addEventListener("click", hiddenMale);
}
