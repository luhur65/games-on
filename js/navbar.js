import PageNotFound from './core/not_found.js';
import LoaderPage from './core/core.js';
import CookiesPlayer from './core/cookies.js';

const getNavbar = function () {

    // active sidebar nav
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll("#top-nav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });

                // Daftarkan event listener untuk setiap menu
                document.querySelectorAll(".menu-nav").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {

                        // Muat Konten Halaman yg Dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);

                    });
                });
            }
        }

        xhttp.open("GET", "nav.html");
        xhttp.send();

    }

    // Load Page Content
    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);

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
                    content.innerHTML = `<p>Upss ... ! , Halaman Tidak Dapat Diakses!.</p>`;

                }
            }
        }

        xhttp.open("GET", `pages/${page}.html`, true);
        xhttp.send();
    }

    // ... button play game ( event binding )
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('playButton')) {

            // Muat Konten Halaman yg Dipanggil
            page = e.target.getAttribute("href").substr(1);
            loadPage(page);
        }
    });
}

export default getNavbar;