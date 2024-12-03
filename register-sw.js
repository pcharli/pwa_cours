if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then( () => {
            console.log('Srvice Worker enregistré !')
        })
        .catch(err => console.log(err))
    })
}