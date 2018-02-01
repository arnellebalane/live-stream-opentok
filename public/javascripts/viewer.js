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

    displayArchives();
    setInterval(displayArchives, 10000);
})();

function handleError(err) {
    if (err) {
        console.error(err);
    }
}

async function displayArchives() {
    const archivesContainer = document.querySelector('.archives');
    const archiveTemplate = `
        <li class="archive">
            <header>
                <h3 class="name">{{ name }}</h3>
                {{ #url }}
                <a class="download" href="{{ url }}" download="{{ name }}.mp4">Download</a>
                {{ /url }}
            </header>
            <footer>
                <p class="status">{{ status }}</p>
                <p class="duration">{{ duration }}</p>
                <p class="size">{{ size }}</p>
            </footer>
        </li>
    `;

    const archives = await fetch('/archives').then(response => response.json());
    archivesContainer.innerHTML = '';

    archives.forEach(archive => {
        const rendered = Mustache.render(archiveTemplate, formatArchive(archive));
        archivesContainer.innerHTML += rendered;
    });
}

function formatArchive(archive) {
    archive.name = archive.name || archive.id;

    const minutes = String(Math.floor(archive.duration / 60));
    const seconds = String(archive.duration % 60);
    archive.duration = minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');

    if (archive.size < 1024) {
        archive.size = archive.size + ' B';
    } else if (archive.size < 1024 ** 2) {
        archive.size = Math.floor(archive.size / 1024) + ' KB';
    } else if (archive.size < 1024 ** 3) {
        archive.size = Math.floor(archive.size / 1024 ** 2) + ' MB';
    } else {
        archive.size = Math.floor(archive.size / 1024 ** 3) + 'GB';
    }

    return archive;
}
