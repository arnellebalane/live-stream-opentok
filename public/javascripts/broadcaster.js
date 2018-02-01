(async () => {

    const sessionInfoEndpoint = window.location.pathname + '/session/';
    const { apiKey, sessionId, token } = await fetch(sessionInfoEndpoint).then(response => response.json());


    const publisher = OT.initPublisher({
        insertDefaultUI: false,
        resolution: '1280x720'
    });

    publisher.on('videoElementCreated', e => {
        const wrapper = document.querySelector('.wrapper');
        wrapper.appendChild(e.element);
    });


    const session = OT.initSession(apiKey, sessionId);

    session.connect(token, (err) => {
        if (err) {
            return handleError(err);
        }
        session.publish(publisher, handleError);
    });

})();

function handleError(err) {
    if (err) {
        console.error(err);
    }
}
