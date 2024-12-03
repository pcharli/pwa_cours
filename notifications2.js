const NotifMe = () => {
    let myNotif = null

    const options = {
        body: "Corps du message",
        icon: "icons/favicon-32x32.png",
        url: "https://cepegra.be"
    }
    if(Notification.permission === "granded") {
        myNotif = new Notification('Hello !!', options)
    }else {
        Notification.requestPermission().then( permission => {
            // si on les a
            if (permission === "granted") {
                console.log("Notification possible")
                // notif de test
                myNotification = new Notification('Hello !', options)
            }
        })
    }
}
notifyMe()

if(Notification.permission !== 'granted') {
    if (confirm('Accepter les notifications ?')) {
        Notification.requestPermission()
        .then( permission => {
            // si on les a
            console.log(permission)
            if (permission === "granted") {
                console.log("Notification possible")
                // notif de test
                NotifMe()
            }
        })
    }
}