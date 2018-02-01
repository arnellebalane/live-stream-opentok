(async () => {

    const sessionEndpoint = window.location.pathname + '/session/';
    const session = await fetch(sessionEndpoint).then(response => response.json());

    console.log(session);

})();
