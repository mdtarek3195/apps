const CACHE_NAME = "expense-manager-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",

    // CSS
    "./css/main.css",
    "./css/layout.css",
    "./css/responsive.css",
    "./css/pages.css",

    // JavaScript
    "./js/storage.js",
    "./js/app.js",
    "./js/dashboard.js",
    "./js/accounts.js",
    "./js/backup.js",
    "./js/budget.js",
    "./js/categories.js",
    "./js/charts.js",
    "./js/creditcard.js",
    "./js/credit-report.js",
    "./js/emi-history.js",
    "./js/goals.js",
    "./js/loan.js",
    "./js/network.js",
    "./js/payment-history.js",
    "./js/recurring.js",
    "./js/reports.js",
    "./js/settings.js",
    "./js/statement.js",
    "./js/statement-history.js",
    "./js/transactions.js",
    "./js/transfer.js",

    // Chart library
    "./js/chart.min.js",

    // HTML Pages
    "./accounts.html",
    "./backup.html",
    "./budget.html",
    "./categories.html",
    "./charts.html",
    "./creditcard.html",
    "./credit-report.html",
    "./emi-history.html",
    "./goals.html",
    "./loan.html",
    "./network.html",
    "./payment-history.html",
    "./recurring.html",
    "./reports.html",
    "./settings.html",
    "./statement.html",
    "./statement-history.html",
    "./transactions.html",
    "./transfer.html"
];


// ==========================================
// INSTALL
// ==========================================

self.addEventListener("install", event => {

    console.log("Service Worker installing...");

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(FILES_TO_CACHE);

            })

    );

    self.skipWaiting();

});


// ==========================================
// ACTIVATE
// ==========================================

self.addEventListener("activate", event => {

    console.log("Service Worker activated");

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))

            );

        })

    );

    self.clients.claim();

});


// ==========================================
// FETCH
// ==========================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cachedResponse => {

                // Cache পাওয়া গেলে সেটাই ব্যবহার করবে
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Cache না থাকলে internet থেকে আনবে
                return fetch(event.request);

            })
            .catch(() => {

                // Internet না থাকলে index.html দেখাবে
                return caches.match("./index.html");

            })

    );

});