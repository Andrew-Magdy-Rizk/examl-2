import { MealsApi } from "../api/meals.api.js";
import { ProductsApi } from "../api/products.api.js";
import Router from "../core/route.js";

export default class Product {
  constructor(categories) {
    this.categories = categories;
    this.products = [];

    this.displayCategories();
    this.getProductsByCategory();
    this.search();
    this.searchByBarcode();
    // this.displayMeals();
  }
  #productApi = new ProductsApi();
  #router = new Router();
  #categoryContainer = document.getElementById("product-categories");
  #productsContainer = document.getElementById("products-grid");



  displayProducts() {
    const countProducts = document.getElementById("products-count");
    countProducts.innerHTML = `Found ${this.products.length} products`;

    let cartona = ``;

    this.products.map((product) => {
      cartona += `
            <div
              class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-barcode="${product.barcode}">
              <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  src="${product.image || "/src/images/favicon.png"}"
                  alt="${product.name}" loading="lazy" />

                <!-- Nutri-Score Badge -->
                <div
                  class="${product.nutritionGrade === "a" ? "bg-green-500": product.nutritionGrade === "b" ? "bg-lime-500" : product.nutritionGrade === "c" ? "bg-yellow-500" : product.nutritionGrade === "d" ? "bg-orange-500" : product.nutritionGrade === "e" ? "bg-red-500" : "bg-gray-400"} absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                  Nutri-Score ${product.nutritionGrade}
                </div>

                <!-- NOVA Badge -->
                ${product.novaGroup ? `<div
                  class="absolute top-2 right-2 ${product.novaGroup == 1 ? "bg-green-500": product.novaGroup == 2 ? "bg-lime-500" : product.novaGroup == 3 ? "bg-orange-500" : "bg-red-500"} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                  title="NOVA 2">
                  ${product.novaGroup}
                </div>`: ""
                }
              </div>

              <div class="p-4">
                <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
                  ${product.brand}
                </p>
                <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  ${product.name}
                </h3>

                <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span><i class="fa-solid fa-weight-scale mr-1"></i>250g</span>
                  <span><i class="fa-solid fa-fire mr-1"></i>${product.nutrients.calories} kcal/100g</span>
                </div>

                <!-- Mini Nutrition -->
                <div class="grid grid-cols-4 gap-1 text-center">
                  <div class="bg-emerald-50 rounded p-1.5">
                    <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}g</p>
                    <p class="text-[10px] text-gray-500">Protein</p>
                  </div>
                  <div class="bg-blue-50 rounded p-1.5">
                    <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}g</p>
                    <p class="text-[10px] text-gray-500">Carbs</p>
                  </div>
                  <div class="bg-purple-50 rounded p-1.5">
                    <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}g</p>
                    <p class="text-[10px] text-gray-500">Fat</p>
                  </div>
                  <div class="bg-orange-50 rounded p-1.5">
                    <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}g</p>
                    <p class="text-[10px] text-gray-500">Sugar</p>
                  </div>
                </div>
              </div>
            </div>
          `
    });
    console.log(this.#productsContainer);

    this.#productsContainer.innerHTML = cartona




  }


  displayCategories() {
    let cartona = ``;
    console.log("get category");

    this.categories.map((category) => {
      cartona += `
            <button
            data-category="${category.name}"
              class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all">
              <i class="fa-solid fa-cookie mr-1.5"></i>${category.name}
            </button>
            `
    })

    this.#categoryContainer.innerHTML = cartona;
  }


  getProductsByCategory() {
    this.#categoryContainer.addEventListener("click", async (e) => {
      const card = e.target.closest("[data-category]");
      if (!card) return;
      const categoryName = card.dataset.category;


      this.#productsContainer.innerHTML = `<div class="absolute flex items-center justify-center py-12 w-full">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>`;

      const data = await this.#productApi.getProductByCategory(categoryName);
      console.log("products", data);

      this.products = data;
      this.displayProducts();

    })

  }




  search() {
    const searchInput = document.getElementById("product-search-input");
    const searchBtn = document.getElementById("search-product-btn");
    searchBtn.addEventListener("click", async (e) => {
      console.log(e);
      console.log(searchInput.value);
      if (!searchInput.value) {
        return;
      }

      const searchTerm = searchInput.value.toLowerCase();
      console.log(searchTerm);


      const data = await this.#productApi.getProducts(searchTerm);

      this.products = data;

      this.displayProducts();
    })
    searchInput.addEventListener("keydown", async (e) => {
      if (e.key  !== "Enter") {
        return;
      }

      const searchTerm = searchInput.value.toLowerCase();
      console.log(searchTerm);


      const data = await this.#productApi.getProducts(searchTerm);

      this.products = data;

      this.displayProducts();
    })
  }
  
  searchByBarcode() {
    const searchInput = document.getElementById("barcode-input");
    const searchBtn = document.getElementById("lookup-barcode-btn");
    searchBtn.addEventListener("click", async (e) => {
      console.log(searchInput.value);
      if (!searchInput.value) {
        return;
      }
      const barcode = searchInput.value.toLowerCase();


      const data = await this.#productApi.getProductByCode(barcode);
      console.log("product", data);

      this.products = [data];

      this.displayProducts();
    })
    searchInput.addEventListener("keydown", async (e) => {
      if (e.key !== "Enter") {
        return;
      }
      const barcode = searchInput.value.toLowerCase();


      const data = await this.#productApi.getProductByCode(barcode);
      console.log("product", data);

      this.products = [data];

      this.displayProducts();
    })
  }

  //   getDetailsMeal() {
  //     this.#mealsContainer.addEventListener("click", async(e) => {
  //       const card = e.target.closest(".recipe-card");

  //       if (!card) return; // لو الضغط كان بره الكارت

  //       const mealId = card.dataset.mealId;
  //       const meal = await this.#mealsApi.getOneMeal(mealId);


  //       console.log("Clicked meal id:", mealId);

  //       // هنا بقى اعمل اللي انت عايزه
  //       this.#router.navigation(`/meal/${mealId}`, meal);
  //     });

  //   }

}