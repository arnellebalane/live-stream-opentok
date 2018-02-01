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

    publisher.on('streamDestroyed', e => e.preventDefault());


    const session = OT.initSession(apiKey, sessionId);
    session.connect(token, handleError);


    const liveBtn = document.querySelector('.live-btn');
    let isLive = false;

    liveBtn.addEventListener('click', e => {
        if (isLive) {
            isLive = false;
            liveBtn.classList.remove('is-live');
            session.unpublish(publisher);
        } else {
            isLive = true;
            liveBtn.classList.add('is-live');
            session.publish(publisher, handleError);
        }
    });

})();

function handleError(err) {
    if (err) {
        console.error(err);
    }
}
