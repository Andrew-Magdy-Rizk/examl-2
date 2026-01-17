import { MealsApi } from "./api/meals.api.js";

export default class Router {
    #mealsApi = new MealsApi();
    #loadingPage = document.getElementById("app-loading-overlay");
    navigation(route) {
        
        switch (route) {
            case "/home":
                history.pushState({}, "", route);
                this.#toHome()
                break;
            case "/products":
                history.pushState({}, "", route);
                this.#toProduct()
                break;
            case "/foodlog":
                history.pushState({}, "", route);
                this.#toFoodLog()
                break;
                default: 
                this.#toNotFound()

        }
    }

    async #toHome() {
        this.#toLoading();    
        const categories = await this.#mealsApi.getCategories();
        const areas = await this.#mealsApi.getAreas();
        const meals = await this.#mealsApi.getMeals("chicken");
        this.#toLoading();    
        console.log("home");
        console.log("categories", categories);
        console.log("areas", areas);
        console.log("meals", meals);
        
        
    }
    #toProduct() {
        console.log("Products");
        
    }
    #toFoodLog() {
        console.log("FoodLog");
        
    }
    
    #toLoading(){
        this.#loadingPage.classList.toggle("loading");
    }
    #toNotFound(){
        console.log("404");
        
    }
}