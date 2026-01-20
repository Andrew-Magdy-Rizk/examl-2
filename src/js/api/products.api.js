import environment from "../env.js";

export class ProductsApi {
    async getCategories() {
        const url = `${environment.baseUrl}/${environment.endPoints.products}/categories?limit=20`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results

    }

    async getProducts(searchTerm = "") {
        const url = `${environment.baseUrl}/${environment.endPoints.products}/search?q=${searchTerm}&limit=20`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results
    }

    async getProductByCode(code) {
        const url = `${environment.baseUrl}/${environment.endPoints.products}/barcode/${code}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.result

    }

    async getProductByCategory(category) {
        const url = `${environment.baseUrl}/${environment.endPoints.products}/category/${category}&limit=20`;
        const res = await fetch(url);
        const data = await res.json();
        return data.results
    }


}