import environment from "../env.js";

export class MealsApi {
    async getCategories() {
        const url = `${environment.baseUrl}/${environment.endPoints.meals}/categories`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results

    }
    async getAreas() {
        const url = `${environment.baseUrl}/${environment.endPoints.meals}/areas`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results

    }
    async getMeals(searchTerm = "chicken") {
        const url = `${environment.baseUrl}/${environment.endPoints.meals}/search?q=${searchTerm}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results

    }

    async getFilterMeals(category = "", area = "") {
        const url = `${environment.baseUrl}/${environment.endPoints.meals}/filter?category=${category}&area=${area}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results
    }

    async getOneMeal(id) {
        const url = `${environment.baseUrl}/${environment.endPoints.meals}/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results

    }
}