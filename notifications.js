if(Notification.permission !== 'granted') {
    if (confirm('Accepter les notifications ?')) {
        Notification.requestPermission()
        .then( permission => {
            // si on les a
            console.log(permission)
            if (permission === "granted") {
                console.log("Notification possible")
                // notif de test
                
            }
        })
    }
}