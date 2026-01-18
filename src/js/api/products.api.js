import environment from "../env.js";

export class ProductsApi {
    async getCategories() {
        const url = `${environment.baseUrl}/${environment.endPoints.products}/categories`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results

    }

    async getProducts(searchTerm = "chicken") {
        const url = `${environment.baseUrl}/${environment.endPoints.products}/search?q=${searchTerm}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results
    }

    async getProductByCode(code) {
        const url = `${environment.baseUrl}/${environment.endPoints.products}/barcode/${code}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results

    }

    async getProductByCategory(category) {
        const url = `${environment.baseUrl}/${environment.endPoints.products}/category/${category}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results
    }


}