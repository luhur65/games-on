importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// asset appshell
workbox.precaching.precacheAndRoute(
    [{
            url: './manifest.json',
            revision: '1'
        },
        {
            url: './index.html',
            revision: '1'
        },
        {
            url: './img/icon.png',
            revision: '1'
        },
        {
            url: './nav.html',
            revision: '1'
        }
        ,
        {
            url: './sw.js',
            revision: '1'
        }
        ,
        {
            url: './index.js',
            revision: '1'
        }
        ,
        {
            url: './pages/about.html',
            revision: '1'
        }
        ,
        {
            url: './pages/balapan.html',
            revision: '1'
        }
        ,
        {
            url: './pages/home.html',
            revision: '1'
        }
        ,
        {
            url: './pages/quiz.html',
            revision: '1'
        }
        ,
        {
            url: './pages/suit.html',
            revision: '1'
        }
        ,
        {
            url: './pages/tebak_angka.html',
            revision: '1'
        }
        ,
        {
            url: './pages/tebak_kotak.html',
            revision: '1'
        }
    ]
);

// img cache
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|PNG|)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images-cache',
    }),
)

// Css Style
workbox.routing.registerRoute(
    new RegExp('.*\\.css'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'css-cache'
    })
);

// JS  
workbox.routing.registerRoute(
    new RegExp('.*\\.js'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'js-cache'
    })
);

// Google Fonts
workbox.routing.registerRoute(
    new RegExp(/.*(?:googleapis|gstatic)\.com/),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts'
    }),
);

// Font Awesome Cache
workbox.routing.registerRoute(
    /\.(?:woff|woff2|ttf|eot|)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'fontAwesome-cache'
    })
);