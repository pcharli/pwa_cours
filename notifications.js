
 //affiche les notifs
 const notifyMe = () => {
    //alert('notify')
    let myNotification = null
    //on définit un contenu de Notification par défaut
    const options = {
        body: "Envoyé par Pierre",
        icon: "icons/favicon-32x32.png",
        vibrate: [200,100,200,100,200,100,200],
        url: "https://www.lesoir.be"
    }
    // si mon navigateur ne supporte pas les notifications
    if( !("Notification" in window) ) {
        alert('Pas de notification dans ce navigateur')
        // si oui et qu'on a les droits
    } else if (Notification.permission === "granted") {
        console.log("Notification possible")
        // on affiche une notif de test
        myNotification = new Notification('Hi me !', options)
        // si pas les droits, on les demande
    } else {
        Notification.requestPermission().then( permission => {
            // si on les a
            if (permission === "granted") {
                console.log("Notification possible")
                // notif de test
                myNotification = new Notification('Oh, Thank You !', options)
            }
        })
    }
}
// demande des droits  à l'ouverture
if(Notification.permission !== 'granted') {
    if(confirm('Recevoir notifications ?')) {
        notifyMe()
    }
}
//on essaie une notif de test à l'ouverture
notifyMe()