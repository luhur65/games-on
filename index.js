import { main } from "./js/main.js";

main();

// register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("./sw.js")
            .then(function () {
                console.log("Success!");

            })
            .catch(function () {
                console.log("Failed!");

            });
    });

} else {
    console.log("Not Supported!");

}