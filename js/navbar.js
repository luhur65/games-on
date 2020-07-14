import { PageNotFound, PageDenied } from './core/not_found.js';
import LoaderPage from './core/core.js';

function loadPage(page) {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            let content = document.querySelector("#body-content");

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
                LoaderPage(page);

            } else if (this.status == 404) {
                content.innerHTML = PageNotFound();

            } else {
                content.innerHTML = PageDenied();

            }
        }
    }

    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();

}

const _renderLinkNavbar = result => {

    // Muat daftar tautan menu
    document.querySelectorAll("#top-nav").forEach(elm => {
        elm.innerHTML = result;
    });

    // Daftarkan event listener untuk setiap menu
    document.querySelectorAll(".menu-nav").forEach(elm => {
        elm.addEventListener("click", event => {

            // Muat Konten Halaman yg Dipanggil
            const page = event.target.getAttribute("href").substr(1);
            loadPage(page);

        });
    });
}

const loadNav = async _ => {

    try {
        const response = await fetch("nav.html", {
            mode: "no-cors"
        });
        const result = await response.text();
        return _renderLinkNavbar(result);
    } catch (error) {
        return console.warn(error);
    }

}

const getNavbar = _ => {

    // active sidebar nav
    loadNav();

    // Load Page Content
    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

    // ... button play game ( event binding )
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('playButton')) {

            // Muat Konten Halaman yg Dipanggil
            page = e.target.getAttribute("href").substr(1);
            loadPage(page);
        }
    });
}

export default getNavbar;