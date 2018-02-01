(async () => {

    const sessionInfoEndpoint = window.location.pathname + '/session/';
    const sessionInfo = await fetch(sessionInfoEndpoint).then(response => response.json());

    const session = OT.initSession(sessionInfo.apiKey, sessionInfo.sessionId);
    const publisher = OT.initPublisher({
        insertDefaultUI: false,
        resolution: '1280x720'
    });

    publisher.on('videoElementCreated', e => {
        document.body.appendChild(e.element);
    });

})();
