import { MealsApi } from "./api/meals.api.js";
import Home from "./modules/home.module.js";

export default class Router {
    #mealsApi = new MealsApi();
    #loadingPage = document.getElementById("app-loading-overlay");
    #homePage = document.getElementById("home-page");
    #mealDetailsPage = document.getElementById("meal-details");
    #productPage = document.getElementById("products-section");
    #foodlogPage = document.getElementById("foodlog-section");
    #headTitle = document.getElementById("head-title").children[0];
    #headDescription = document.getElementById("head-title").children[1];
    navigation(route) {

        switch (route) {
            case "/home":
                // history.pushState({}, "", route);
                this.#toHome()
                break;
            case "/products":
                // history.pushState({}, "", route);
                this.#toProduct()
                break;
            case "/foodlog":
                // history.pushState({}, "", route);
                this.#toFoodLog()
                break;
            case /^\/products\/\w+/.test(route):
                // history.pushState({}, "", route);
                this.#toMealDetails()
                break;
            default:
                this.#toNotFound()

        }
    }

    async #toHome() {
        console.log("home");
        this.#toLoading();
        const categories = await this.#mealsApi.getCategories();
        const areas = await this.#mealsApi.getAreas();
        const meals = await this.#mealsApi.getMeals("chicken");
        this.#toLoading();
        this.#homePage.classList.remove("hidden");
        this.#mealDetailsPage.classList.add("hidden");
        this.#productPage.classList.add("hidden");
        this.#foodlogPage.classList.add("hidden");
        
        this.#headTitle.innerHTML = 'Meals & Recipes';
        this.#headDescription.innerHTML = 'Discover delicious and nutritious recipes tailored for you';
        new Home({ categories, areas, meals });


    }

    #toMealDetails() {
        console.log("meal Detials");
        this.#mealDetailsPage.classList.remove("hidden");
        this.#homePage.classList.add("hidden");
        this.#productPage.classList.add("hidden");
        this.#foodlogPage.classList.add("hidden");
        this.#headTitle.innerHTML = 'Recipe Details';
        this.#headDescription.innerHTML = 'View full recipe information and nutrition facts';
        
        
    }
    #toProduct() {
        console.log("Products");
        this.#productPage.classList.remove("hidden");
        this.#homePage.classList.add("hidden");
        this.#mealDetailsPage.classList.add("hidden");
        this.#foodlogPage.classList.add("hidden");
        this.#headTitle.innerHTML = 'Product Scanner';
        this.#headDescription.innerHTML = 'Search packaged foods by name or barcode';
        
    }
    #toFoodLog() {
        console.log("FoodLog");
        this.#foodlogPage.classList.remove("hidden");
        this.#homePage.classList.add("hidden");
        this.#mealDetailsPage.classList.add("hidden");
        this.#productPage.classList.add("hidden");
        this.#headTitle.innerHTML = 'Food Log';
        this.#headDescription.innerHTML = 'Track your daily nutrition and food intake';
    }

    #toLoading() {
        this.#loadingPage.classList.toggle("loading");
    }
    #toNotFound() {
        console.log("404");

    }
}