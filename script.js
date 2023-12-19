(async () => {
  const cardContainer = document.querySelector("#cards");
  let insertData = [];

  const data = await fetch("https://dummyjson.com/products?limit=40");
  if (data.ok) {
    let jsonData = await data.json();
    insertData = jsonData.products;
    renderProducts(insertData);
  }

  function renderProducts(products) {
    cardContainer.innerHTML = ""; // This is clearing the exist content
    products.forEach((product, index) => {
      const div = document.createElement("div");
      const image = document.createElement("img");
      const name = document.createElement("h3");
      const price = document.createElement("span");
      const stock = document.createElement("span");
      const category = document.createElement("span");

      div.id = index;
      div.classList = "card-box border-2 border-gray-600 p-3 rounded-md";
      image.classList = "card-image h-48 w-full object-contain";
      name.classList = "text-xl font-light mt-2";
      price.classList = "border-b-2 border-green-400 p-1 rounded-md";
      stock.classList = "ml-4 border-b-2 border-red-400 p-1 rounded-md";
      category.classList = "ml-4 border-b-2 border-blue-400 p-1 rounded-md";

      image.src = product.thumbnail;
      name.innerText = `Title: ${product.title}`;
      category.innerText = `${product.category}`;
      price.innerText = `${product.price}`;
      stock.innerText = `${product.stock}`;

      div.appendChild(image);
      div.appendChild(name);
      div.appendChild(price);
      div.appendChild(stock);
      div.appendChild(category);
      cardContainer.appendChild(div);
    });
  }

  // Getting elements by querySelector
  const searchBar = document.querySelector("#search");
  const priceFilter = document.querySelector("#priceFilter");
  const sortSelect = document.querySelector("#sortSelect");
  const cards = document.querySelectorAll(".card-box");

  // Function which has functionality of Search, Filter and Sort
  function applySFS() {
    // cards.forEach((card) => {
    //   card.classList.remove("hidden");
    // });

    let filteredData = insertData.slice(); // A cloned array from original using slice()

    const searchValue = searchBar.value.trim().toLowerCase();
    if (searchValue !== "") {
      filteredData = filteredData.filter((card) =>
        card.title.toLowerCase().includes(searchValue)
      );
    }

    const priceRange = priceFilter.value;
    if (priceRange === "oneToFive") {
      filteredData = filteredData.filter((card) => card.price <= 500);
    } else if (priceRange === "fiveToThous") {
      filteredData = filteredData.filter(
        (card) => card.price >= 501 && card.price <= 1000
      );
    } else if (priceRange === "thousToFift") {
      filteredData = filteredData.filter(
        (card) => card.price >= 1001 && card.price <= 1500
      );
    } else if (priceRange === "fiftToTwo") {
      filteredData = filteredData.filter(
        (card) => card.price >= 1501 && card.price <= 2000
      );
    }

    const sortValue = sortSelect.value;
    if (sortValue === "lowToHigh") {
      filteredData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "highToLow") {
      filteredData.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredData);
  }

  searchBar.addEventListener("input", applySFS);
  priceFilter.addEventListener("change", applySFS);
  sortSelect.addEventListener("change", applySFS);
})();

// // Get Token Authentication
// Get localStorage Auth and username from login side, so it appears on Dashboard as well...
document.addEventListener("DOMContentLoaded", () => {
  // Get the localStorage
  const isLoggedIn = JSON.parse(localStorage.getItem("auth"));
  // If user is there, then place it username, where it is given.
  if (!isLoggedIn) {
    window.location.href = "./loginPage.html";
  } else {
    const usernamePlaceholder = document.querySelector("#username-placeholder");
    if (usernamePlaceholder) {
      usernamePlaceholder.textContent = isLoggedIn.userName;
    }
  }
});

// LogOut functionality...
const logOut = document.querySelector("#logout");

logOut.addEventListener("click", () => {
  localStorage.removeItem("auth");
  window.location.replace("/loginPage.html");
});

// Pagination
