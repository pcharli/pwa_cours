const version = 1.01

//add mise en cache
const cacheVersion = 3
const CACHE_NAME = 'news-web-v' + cacheVersion //nom du cache
//liste des éléments à mettre en cache
const urlsToCache = [
    '/',
    '/index.html',
    '/images/Designer.png',
    '/manifest.json',
    '/main.js',
    '/style.css',
    'https://startechs-2024-default-rtdb.europe-west1.firebasedatabase.app/blog.json',
    '/icons/192x192.png',
    '/icons/512x512.png',
    '/images/telecharger.png',
    '/icons/apple-touch-icon.png',
    '/icons/favicon.ico',
    '/images/telecharger2.png'
];

// Séparons l'URL de l'API pour un traitement spécifique
const API_URL = 'http://localhost:5501/data.json';

// installation du serviceworker
self.addEventListener('install', event => {
    event.waitUntil(
        //on ouvre le cache
        caches.open(CACHE_NAME)
            // on y met tout
            .then(cache => cache.addAll(urlsToCache))
    );
    //on force l'activation du sw
    return self.skipWaiting()
});

//À l'activation
self.addEventListener('activate', event => {
    // on récupère le nom de l'ancien cache
    let oldVersion = cacheVersion - 1
    event.waitUntil(
        // on vérifie si il existe
        caches.has('news-web-v' + oldVersion)
        .then(exists => {
            //si il existe
            if(exists) {
                // on le détruit
                caches.delete('news-web-v' + oldVersion).then(() => {
                console.log('Cache supprimé : news-web-v' + oldVersion)
                })
            }
      })
    )
    // le sw prend contrôle de toutes les page web directement sans rechargement
    return self.clients.claim()
  })
  
// lors d'une requête, on l'intercepte

self.addEventListener('fetch', event => {
    //si la requête cible l'api
    console.log(event.request.url)
    if (event.request.url === API_URL) {
        
        // Stratégie Réseau d'abord pour l'API
        event.respondWith(
            // on lance la requête sur le réseau
            fetch(event.request)
                .then(response => {
                    if (response.ok) { //si on a une réponse
                        const responseClone = response.clone(); // Clone de la réponse avant consommation par le script
                        caches.open(CACHE_NAME)
                        //on met en cache la requête et sa réponde qu'on a cloné
                            .then(cache => cache.put(event.request, responseClone));
                    }
                    //on retourne la réponse
                    return response;
                })
                .catch(() => {
                    // Si le réseau échoue, renvoyer les données en cache
                    return caches.match(event.request);
                })
        );
    } else {
        // Stratégie Cache d'abord pour les autres ressources
        //on remplace la réponse à la requête interceptée par fetch.
        event.respondWith(
            //on cherche dans le cache une réponse correspondant à la requête
            caches.match(event.request)
            //si on a une réponse elle est retournée || on envoie la requête au réseau
                .then(response => response || fetch(event.request))
        );
    }
});



//add push notifications

self.addEventListener('push', e => {
    // si on n'a pas les autorisations
    if( !(self.Notification && self.Notification.permission === 'granted') ) {
        // on annule
        return;
    }
    // si on les a
    console.log('test notification')
    // si on reçoit une demande de notif (objet data en json)
    const data = e.data.json() ?? {}
    console.log(data)
    
    // affichage de la notification, recup du title, body, tag et icone
    const myNotification = registration.showNotification(data.title, {
        body: data.message,
        tag: "simple-demo-notification-push",
        icon: "icons/192x192.png"
    })

    //si on clique sur la notifcation, on va vers l'url renseignée
    self.addEventListener('notificationclick', e => {
        //on ferme la notification
        e.notification.close()
        e.waitUntil(
            // on va vers l'url renseignée
            clients.openWindow(data.url)
        )
    })
})