import environment from "../env.js";

export class NutritionApi {
    async getNutrition({ name, ingredients }) {

        ingredients = ingredients.map(({ measure, ingredient }) => `${measure} ${ingredient}`)

        const url = `${environment.baseUrl}/${environment.endPoints.nutrition}/analyze`;
        const res = await fetch(url, {
            headers: {
                'x-api-key': environment.apiKey,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ recipeName: name, ingredients })
        });
        const data = await res.json();
        console.log(data);
        
        return data.data

    }



}