import { NutritionApi } from "../api/nutrition.api.js";


export class mealDetails {
    constructor(meal) {
        this.meal = meal
        this.displayHero();
        this.displayIngredients();
        this.displayInstructions();
        this.displayVideo();
        this.handelNutrition();
    }
    #nutrition = new NutritionApi();
    #heroContainer = document.getElementById("meal-hero-section");

    displayIngredients() {
        const ingredientsDom = document.getElementById("meal-Ingredients-section");

        let ingredients = ``;

        this.meal.ingredients.map((ing) => {
            ingredients += `
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                  <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
                  <span class="text-gray-700">
                    <span class="font-medium text-gray-900">${ing.measure}</span>
                    ${ing.ingredient}
                  </span>
                </div>
            `;
        })



        let cartona = `
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-list-check text-emerald-600"></i>
                Ingredients
                <span class="text-sm font-normal text-gray-500 ml-auto">${this.meal.ingredients.length} items</span>
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${ingredients}
              </div>
        `;

        ingredientsDom.innerHTML = cartona
    }

    displayHero() {

        let cartona = `
        <div class="relative h-80 md:h-96">
            <img src=${this.meal.thumbnail}
              alt="Teriyaki Chicken Casserole" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">${this.meal.category}</span>
                <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">${this.meal.area}</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                ${this.meal.name}
              </h1>
              <div class="flex items-center gap-6 text-white/90">
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-clock"></i>
                  <span>30 min</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-utensils"></i>
                  <span id="hero-servings">4 servings</span>
                </span>
                <span class="flex items-center gap-2">
                  <i class="fa-solid fa-fire"></i>
                  <span id="hero-calories">485 cal/serving</span>
                </span>
              </div>
            </div>
          </div>`;
        this.#heroContainer.innerHTML = cartona

    }


    displayVideo() {
        const videoContainer = document.getElementById("meal-vidio-section");

        if (!this.meal.youtube) {
            videoContainer.innerHTML = "";
            return;
        }

        const videoId = this.meal.youtube.split("v=")[1]?.split("&")[0];
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        videoContainer.innerHTML = `
      <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <i class="fa-solid fa-video text-red-500"></i>
        Video Tutorial
      </h2>

      <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
        <iframe
          src="${embedUrl}"
          class="absolute inset-0 w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    `;
    }

    displayInstructions() {
        const instructionsSection = document.getElementById("meal-instructions-section");
        let cartona = ``;

        this.meal.instructions.map((inst, idx) => {
            cartona += `
            <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    ${idx + 1}
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                    ${inst}
                  </p>
                </div>
            `
        });

        instructionsSection.innerHTML = cartona
    }

    async handelNutrition() {
        const btnlog = document.getElementById("log-meal-btn");
        const nutritionContainer = document.getElementById("meal-nutrition-section");

        btnlog.innerHTML = `<div class="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800"></div> Calculating...`
        btnlog.disabled = true;
        btnlog.classList.add("bg-gray-400");

        nutritionContainer.innerHTML = `
        <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                Nutrition Facts
              </h2>
              <div
                    class="bg-white z-[100] flex items-center justify-center transition-opacity duration-500">
                    <div class="text-center">
                    <div class="relative w-20 h-20 mx-auto mb-6">
                        <div class="absolute inset-0 rounded-xl bg-linear-to-br from-emerald-400 to-teal-600 animate-pulse"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                        <i class="fa-solid fa-calculator text-white text-3xl animate-bounce"></i>

                        </div>
                    </div>
                    <h4 class="text-md font-bold text-gray-900 mb-2">Calculating Nutrition</h4>
                    
                    <p class="text-gray-500 mb-4 text-sm">Analyzing ingredients...</p>
                    <div class="flex items-center justify-center gap-1">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                    </div>
                </div>
            </div>
        
        `


        const data = await this.#nutrition.getNutrition({ name: this.meal.name, ingredients: this.meal.ingredients });
        btnlog.classList.remove("bg-gray-400");
        btnlog.disabled = false;
        btnlog.innerHTML = `Log This Meal`;

        console.log(data);

        nutritionContainer.innerHTML = `
        <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                Nutrition Facts
              </h2>
              <div id="nutrition-facts-container">
                <p class="text-sm text-gray-500 mb-4">Per serving</p>

                <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                  <p class="text-sm text-gray-600">Calories per serving</p>
                  <p class="text-4xl font-bold text-emerald-600">${data.perServing.calories}</p>
                  <p class="text-xs text-gray-500 mt-1">Total: ${data.totals.calories} cal</p>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span class="text-gray-700">Protein</span>
                    </div>
                    <span class="font-bold text-gray-900">${data.perServing.protein}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-emerald-500 h-2 rounded-full" style="width: ${(data.perServing.protein * 4 / data.perServing.calories) * 100}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span class="text-gray-700">Carbs</span>
                    </div>
                    <span class="font-bold text-gray-900">${data.perServing.carbs}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${(data.perServing.carbs * 4 / data.perServing.calories) * 100}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span class="text-gray-700">Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${data.perServing.fat}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-purple-500 h-2 rounded-full" style="width: ${(data.perServing.fat * 9 / data.perServing.calories) * 100}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span class="text-gray-700">Fiber</span>
                    </div>
                    <span class="font-bold text-gray-900">${data.perServing.fiber}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-orange-500 h-2 rounded-full" style="width: ${(data.perServing.fiber * 4 / data.perServing.calories) * 100}%"></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                      <span class="text-gray-700">Sugar</span>
                    </div>
                    <span class="font-bold text-gray-900">${data.perServing.sugar}g</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-pink-500 h-2 rounded-full" style="width: ${(data.perServing.sugar * 4 / data.perServing.calories) * 100}%"></div>
                  </div>
                </div>

                <div class="mt-6 pt-6 border-t border-gray-100">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">
                    Vitamins & Minerals (% Daily Value)
                  </h3>
                  <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Vitamin A</span>
                      <span class="font-medium">15%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Vitamin C</span>
                      <span class="font-medium">25%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Calcium</span>
                      <span class="font-medium">4%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Iron</span>
                      <span class="font-medium">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
    }

}