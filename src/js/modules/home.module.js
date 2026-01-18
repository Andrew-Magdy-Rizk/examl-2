import { MealsApi } from "../api/meals.api.js";

export default class Home {
    constructor({ categories, areas, meals }) {
        this.categories = categories;
        this.areas = areas;
        this.meals = meals;
        this.displayMeals();
        this.changeView();
        this.displayCategories();
        this.getByMealsCategory();
        this.displayAreas();
        this.getByMealsArea();
        this.search();
        console.log(this.meals);
        
    }
    #mealsContainer = document.getElementById("recipes-grid");
    #categoryContainer = document.getElementById("categories-grid");
    #areasContainer = document.getElementById("search-filters-areas");



    displayMeals() {
        const countMeals = document.getElementById("recipes-count");
        countMeals.innerHTML = `Showing ${this.meals.length} recipes`
        let islist = this.#mealsContainer.classList.contains("grid-cols-2");

        let cartona = ``;

        this.meals.map((meal) => {
            cartona += `
            <div
            class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group ${islist ? "flex flex-row h-40" : ""}"
            data-meal-id="${meal.id}">
            <div class="relative ${islist ? "h-full w-24" : "h-48"} overflow-hidden">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src=${meal.thumbnail} alt="${meal.name}"
                loading="lazy" />
              <div class="${islist ? "hidden" : ""} absolute bottom-3 left-3 flex gap-2">
                <span class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700">
                  ${meal.category}
                </span>
                <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
                  ${meal.area}
                </span>
              </div>
            </div>
            <div class="p-4 ${islist ? "flex-1" : ""}">
              <h3
                class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                ${meal.name}
              </h3>
              <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                ${meal.instructions}
              </p>
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold text-gray-900">
                  <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                  ${meal.category}
                </span>
                <span class="font-semibold text-gray-500">
                  <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                  ${meal.area}
                </span>
              </div>
            </div>
          </div>
          `
        });
        this.#mealsContainer.innerHTML = cartona

    }
    changeView() {
        const btnViewGrid = document.getElementById("grid-view-btn");
        const btnViewList = document.getElementById("list-view-btn");
        btnViewGrid.addEventListener("click", () => {
            btnViewList.classList.remove("bg-white", "rounded-md", "shadow-sm");
            btnViewGrid.classList.add("bg-white", "rounded-md", "shadow-sm");
            this.#mealsContainer.classList.replace("grid-cols-2", "grid-cols-4");
            this.displayMeals();

        })

        btnViewList.addEventListener("click", () => {
            btnViewGrid.classList.remove("bg-white", "rounded-md", "shadow-sm");
            btnViewList.classList.add("bg-white", "rounded-md", "shadow-sm");
            this.#mealsContainer.classList.replace("grid-cols-4", "grid-cols-2")
            this.displayMeals();

        })

    }


    displayCategories() {
        let cartona = ``;

        this.categories.map((category) => {
            cartona += `
            <div
            class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
            data-category="${category.name}">
            <div class="flex items-center gap-2.5">
              <div
                class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                
                <img class="w-full h-full object-cover duration-500" src=${category.thumbnail} alt="${category.name}" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
              </div>
            </div>
          </div>
            `
        })

        this.#categoryContainer.innerHTML = cartona;
    }

    displayAreas() {
        let cartona = `
        <button data-area=""
            class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all">
            All Recipes
          </button>
          `;

        this.areas.map((area) => {
            cartona += `
            <button
            data-area="${area.name}"
            class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all">
            ${area.name}
          </button>
            `
        })

        this.#areasContainer.innerHTML = cartona;
    }

    getByMealsCategory() {
        this.#categoryContainer.addEventListener("click", async (e) => {
            const card = e.target.closest("[data-category]");
            if (!card) return;
            const categoryName = card.dataset.category;

            const mealsApi = new MealsApi();

            this.#mealsContainer.innerHTML = `<div class="flex items-center justify-center py-12 w-full">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>`;

            const data = await mealsApi.getFilterMeals(categoryName);
            this.meals = data;
            this.displayMeals();

        })

    }

    getByMealsArea() {
        this.#areasContainer.addEventListener("click", async (e) => {
            const card = e.target.closest("[data-area]");
            if (!card) return;
            const areaName = card.dataset.area;


            const mealsApi = new MealsApi();

            this.#mealsContainer.innerHTML = `<div class="flex items-center justify-center py-12 w-full">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>`;

            const data = await mealsApi.getFilterMeals(areaName ? undefined : "chicken", areaName);

            this.meals = data;
            this.displayMeals();

        })

    }



    search() {
        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("keyup", async (e) => {
            const meals = new MealsApi();
            const searchTerm = e.target.value.toLowerCase();
            console.log(searchTerm);
            

            const data = await meals.getMeals(searchTerm);
            
            this.meals = data;

            this.displayMeals();
        })
    }



}