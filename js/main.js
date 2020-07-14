import getNavbar from './navbar.js';

const TIMEOUT = 3000;
setTimeout(function () {

    try {

        getNavbar();

    } catch (error) {

        // ... your code here
        console.warn(error);

    }

}, TIMEOUT);