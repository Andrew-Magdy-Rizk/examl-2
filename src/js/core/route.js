import { MealsApi } from "../api/meals.api.js";
import { NutritionApi } from "../api/nutrition.api.js";
import { ProductsApi } from "../api/products.api.js";
import Home from "../modules/home.module.js";
import { mealDetails } from "../modules/mealDetails.module.js";
import Product from "../modules/product.module.js";

export default class Router {
    #mealsApi = new MealsApi();
    #productApi = new ProductsApi();
    #currentRoute = null;

    #pages = {
        home: document.getElementById("home-page"),
        mealDetails: document.getElementById("meal-details"),
        products: document.getElementById("products-section"),
        foodlog: document.getElementById("foodlog-section"),
    };

    #loadingPage = document.getElementById("app-loading-overlay");
    #headTitle = document.getElementById("head-title").children[0];
    #headDescription = document.getElementById("head-title").children[1];

    constructor() {
        this.#bindEvents();
    }

    navigation(route, data) {
        console.log("nav");

        if (this.#currentRoute === route) return;
        this.#currentRoute = route;

        if (/^\/meal\/\w+/.test(route)) {
            return this.#toMealDetails(data);
        }

        switch (route) {
            case "/":
            case "/home":
                return this.#toHome();
            case "/products":
                return this.#toProducts();
            case "/foodlog":
                return this.#toFoodLog();
            default:
                return this.#toNotFound();
        }
    }


    async #toHome() {
        try {
            this.#showLoading(false);

            const [categories, areas, meals] = await Promise.all([
                this.#mealsApi.getCategories(),
                this.#mealsApi.getAreas(),
                this.#mealsApi.getMeals("chicken"),
            ]);

            this.#setHeader(
                "Meals & Recipes",
                "Discover delicious and nutritious recipes tailored for you"
            );

            new Home({ categories, areas, meals });
            this.#showPage("home");

        } catch (error) {
            console.error("Home load error:", error);
        } finally {
            this.#showLoading(true);
        }
    }

    #toMealDetails(data) {
        console.log(data);

        this.#setHeader(
            "Recipe Details",
            "View full recipe information and nutrition facts"
        );

        new mealDetails(data);

        this.#showPage("mealDetails");
    }

    async #toProducts() {
        this.#setHeader(
            "Product Scanner",
            "Search packaged foods by name or barcode"
        );

        const categories = await this.#productApi.getCategories()

        console.log(categories);

        new Product(categories);

        this.#showPage("products");
    }

    #toFoodLog() {
        this.#setHeader(
            "Food Log",
            "Track your daily nutrition and food intake"
        );

        this.#showPage("foodlog");
    }

    #toNotFound() {
        console.warn("404 - Route not found");
    }


    #bindEvents() {
        const backBtn = document.getElementById("back-to-meals-btn");
        if (backBtn) {
            backBtn.addEventListener("click", () => {
                this.navigation("/home");
            });
        }
    }

    #showPage(pageKey) {
        Object.values(this.#pages).forEach(page =>
            page.classList.add("hidden")
        );

        this.#pages[pageKey]?.classList.remove("hidden");
    }

    #setHeader(title, description) {
        this.#headTitle.textContent = title;
        this.#headDescription.textContent = description;
    }

    #showLoading(show) {
        this.#loadingPage.classList.toggle("loading", show);
    }
}
