import Router from "./route.js";

export default class App {
    #navLinks = document.querySelectorAll("#links li a");
    #router = new Router();
    initApp() {
        this.#router.navigation("/home");

        this.#navLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const path = link.getAttribute("href");
                this.#router.navigation(path);
            });

        });

    }
}