import { NutritionApi } from "../api/nutrition.api.js";


export class mealDetails {
    constructor(meal) {
        this.meal = meal
        console.log("Clicked meal id:", meal);
        this.getapi();
        this.displayHero();
        this.displayIngredients();
        this.displayVideo();
    }
    #nutrition = new NutritionApi();
    #heroContainer = document.getElementById("meal-hero-section");


    async getapi() {
        const data = await this.#nutrition.getNutrition({ name: this.meal.name, ingredients: this.meal.ingredients });
    }

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

        console.log("lenght", this.meal.ingredients.length);


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
            <img src="${this.meal.thumbnail}"
              alt="${this.meal.name}" />
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


    displayVideo(){
        const videoContainer = document.getElementById("meal-vidio-section");
        console.log("videoContainer", videoContainer);
        
        let cartona = `
        <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i class="fa-solid fa-video text-red-500"></i>
                Video Tutorial
              </h2>
              <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <iframe src=${this.meal.youtube} class="absolute inset-0 w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
                </iframe>
              </div>
        `;

        videoContainer.innerHTML = cartona; 


    }
}