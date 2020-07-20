import getNavbar from './navbar.js';

export const main = _ => {

    // set timeout untuk memunculkan content halaman
    // 1 Detik = 1000;
    const TIMEOUT = 0;

    setTimeout(function () {
        getNavbar();
    }, TIMEOUT);

}