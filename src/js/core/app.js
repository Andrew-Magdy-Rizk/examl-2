import Router from "./route.js";

export default class App {
    #navLinks = document.querySelectorAll("#links li a");
    #router = new Router();
    #sidebarOpen = document.getElementById("header-menu-btn");
    #sidebarOverlay = document.getElementById("sidebar-overlay");
    #sidebar = document.getElementById("sidebar");
    #sidebarClose = document.getElementById("sidebar-close-btn");

    initApp() {
        const path = location.pathname;
        path === "/" || path === "/index.html" ? this.#router.navigation("/home") : this.#router.navigation(path);

        this.#navLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const path = link.getAttribute("href");
                this.#router.navigation(path);
                this.sidebartoggle();
            });
        });

        this.#sidebarOpen.addEventListener("click", () => {
            this.sidebartoggle();
        })

        this.#sidebarClose.addEventListener("click", () => {
            this.sidebartoggle();
        })


    }

    sidebartoggle() {
        this.#sidebarOverlay.classList.toggle("active");
        this.#sidebar.classList.toggle("open");
    }
}