(async () => {

    const sessionInfoEndpoint = window.location.pathname + '/session/';
    const { apiKey, sessionId, token } = await fetch(sessionInfoEndpoint).then(response => response.json());

    const session = OT.initSession(apiKey, sessionId);

    session.on('streamCreated', e => {
        const subscriber = session.subscribe(e.stream, {
            insertDefaultUI: false
        });

        subscriber.on('videoElementCreated', e => {
            const wrapper = document.querySelector('.wrapper');
            wrapper.appendChild(e.element);
        });
    });

    session.connect(token, handleError);

})();

function handleError(err) {
    if (err) {
        console.error(err);
    }
}
