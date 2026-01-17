class Route {
    constructor(route, data) {
        this.route = route;
        this.data = data
    }
    navigation() {
        switch (route, data) {
            case "home":
                this.#toHome(data)
                break;
            case "products":
                this.#toProduct(data)
                break;
            case "foodlog":
                this.#toFoodLog(data)
                break;
        }
    }

    #toHome(data) { }
    #toProduct(data) { }
    #toFoodLog(data) { }
}