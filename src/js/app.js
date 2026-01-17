export default class App {
    #navLinks = document.querySelectorAll("#links li a");
    initApp() {
        history.pushState({}, "", "/home");

        this.#navLinks.forEach((link) => {

            link.addEventListener("click", function (e) {
                e.preventDefault();
                const path = link.getAttribute("href");
                history.pushState({}, "", path)

            });

        });

        console.log("app");
    }
}