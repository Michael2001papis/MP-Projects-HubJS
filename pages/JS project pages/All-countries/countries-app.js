(function () {
    const cardsContainer = document.getElementById('cards');
    const searchInput = document.getElementById('search-input');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-msg');

    let countriesFull = [];
    let countries = [];

    async function fetchCountries() {
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';
        try {
            const res = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca2,cca3');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            countriesFull = await res.json();
            countries = [...countriesFull];
            renderCards();
        } catch (err) {
            errorEl.textContent = 'שגיאה בטעינת מדינות: ' + err.message;
            errorEl.style.display = 'block';
        } finally {
            loadingEl.style.display = 'none';
        }
    }

    function renderCards() {
        cardsContainer.innerHTML = '';
        for (const country of countries) {
            cardsContainer.appendChild(createCard(country));
        }
    }

    function createCard(country) {
        const card = document.createElement('div');
        card.className = 'card m-2 col-sm-12 col-md-3';

        const img = document.createElement('img');
        img.src = country.flags.png;
        img.alt = country.name.common;
        img.className = 'card-img-top img mt-2 border rounded shadow';

        const body = document.createElement('div');
        body.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = country.name.common;

        const pop = document.createElement('p');
        pop.className = 'card-text';
        pop.textContent = 'Population: ' + country.population.toLocaleString();

        const region = document.createElement('p');
        region.className = 'card-text';
        region.textContent = 'Region: ' + country.region;

        body.appendChild(title);
        body.appendChild(pop);
        body.appendChild(region);

        const footer = document.createElement('div');
        footer.className = 'card-footer d-flex justify-content-center mb-2';

        const heart = document.createElement('i');
        const key = 'liked-' + country.cca3;
        const liked = localStorage.getItem(key) === 'true';
        heart.className = liked ? 'fa fa-heart text-danger' : 'fa fa-heart text-dark';
        heart.style.cursor = 'pointer';
        heart.addEventListener('click', function () {
            heart.classList.toggle('text-danger');
            heart.classList.toggle('text-dark');
            localStorage.setItem(key, heart.classList.contains('text-danger') ? 'true' : 'false');
        });

        footer.appendChild(heart);
        card.appendChild(img);
        card.appendChild(body);
        card.appendChild(footer);
        return card;
    }

    searchInput.addEventListener('input', function () {
        const word = this.value.trim().toLowerCase();
        if (!word) {
            countries = [...countriesFull];
        } else {
            countries = countriesFull.filter(function (c) {
                return c.name.common.toLowerCase().includes(word) ||
                       c.cca2.toLowerCase().includes(word) ||
                       c.cca3.toLowerCase().includes(word);
            });
        }
        renderCards();
    });

    fetchCountries();
})();
