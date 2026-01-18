import environment from "../env.js";

export class NutritionApi {
    async getNutrition(searchTerm = "") {
        const url = `${environment.baseUrl}/${environment.endPoints.nutrition}/search?q=${searchTerm}`;
        const res = await fetch(url, {
            headers: {
                'x-api-key': environment.apiKey,
            }
        });
        const data = await res.json();
        return data.results

    }



}