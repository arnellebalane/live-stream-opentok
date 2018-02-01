(async () => {

    const sessionInfoEndpoint = window.location.pathname + '/session/';
    const { apiKey, sessionId } = await fetch(sessionInfoEndpoint).then(response => response.json());

    const session = OT.initSession(apiKey, sessionId);

    session.on('streamCreated', e => {
        console.log(e);
    });

})();
